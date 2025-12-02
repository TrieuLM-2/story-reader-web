// reader.js

// DOM Elements
const viewerEl = document.getElementById('viewer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const tocToggle = document.getElementById('toc-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const tocList = document.getElementById('toc-list');
const bookTitleEl = document.getElementById('book-title');
const loadingEl = document.getElementById('loading');
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const chapterInfo = document.getElementById('chapter-info');
const pageInfo = document.getElementById('page-info');

// Settings
let currentFontSize = 100;
let currentTheme = 'light';
let book = null;
let rendition = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Check for book data in URL or LocalStorage
    const urlParams = new URLSearchParams(window.location.search);
    const bookKey = urlParams.get('book');

    if (!bookKey) {
        alert('No book specified!');
        window.location.href = './';
        return;
    }

    try {
        // Load book from IndexedDB
        const bookData = await localforage.getItem(bookKey);
        if (!bookData) {
            throw new Error('Book not found in storage');
        }

        // Initialize ePub
        book = ePub(bookData.data);
        
        // Render
        rendition = book.renderTo(viewerEl, {
            width: '100%',
            height: '100%',
            flow: 'paginated',
            manager: 'default'
        });

        // Display
        await rendition.display(bookData.cfi || undefined);

        // Load Metadata
        const metadata = await book.loaded.metadata;
        bookTitleEl.textContent = metadata.title;
        document.title = `${metadata.title} - Reader`;

        // Generate TOC
        const navigation = await book.loaded.navigation;
        renderTOC(navigation.toc);

        // Event Listeners
        rendition.on('relocated', (location) => {
            updateProgress(location, bookKey);
        });

        // Key navigation
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'ArrowRight') nextPage();
        });

        loadingEl.style.display = 'none';

    } catch (err) {
        console.error(err);
        alert('Error loading book: ' + err.message);
        loadingEl.style.display = 'none';
    }
});

// Navigation
function prevPage() {
    rendition.prev();
}

function nextPage() {
    rendition.next();
}

prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);

// Sidebar / TOC
tocToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

function renderTOC(toc) {
    tocList.innerHTML = '';
    toc.forEach(chapter => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = chapter.label;
        a.href = chapter.href;
        a.onclick = (e) => {
            e.preventDefault();
            rendition.display(chapter.href);
            sidebar.classList.remove('active');
        };
        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Settings
settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

// Font Size
document.getElementById('font-increase').addEventListener('click', () => {
    currentFontSize += 10;
    applySettings();
});

document.getElementById('font-decrease').addEventListener('click', () => {
    if (currentFontSize > 50) currentFontSize -= 10;
    applySettings();
});

// Themes
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentTheme = e.target.dataset.theme;
        applySettings();
    });
});

function applySettings() {
    if (!rendition) return;

    // Font Size
    rendition.themes.fontSize(`${currentFontSize}%`);
    document.getElementById('font-size-display').textContent = `${currentFontSize}%`;

    // Theme
    const themes = {
        light: { body: { color: '#000', background: '#fff' } },
        sepia: { body: { color: '#5b4636', background: '#f4ecd8' } },
        dark: { body: { color: '#fff', background: '#333' } }
    };
    
    rendition.themes.register('light', themes.light);
    rendition.themes.register('sepia', themes.sepia);
    rendition.themes.register('dark', themes.dark);
    
    rendition.themes.select(currentTheme);
    
    // Update UI colors
    const viewer = document.getElementById('viewer');
    if (currentTheme === 'dark') {
        viewer.style.background = '#333';
        document.body.style.background = '#333';
        document.getElementById('reader-header').style.background = '#222';
        document.getElementById('reader-header').style.color = '#fff';
        document.getElementById('reader-header').style.borderBottomColor = '#444';
        document.querySelectorAll('.back-btn, .book-title, .btn-icon').forEach(el => el.style.color = '#fff');
    } else if (currentTheme === 'sepia') {
        viewer.style.background = '#f4ecd8';
        document.body.style.background = '#f4ecd8';
        document.getElementById('reader-header').style.background = '#e9dfc6';
        document.getElementById('reader-header').style.color = '#5b4636';
        document.getElementById('reader-header').style.borderBottomColor = '#d3c8b0';
        document.querySelectorAll('.back-btn, .book-title, .btn-icon').forEach(el => el.style.color = '#5b4636');
    } else {
        viewer.style.background = '#fff';
        document.body.style.background = '#f4f4f4';
        document.getElementById('reader-header').style.background = '#fff';
        document.getElementById('reader-header').style.color = '#333';
        document.getElementById('reader-header').style.borderBottomColor = '#ddd';
        document.querySelectorAll('.back-btn, .book-title, .btn-icon').forEach(el => el.style.color = '#333');
    }
}

// Progress & Persistence
function updateProgress(location, bookKey) {
    // Save position
    localforage.getItem(bookKey).then(data => {
        if (data) {
            data.cfi = location.start.cfi;
            data.lastRead = new Date();
            localforage.setItem(bookKey, data);
        }
    });

    // Update info
    // Note: location.start.displayed.page and total are often not available immediately in epub.js pagination
    // We can use percentage
    // const percentage = Math.floor(location.start.percentage * 100);
    // pageInfo.textContent = `${percentage}%`;
}
