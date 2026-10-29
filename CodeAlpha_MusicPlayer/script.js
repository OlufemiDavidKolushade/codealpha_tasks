// Royalty-free Sample Track Library
        const trackList = [
            {
                title: "Bleach OST - Treachery (Aizen's Theme) EPIC VERSION",
                artist: "Dragoslav Miloradović",
                src: "Treachery.mp3",
                cover: "https://i.scdn.co/image/ab67616d0000b273b246b2af2fc9b0939ecb43c6",
                duration: "2:46"
            },
            {
                title: "BREGA DO LOVE (SUPER SLOWED)",
                artist: "Phonk",
                src: "Brega.mp3",
                cover: "https://audio.com/s3w/audio.com.static/audio/image/27/08/1873363542610827-1873363545537603.jpeg@480?qlt=75&fmt=webp",
                duration: "2:19"
            },
            {
                title: "FUNK DE BELEZA SLOWED",
                artist: "Phonk",
                src: "FUNK_DE_BELEZA.mp3",
                cover: "https://i.ytimg.com/vi/SEPL5r05I40/maxresdefault.jpg",
                duration: "5:44"
            },
            {
                title: "FUNK TAKA SLOWED",
                artist: "Phonk",
                src: "FUNK_TAKA.mp3",
                cover: "https://i.ytimg.com/vi/uXfIHf7FIw0/maxresdefault.jpg",
                duration: "5:02"
            }
        ];

        // State Variables
        let currentTrackIndex = 0;
        let isPlaying = false;
        let isShuffle = false;
        let repeatMode = 0; // 0: None, 1: Repeat Playlist, 2: Repeat Track
        let isAutoplayEnabled = true;

        // DOM Elements
        const audio = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const repeatBtn = document.getElementById('repeatBtn');
        const autoplayBtn = document.getElementById('autoplayBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTimeEl = document.getElementById('currentTime');
        const totalDurationEl = document.getElementById('totalDuration');
        const volumeSlider = document.getElementById('volumeSlider');
        const muteBtn = document.getElementById('muteBtn');
        const songTitle = document.getElementById('songTitle');
        const artistName = document.getElementById('artistName');
        const coverArt = document.getElementById('coverArt');
        const artGlow = document.getElementById('artGlow');
        const vinyl = document.getElementById('vinyl');
        const equalizer = document.getElementById('equalizer');
        const playlistItems = document.getElementById('playlistItems');
        const playlistCount = document.getElementById('playlistCount');
        const playlistContainer = document.getElementById('playlistContainer');
        const playlistToggleBtn = document.getElementById('playlistToggleBtn');

        function initPlayer() {
            renderPlaylist();
            loadTrack(currentTrackIndex);
            audio.volume = volumeSlider.value;
            updateAutoplayUI();
        }

        // Render Playlist Items Dynamic Markup
        function renderPlaylist() {
            playlistItems.innerHTML = '';
            trackList.forEach((track, index) => {
                const item = document.createElement('div');
                item.className = `playlist-item flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    index === currentTrackIndex 
                    ? 'bg-purple-600/30 border border-purple-500/40 text-white' 
                    : 'hover:bg-white/5 text-slate-300 hover:text-white'
                }`;
                
                item.innerHTML = `
                    <div class="flex items-center gap-3 overflow-hidden">
                        <img src="${track.cover}" alt="${track.title}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
                        <div class="overflow-hidden">
                            <h4 class="text-sm font-semibold truncate ${index === currentTrackIndex ? 'text-purple-300' : ''}">${track.title}</h4>
                            <p class="text-xs text-slate-400 truncate">${track.artist}</p>
                        </div>
                    </div>
                    <span class="text-xs text-slate-400 flex-shrink-0 ml-2 font-mono">${track.duration}</span>
                `;

                item.addEventListener('click', () => {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    playAudio();
                });

                playlistItems.appendChild(item);
            });

            playlistCount.textContent = `${trackList.length} tracks`;
        }

        // Load Track Metadata & Source
        function loadTrack(index) {
            const track = trackList[index];
            songTitle.textContent = track.title;
            artistName.textContent = track.artist;
            coverArt.src = track.cover;
            audio.src = track.src;
            progressBar.value = 0;
            currentTimeEl.textContent = '0:00';
            totalDurationEl.textContent = track.duration;

            // Highlight in playlist
            renderPlaylist();
        }

        // Play Audio
        function playAudio() {
            audio.play().then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                artGlow.classList.remove('opacity-0');
                vinyl.classList.add('translate-x-6', 'animate-spin-slow');
                equalizer.classList.remove('paused');
            }).catch(err => {
                console.warn("Autoplay blocked or stream standard warning:", err);
            });
        }

        // Pause Audio
        function pauseAudio() {
            audio.pause();
            isPlaying = false;
            playBtn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
            artGlow.classList.add('opacity-0');
            vinyl.classList.remove('translate-x-6', 'animate-spin-slow');
            equalizer.classList.add('paused');
        }

        // Play/Pause Toggle Event
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });

        // Next Track Action
        function nextTrack() {
            if (isShuffle) {
                currentTrackIndex = Math.floor(Math.random() * trackList.length);
            } else {
                currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
            }
            loadTrack(currentTrackIndex);
            playAudio();
        }

        // Previous Track Action
        function prevTrack() {
            if (audio.currentTime > 3) {
                audio.currentTime = 0;
                return;
            }
            currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
            loadTrack(currentTrackIndex);
            playAudio();
        }

        nextBtn.addEventListener('click', nextTrack);
        prevBtn.addEventListener('click', prevTrack);

        // Update Progress Bar & Current Time Text
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.value = progressPercent;

                // Time formatting
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

                const durationMinutes = Math.floor(audio.duration / 60);
                const durationSeconds = Math.floor(audio.duration % 60);
                if (!isNaN(durationMinutes)) {
                    totalDurationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
                }
            }
        });

        // Seek Audio on Progress Bar Input
        progressBar.addEventListener('input', () => {
            if (audio.duration) {
                const seekTime = (progressBar.value / 100) * audio.duration;
                audio.currentTime = seekTime;
            }
        });

        // Track Ending Handler (Autoplay & Repeat Logic)
        audio.addEventListener('ended', () => {
            if (repeatMode === 2) { // Repeat current track
                audio.currentTime = 0;
                playAudio();
            } else if (repeatMode === 1 || currentTrackIndex < trackList.length - 1 || isShuffle) {
                if (isAutoplayEnabled) {
                    nextTrack();
                } else {
                    pauseAudio();
                }
            } else {
                pauseAudio();
            }
        });

        // Volume Controls
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            updateVolumeIcon(audio.volume);
        });

        muteBtn.addEventListener('click', () => {
            if (audio.volume > 0) {
                audio.dataset.prevVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
            } else {
                const prev = audio.dataset.prevVolume || 0.8;
                audio.volume = prev;
                volumeSlider.value = prev;
            }
            updateVolumeIcon(audio.volume);
        });

        function updateVolumeIcon(vol) {
            if (vol == 0) {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark text-red-400"></i>';
            } else if (vol < 0.5) {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        }

        // Shuffle Button Toggle
        shuffleBtn.addEventListener('click', () => {
            isShuffle = !isShuffle;
            shuffleBtn.classList.toggle('text-purple-400', isShuffle);
            shuffleBtn.classList.toggle('text-slate-400', !isShuffle);
        });

        // Repeat Button Mode Toggle
        repeatBtn.addEventListener('click', () => {
            repeatMode = (repeatMode + 1) % 3;
            if (repeatMode === 0) {
                repeatBtn.className = "text-slate-400 hover:text-purple-400 transition-colors p-2 text-base relative";
                repeatBtn.title = "Repeat: Off";
            } else if (repeatMode === 1) {
                repeatBtn.className = "text-purple-400 hover:text-purple-300 transition-colors p-2 text-base relative";
                repeatBtn.title = "Repeat: All Playlist";
            } else if (repeatMode === 2) {
                repeatBtn.className = "text-purple-400 hover:text-purple-300 transition-colors p-2 text-base relative font-bold";
                repeatBtn.title = "Repeat: Current Track";
            }
        });

        // Autoplay Toggle Button
        autoplayBtn.addEventListener('click', () => {
            isAutoplayEnabled = !isAutoplayEnabled;
            updateAutoplayUI();
        });

        function updateAutoplayUI() {
            if (isAutoplayEnabled) {
                autoplayBtn.className = "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/50 bg-purple-500/20 text-purple-300 transition-all";
            } else {
                autoplayBtn.className = "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-600 bg-slate-800/50 text-slate-400 transition-all";
            }
        }

        // Mobile Playlist Drawer Toggle
        playlistToggleBtn.addEventListener('click', () => {
            playlistContainer.classList.toggle('hidden');
        });

        // Initialize Application
        window.addEventListener('DOMContentLoaded', initPlayer);