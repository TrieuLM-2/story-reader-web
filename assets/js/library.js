// library.js

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const libraryGrid = document.getElementById('library-grid');
    const uploadBtn = document.getElementById('upload-btn');

    // Initialize Library
    loadLibrary();

    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await addBook(file);
            }
        });
    }
});

async function addBook(file) {
    if (file.type !== 'application/epub+zip') {
        alert('Please select a valid EPUB file.');
        return;
    }

    try {
        // Show loading state?

        // Parse metadata using epub.js
        const book = ePub(file);
        const metadata = await book.loaded.metadata;
        const coverUrl = await book.coverUrl();

        // Create unique ID
        const id = 'book_' + Date.now();

        // Convert cover to base64 if needed, or store blob
        // For simplicity, we'll try to store the file blob directly in IndexedDB

        const bookData = {
            id: id,
            title: metadata.title,
            author: metadata.creator,
            data: file, // Store the blob
            cover: coverUrl, // This might be a blob URL, which expires. We might need to extract the cover image blob.
            added: new Date(),
            cfi: null
        };

        // If coverUrl is a blob URL, fetch it and store as blob
        if (coverUrl) {
            const response = await fetch(coverUrl);
            const blob = await response.blob();
            bookData.coverBlob = blob;
        }

        await localforage.setItem(id, bookData);

        // Refresh library
        loadLibrary();

        alert('Book added successfully!');

    } catch (err) {
        console.error(err);
        alert('Error adding book: ' + err.message);
    }
}

async function loadLibrary() {
    const libraryGrid = document.getElementById('library-grid');
    if (!libraryGrid) return;

    libraryGrid.innerHTML = '';

    const keys = await localforage.keys();
    const books = [];

    for (const key of keys) {
        if (key.startsWith('book_')) {
            const book = await localforage.getItem(key);
            books.push(book);
        }
    }

    // Sort by recently added
    books.sort((a, b) => new Date(b.added) - new Date(a.added));

    if (books.length === 0) {
        libraryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Chưa có sách nào. Hãy tải lên file EPUB!</p>';
        return;
    }

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';

        let coverSrc = 'https://via.placeholder.com/150x220?text=No+Cover';
        if (book.coverBlob) {
            coverSrc = URL.createObjectURL(book.coverBlob);
        } else if (book.cover) {
            // Fallback if we stored the URL (might be broken)
            coverSrc = book.cover;
        }

        card.innerHTML = `
            <div style="position: relative;">
                <img src="${coverSrc}" alt="${book.title}" class="card-cover">
                <button class="delete-btn" data-id="${book.id}" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">&times;</button>
            </div>
            <div class="card-body">
                <h3 class="card-title">${book.title}</h3>
                <div class="card-author">${book.author}</div>
                <a href="reader.html?book=${book.id}" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: auto;">Đọc ngay</a>
            </div>
        `;

        libraryGrid.appendChild(card);
    });

    // Add delete listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (confirm('Bạn có chắc muốn xóa sách này?')) {
                const id = e.target.dataset.id;
                await localforage.removeItem(id);
                loadLibrary();
            }
        });
    });
}
