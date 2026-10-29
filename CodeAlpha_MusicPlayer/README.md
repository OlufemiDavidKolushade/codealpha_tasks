# 🎵 Music Player

My own little music player that lives in the browser. Purple glassy vibes, a spinning vinyl, a bouncing equalizer, and a playlist of tracks I actually listen to. No frameworks, no build step, just open it and press play.

## What it can do

- Play / pause, skip forward, go back (hit back after 3 seconds and it just restarts the song)
- Shuffle, for when you can't decide
- Repeat: off, whole playlist, or one song on loop
- Autoplay toggle, so the next song either kicks in on its own or it doesn't
- Seek bar with the current time and total length
- Volume slider + mute button (unmute puts the volume back where it was)
- Playlist with cover art, click a song and it plays
- Spinning vinyl, glowing album art and an equalizer that dances while music plays
- Works on phones too, the playlist turns into a drawer you can open and close

## What's in the folder

```
.
├── index.html           # the page
├── script.js            # all the player logic + the track list
├── style.css            # glass look, sliders, equalizer animation
├── Treachery.mp3
├── Brega.mp3
├── FUNK_DE_BELEZA.mp3
└── FUNK_TAKA.mp3
```

## Adding more songs

Open `script.js` and add another block to `trackList`:

```js
{
    title: "Song Title",
    artist: "Artist Name",
    src: "your-song.mp3",     // put the file next to index.html
    cover: "https://example.com/cover.jpg",
    duration: "3:45"          // placeholder, the real length shows up once the song loads
}
```

That's it. The playlist and track count update by themselves.

## Made with

- Tailwind CSS (CDN)
- Font Awesome icons
- Inter font from Google Fonts
- Plain JavaScript and the HTML `<audio>` tag

## Heads up on the music

I didn't make these songs or the cover art, they belong to their creators. This is just a personal project, so if you ever put it online for everyone, swap in music you have the rights to.
