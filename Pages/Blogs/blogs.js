document.addEventListener('DOMContentLoaded', () => {
  const blogs = Array.isArray(window.MWF_BLOGS) ? window.MWF_BLOGS : [];
  const gridMount = document.getElementById('mwf-blog-grid');
  const root = (document.body.dataset.root || '.').replace(/\/$/, '');

  if (!gridMount || !blogs.length) {
    return;
  }

  const toRootPath = (path) => `${root}/${path}`.replace('/./', '/');
  const toBlogUrl = (slug) => `../Blog/blog.html?slug=${encodeURIComponent(slug)}`;

  gridMount.innerHTML = blogs.map((blog) => `
    <a class="mwf-glass-card mwf-blog-card" href="${toBlogUrl(blog.slug)}" data-page-reveal data-reveal-y="16">
      <div class="mwf-blog-card__media">
        <img src="${toRootPath(blog.coverImage)}" alt="${blog.coverAlt}">
      </div>
      <div class="mwf-blog-card__body">
        <div class="mwf-blog-card__meta">
          <span>${blog.category}</span>
          <span>${blog.readTime}</span>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <span class="mwf-blog-card__cta">Open article</span>
      </div>
    </a>
  `).join('');
});
