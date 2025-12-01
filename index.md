---
layout: default
title: Trang Chủ
---

<!-- Welcome Section -->
<section class="welcome-section">
    <h1 class="welcome-title">🏳️‍🌈 Chào mừng đến với Góc Truyện Của Tui</h1>
    <p class="welcome-text">
        Đây là cái ổ nhỏ tui lập ra để lưu trữ mấy bộ đam mỹ, boylove mà tui tâm đắc. Web nhà làm, bao mượt, không quảng cáo, đọc sướng con mắt.
    </p>
</section>

<!-- Trending Stories Section -->
<section class="stories-section">
    <div class="section-header">
        <h2 class="section-title">📚 Danh sách truyện đang lên sóng</h2>
        <div class="section-divider"></div>
    </div>
    
    <div class="bookshelf-grid">
        {% for story in site.stories limit:6 %}
        <a href="{{ story.url | relative_url }}" class="book-card">
            {% if story.cover %}
            <img src="{{ story.cover | relative_url }}" alt="{{ story.title }}" class="card-cover" onerror="this.src='https://placehold.co/400x500?text={{ story.title | url_encode }}'">
            {% else %}
            <img src="https://placehold.co/400x500?text={{ story.title | url_encode }}" alt="{{ story.title }}" class="card-cover">
            {% endif %}
            <div class="card-body">
                <h3 class="card-title">{{ story.title }}</h3>
                <div class="card-author">Tác giả: {{ story.author }}</div>
                <div class="card-desc">
                    {{ story.excerpt | strip_html | truncatewords: 30 }}
                </div>
                {% if story.tags %}
                <span class="card-tag">{{ story.tags | join: ', ' }}</span>
                {% endif %}
            </div>
        </a>
        {% endfor %}
    </div>
</section>

<!-- Upcoming Section -->
<section class="upcoming-section">
    <div class="section-header">
        <h2 class="section-title">🚧 Dự án sắp tới</h2>
        <div class="section-divider"></div>
    </div>
    
    <div class="upcoming-box">
        <p>Đang cập nhật thêm... (Chờ tui rảnh đã)</p>
    </div>
</section>

<!-- Footer Text -->
<hr class="footer-divider">
<p class="footer-note">Web này chạy bằng cơm và sự đam mê của TrieuLM.</p>