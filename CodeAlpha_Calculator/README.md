# 🧮 Calculator

A little calculator that runs in your browser. No frameworks, no build step, no npm install nightmares. Just HTML, CSS and plain JavaScript.

It's dark, it's purple, and it remembers what you calculated.

## What it can do

- The usual: add, subtract, multiply, divide
- Proper order of operations, so `2 + 3 × 4` gives you `14` and not `20`
- Live preview: as you type, it shows what the answer will be before you even hit `=`
- `%` to turn a number into a percentage, `±` to flip its sign, `⌫` to delete the last digit
- **History** of your last 50 calculations. Click one to pull its result back into the display
- History survives page refreshes (it's saved in your browser's localStorage)
- Full keyboard support
- Divide by zero? It tells you off politely instead of exploding

## Keyboard shortcuts

| Key | What it does |
| --- | --- |
| `0-9` | Type digits |
| `+ - * /` | Operators |
| `.` or `,` | Decimal point |
| `Enter` or `=` | Equals |
| `Backspace` | Delete last digit |
| `Esc` or `Delete` | Clear everything |
| `%` | Percent |

## What's in the box

```
├── index.html   # the page structure
├── style.css    # all the purple
└── script.js    # the brains
```
