# Góc Truyện Của Tui

## Mô tả
Website đọc truyện trực tuyến được xây dựng với Jekyll, chuyên về thể loại đam mỹ và boylove.

## Cài đặt

### Yêu cầu
- Ruby 2.7 trở lên
- Jekyll 4.3
- Bundler

### Cài đặt local

```bash
# Clone repository
git clone https://github.com/TrieuLM-2/story-reader-web.git
cd story-reader-web

# Cài đặt dependencies
bundle install

# Chạy server local
bundle exec jekyll serve

# Truy cập tại http://localhost:4000/story-reader-web/
```

## Cấu trúc thư mục

```
├── _config.yml           # Cấu hình Jekyll
├── _layouts/            # Layout templates
│   ├── default.html     # Layout mặc định
│   └── story.html       # Layout cho trang truyện
├── _stories/            # Collection cho các truyện
├── index.html           # Trang chủ
├── style.css            # Stylesheet chính
├── script.js            # JavaScript
└── Gemfile              # Ruby dependencies
```

## Thêm truyện mới

Tạo file mới trong thư mục `_stories/` với format:

```markdown
---
layout: story
title: "Tên truyện"
author: "Tác giả"
cover: "/assets/images/cover.jpg"
genres: ["MM Romance", "Sport"]
status: "Hoàn thành"
tags: ["Hockey", "Rivals to Lovers"]
rating: 4.5
rating_count: 9
views: "50.1K"
date: 2025-10-08
---

Nội dung mô tả truyện ở đây...
```

## Deploy lên GitHub Pages

1. Push code lên GitHub
2. Vào Settings > Pages
3. Chọn Source: Deploy from a branch
4. Chọn Branch: main, folder: / (root)
5. Save

Website sẽ được deploy tại: `https://trieulm-2.github.io/story-reader-web/`

## Tính năng

- ✅ Giao diện hiện đại, responsive
- ✅ Elevated card layout
- ✅ Tìm kiếm truyện
- ✅ Phân loại theo thể loại
- ✅ Trang chi tiết truyện với tabs
- ✅ Đánh giá sao
- ✅ SEO friendly
- ✅ Sitemap tự động

## Công nghệ

- Jekyll 4.3
- HTML5 / CSS3
- JavaScript ES6
- Font Awesome Icons
- GitHub Pages

## License

MIT License

---

Web này chạy bằng cơm và sự đam mê của TrieuLM.