# 📸 Picture Gallery

A simple image gallery I built with HTML, Tailwind, and plain JavaScript. Click a picture, it pops open in a big lightbox. Filter by category. That's pretty much it!

No build step, no installs. Just open it and go.

## What it does

- Filter photos by category (Nature, Architecture, Technology, Anime, and an "Example" one that's empty on purpose to show the empty state)
- Click any image to open it in a lightbox with its title, description, and a counter like `3 / 12`
- Flip through images with the arrow buttons or your keyboard (`←` `→`), and hit `Esc` to close
- Click the dark background to close it too
- Works on phones, tablets, and desktops
- If an image fails to load, a placeholder shows up instead of a broken icon

## What's in the folder

```
index.html   - the page itself
script.js    - gallery data + all the logic
style.css    - a tiny bit of custom styling
Image.jpg    - local image for the "Developer Workstation" card
README.md    - you are here
```

## How to run it

Put all the files in one folder and open `index.html` in your browser. Done.

You do need internet, since Tailwind, Font Awesome, Google Fonts, and most of the photos load from the web.

## Adding your own photos

Open `script.js` and add a new item to the `galleryData` array:

```js
{
    id: 13,
    title: "My Cool Photo",
    category: "nature",
    description: "Something about the photo.",
    url: "my-photo.jpg"   // local file or a link, both work
}
```

## Adding a new category

1. Copy one of the filter buttons in `index.html` and change `data-category` and the label
2. Use that same lowercase name as the `category` on your images

## Heads up

- Most images are hotlinked from other sites, so if one of them disappears, that card will show the placeholder. Download them and use local paths if you want them to stick around.
- The Tailwind CDN is fine for a project like this, but you'd want a proper build for a real production site.
