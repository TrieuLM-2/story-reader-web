# Hướng dẫn Upload Cover Image

## Bước 1: Chuẩn bị file ảnh

Đổi tên file `thewolfatthedoor.jpg` thành `the-wolf-at-the-door.jpg`

## Bước 2: Upload qua GitHub Web

1. Vào https://github.com/TrieuLM-2/story-reader-web
2. Navigate đến folder: `assets/images/`
3. Click "Add file" → "Upload files"
4. Kéo thả file `the-wolf-at-the-door.jpg` vào
5. Commit message: "Add Wolf at the Door cover image"
6. Click "Commit changes"

## Bước 3: Upload qua Git Command Line

```bash
# Clone repository (nếu chưa có)
git clone https://github.com/TrieuLM-2/story-reader-web.git
cd story-reader-web

# Copy ảnh vào đúng folder
cp /path/to/thewolfatthedoor.jpg assets/images/the-wolf-at-the-door.jpg

# Commit và push
git add assets/images/the-wolf-at-the-door.jpg
git commit -m "Add Wolf at the Door cover image"
git push origin main
```

## Bước 4: Verify

Sau khi upload, check URL:
```
https://raw.githubusercontent.com/TrieuLM-2/story-reader-web/main/assets/images/the-wolf-at-the-door.jpg
```

Nếu hiển thị ảnh = thành công! ✅