const galleryData = [
    {
        id: 1,
        title: "Misty Pine Forest",
        category: "nature",
        description: "A serene morning in the evergreen pine forest with soft morning fog rolling through the canopy.",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 2,
        title: "Alpine Mountain Peak",
        category: "nature",
        description: "Majestic snow-capped mountain peaks rising sharply against a clear blue alpine sky.",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 3,
        title: "Modern Glass Skyscraper",
        category: "architecture",
        description: "Futuristic corporate architecture featuring geometric glass panels reflecting the urban clouds.",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 4,
        title: "Minimalist Spiral Staircase",
        category: "architecture",
        description: "A striking spiral staircase inside a modern cultural museum with pristine lighting.",
        url: "https://images.stockcake.com/public/9/2/f/92f756e6-b354-4f6f-a252-5c4822cdc674_large/geometric-spiral-architecture-stockcake.jpg"
    },
    {
        id: 5,
        title: "Quantum Code & Circuits",
        category: "technology",
        description: "Macro shot of high-performance semiconductor microchip circuits illuminated with neon blue light.",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 6,
        title: "Developer Workstation",
        category: "technology",
        description: "Ergonomic multi-monitor setup running complex data algorithms and software code in a dark room.",
        url: "Image.jpg"
    },
    {
        id: 7,
        title: "Portrait of Son Goku",
        category: "anime",
        description: "Goku is cheerful, pure-hearted, and constantly seeks to improve himself. He loves fighting strong opponents and pushes beyond his limits, often inspiring allies and even enemies.",
        url: "https://wallpapercave.com/wp/wp7275596.png"
    },
    {
        id: 8,
        title: "Monkey D Luffy Portrait",
        category: "anime",
        description: "Luffy is carefree, fearless, and extremely loyal to his friends. He values freedom above all else and never backs down from a challenge. His optimism inspires those around him.",
        url: "https://motionbgs.com/media/1953/monkey-d-luffy-straw-hat2.jpg"
    },
    {
        id: 9,
        title: "Serene Waterfall Cascade",
        category: "nature",
        description: "Crystal clear water cascading gracefully over mossy rocks in a hidden tropical gorge.",
        url: "https://images.stockcake.com/public/8/5/d/85d6cec9-3bbd-4734-b228-7e2d09dbf179/serene-autumn-cascade-stockcake.jpg"
    },
    {
        id: 10,
        title: "Historic Gothic Bridge",
        category: "architecture",
        description: "Centuries-old stone arch bridge standing strong over a calm European river at dusk.",
        url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 11,
        title: "Futuristic Robotics Lab",
        category: "technology",
        description: "Advanced robotic arm engineering and artificial intelligence development facility.",
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 12,
        title: "Ichigo Kurosaki soul reaper Portrait",
        category: "anime",
        description: "Ichigo is blunt, sarcastic, witty, hot-headed, disrespectful, and cynical. Despite this, he is a loving brother and husband who is highly protective of his sisters and his wife Orihime .",
        url: "https://4kwallpapers.com/images/wallpapers/ichigo-kurosaki-1920x1080-10502.jpg"
    }
];

let currentFilteredImages = [...galleryData];
let currentIndex = 0;

// DOM Elements
const gridEl = document.getElementById('gallery-grid');
const emptyEl = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightboxEl = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

function renderGallery(images) {
    gridEl.innerHTML = '';
    if (images.length === 0) {
        emptyEl.classList.remove('hidden');
        return;
    }
    emptyEl.classList.add('hidden');

    images.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `gallery-item group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 cursor-pointer flex flex-col`;
        card.setAttribute('data-index', index);
        
        card.innerHTML = `
            <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" onerror="this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Unavailable'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span class="text-white text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                        <i class="fa-solid fa-expand mr-1"></i> View Lightbox
                    </span>
                </div>
                <span class="absolute top-3 right-3 uppercase tracking-wider text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900/70 backdrop-blur-md text-white">
                    ${item.category}
                </span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">${item.title}</h3>
                <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${item.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            openLightbox(index, images);
        });

        gridEl.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-indigo-600', 'text-white', 'shadow-indigo-500/25');
            b.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-100', 'border', 'border-slate-200');
        });
        const target = e.currentTarget;
        target.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-100', 'border', 'border-slate-200');
        target.classList.add('bg-indigo-600', 'text-white', 'shadow-indigo-500/25');

        const category = target.getAttribute('data-category');
        if (category === 'all') {
            currentFilteredImages = [...galleryData];
        } else {
            currentFilteredImages = galleryData.filter(img => img.category === category);
        }
        renderGallery(currentFilteredImages);
    });
});

function openLightbox(index, imageArray) {
    currentIndex = index;
    updateLightboxContent(imageArray);
    lightboxEl.classList.remove('hidden');
    setTimeout(() => {
        lightboxEl.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxEl.classList.add('opacity-0');
    setTimeout(() => {
        lightboxEl.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

function updateLightboxContent(imageArray = currentFilteredImages) {
    const item = imageArray[currentIndex];
    if (!item) return;
    lightboxImg.src = item.url;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category.toUpperCase();
    lightboxDesc.textContent = item.description;
    lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentFilteredImages.length;
    updateLightboxContent();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
    updateLightboxContent();
}

// Event Listeners for Lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) {
        closeLightbox();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (lightboxEl.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    renderGallery(galleryData);
});