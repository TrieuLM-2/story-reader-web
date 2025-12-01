---
layout: default
title: Truyện Đang Ra
permalink: /dang-ra/
---

<section class="category-page">
    <div class="category-header">
        <h1 class="category-title">🔥 Truyện Đang Ra</h1>
        <p class="category-desc">Những bộ truyện đang cập nhật, đọc theo dõi từng chương mới!</p>
    </div>

    <div class="bookshelf-grid">
        {% assign ongoing_stories = site.stories | where: "status", "Đang Ra" %}
        
        {% if ongoing_stories.size > 0 %}
            {% for story in ongoing_stories %}
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
                    <div class="update-badge">
                        <i class="fas fa-clock"></i> Cập nhật: {{ story.date | date: "%d/%m/%Y" }}
                    </div>
                </div>
            </a>
            {% endfor %}
        {% else %}
            <div class="empty-state">
                <i class="fas fa-book-reader" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                <p>Chưa có truyện đang ra nào. Sắp có thôi!</p>
            </div>
        {% endif %}
    </div>
</section>

<style>
.category-header {
    text-align: center;
    margin-bottom: 50px;
}

.category-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 800;
}

.category-desc {
    font-size: 1.1rem;
    color: #7f8c8d;
    max-width: 600px;
    margin: 0 auto;
}

.update-badge {
    margin-top: 10px;
    font-size: 0.8rem;
    color: #16a085;
    font-weight: 600;
}

.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    color: #999;
}
</style>