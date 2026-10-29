(function () {
  var SYM = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  var STORAGE_KEY = 'calculator-history';
  var MAX_HISTORY = 50;

  var expr = [];        // completed numbers and operators, e.g. ['12', '+', '8', '*']
  var cur = '0';        // the number being typed ('' while waiting for the next number)
  var done = false;     // true right after pressing =
  var err = false;      // true after an error such as dividing by zero
  var lastLine = '';
  var history = loadHistory();

  var elExpr = document.getElementById('expr');
  var elPrev = document.getElementById('preview');
  var elMain = document.getElementById('main');
  var elList = document.getElementById('historyList');
  var elEmpty = document.getElementById('historyEmpty');

  /* ---------- History storage ---------- */
  function loadHistory() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) { 
      /* storage unavailable: history still works for this visit */ 
    }
  }

  function addToHistory(expression, result) {
    history.unshift({ expr: expression, result: result });
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    saveHistory();
    renderHistory();
  }

  function renderHistory() {
    elList.innerHTML = '';
    elEmpty.style.display = history.length ? 'none' : 'block';
    history.forEach(function (item) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.title = 'Use this result';
      var a = document.createElement('span');
      a.className = 'h-expr';
      a.textContent = item.expr + ' =';
      var b = document.createElement('span');
      b.className = 'h-result';
      b.textContent = item.result;
      btn.appendChild(a);
      btn.appendChild(b);
      btn.addEventListener('click', function () {
        expr = []; cur = item.result; done = false; err = false; lastLine = '';
        render();
      });
      li.appendChild(btn);
      elList.appendChild(li);
    });
  }

  /* ---------- Maths ---------- */
  function isOp(t) { return t === '+' || t === '-' || t === '*' || t === '/'; }

  // Multiplication and division first, then addition and subtraction.
  function evaluate(t) {
    var a = t.slice(), i;
    for (i = 1; i < a.length; i += 2) {
      if (a[i] === '*' || a[i] === '/') {
        var x = parseFloat(a[i - 1]), y = parseFloat(a[i + 1]);
        if (a[i] === '/' && y === 0) return NaN;
        a.splice(i - 1, 3, String(a[i] === '*' ? x * y : x / y));
        i -= 2;
      }
    }
    var r = parseFloat(a[0]);
    for (i = 1; i < a.length; i += 2) {
      var v = parseFloat(a[i + 1]);
      r = a[i] === '+' ? r + v : r - v;
    }
    return r;
  }

  function fmt(n) {
    if (!isFinite(n)) return 'Error';
    var s = String(parseFloat(n.toPrecision(12)));
    if (s.length > 14) s = n.toExponential(6).replace(/\.?0+e/, 'e');
    return s;
  }

  function tokens() { 
    return cur === '' ? expr.slice(0, -1) : expr.concat(cur); 
  }
  function pretty(t) { 
    return t.map(function (x) { return isOp(x) ? SYM[x] : x;
      
     }).join(' '); }

  /* ---------- Display ---------- */
  function render() {
    if (err) {
      elMain.textContent = 'Can’t divide by 0';
      elMain.className = 'main small';
      elExpr.textContent = lastLine;
      elPrev.textContent = 'Press C to start again';
      return;
    }
    var show = cur !== '' ? cur : (expr.length > 1 ? fmt(evaluate(tokens())) : expr[0]);
    elMain.textContent = show;
    elMain.className = 'main' + (show.length > 10 ? ' small' : '');

    if (done) {
      elExpr.textContent = lastLine;
      elPrev.textContent = '';
      return;
    }
    var t = tokens();
    elExpr.textContent = expr.length ? pretty(expr) + (cur !== '' ? ' ' + cur : '') : '';
    elPrev.textContent = (t.length > 2 && cur !== '') ? '= ' + fmt(evaluate(t)) : '';
  }

  /* ---------- Actions ---------- */
  function reset() { expr = []; cur = '0'; done = false; err = false; lastLine = ''; }

  function digit(d) {
    if (err || done) reset();
    if (cur === '0') cur = d;
    else if (cur === '-0') cur = '-' + d;
    else if (cur.replace(/[-.]/g, '').length < 14) cur += d;
  }

  function dot() {
    if (err || done) reset();
    if (cur === '') cur = '0';
    if (cur.indexOf('.') < 0) cur += '.';
  }

  function op(o) {
    if (err) return;
    if (done) { done = false; expr = []; lastLine = ''; }
    if (cur === '') { expr[expr.length - 1] = o; return; } // change the operator
    if (cur === '-' || cur === '-0') cur = '0';
    expr.push(cur.replace(/\.$/, ''), o);
    cur = '';
  }

  function equals() {
    if (err || done || !expr.length) return;
    var t = tokens();
    if (t.length < 3) return;
    var r = evaluate(t);
    lastLine = pretty(t) + ' =';
    if (isNaN(r) || !isFinite(r)) { err = true; return; }
    var result = fmt(r);
    addToHistory(pretty(t), result);   // save the calculation
    expr = [];
    cur = result;
    done = true;
  }

  function percent() {
    if (err || cur === '') return;
    cur = fmt(parseFloat(cur) / 100);
  }

  function neg() {
    if (err) return;
    if (done) { done = false; lastLine = ''; }
    if (cur === '') return;
    cur = cur.charAt(0) === '-' ? cur.slice(1) : (cur === '0' ? '-0' : '-' + cur);
  }

  function back() {
    if (err || done) { reset(); return; }
    if (cur === '') { expr.pop(); cur = expr.pop() || '0'; return; }
    cur = (cur.length > 1 && cur !== '-0') ? cur.slice(0, -1) : '0';
    if (cur === '-') cur = '0';
  }

  function press(k) {
    if (/^[0-9]$/.test(k)) digit(k);
    else if (k === '.') dot();
    else if (isOp(k)) op(k);
    else if (k === '=') equals();
    else if (k === 'clear') reset();
    else if (k === 'back') back();
    else if (k === 'percent') percent();
    else if (k === 'neg') neg();
    render();
  }

  /* ---------- Events ---------- */
  document.querySelector('.keys').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) press(b.getAttribute('data-k'));
  });

  document.getElementById('clearHistory').addEventListener('click', function () {
    history = [];
    saveHistory();
    renderHistory();
  });

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    var map = { 'Enter': '=', '=': '=', 'Backspace': 'back', 'Escape': 'clear', 'Delete': 'clear', '%': 'percent', ',': '.' };
    if (map[k]) k = map[k];
    var ok = /^[0-9]$/.test(k) || k === '.' || isOp(k) || ['=', 'back', 'clear', 'percent'].indexOf(k) > -1;
    if (!ok) return;
    e.preventDefault();
    press(k);
    var btn = document.querySelector('.keys button[data-k="' + k + '"]');
    if (btn) {
      btn.classList.add('pressed');
      setTimeout(function () { btn.classList.remove('pressed'); }, 110);
    }
  });

  renderHistory();
  render();
})();
