document.addEventListener('DOMContentLoaded', () => {
  const blogs = Array.isArray(window.MWF_BLOGS) ? window.MWF_BLOGS : [];
  const heroContent = document.getElementById('mwf-blog-hero-content');
  const articleMain = document.getElementById('mwf-blog-article-main');
  const tocMount = document.getElementById('mwf-blog-toc');
  const relatedMount = document.getElementById('mwf-blog-related-grid');
  const root = (document.body.dataset.root || '.').replace(/\/$/, '');

  if (!blogs.length || !heroContent || !articleMain || !tocMount || !relatedMount) {
    return;
  }

  const toRootPath = (path) => `${root}/${path}`.replace('/./', '/');
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = blogs.find((item) => item.slug === slug) || blogs[0];
  const relatedPosts = blogs.filter((item) => item.slug !== post.slug).slice(0, 3);
  const contentSections = Array.isArray(post.sections) ? post.sections : (Array.isArray(post.blueprint) ? post.blueprint : []);
  const sectionIds = contentSections.map((section, index) => `mwf-blog-section-${index + 1}`);
  const renderSectionMedia = (media) => {
    if (!media || !media.src) {
      return '';
    }

    const fitClass = media.fit === 'contain' ? ' mwf-blog-article__media--contain' : '';

    return `
      <figure class="mwf-blog-article__media${fitClass}">
        <img src="${toRootPath(media.src)}" alt="${media.alt || ''}">
        ${media.caption ? `<figcaption>${media.caption}</figcaption>` : ''}
      </figure>
    `;
  };

  document.title = `${post.title} | Marketing With a Flair`;

  heroContent.innerHTML = `
    <div class="mwf-blog-hero__meta" data-page-reveal data-reveal-x="-18" data-reveal-y="12">
      <span>${post.category}</span>
      <span>${post.readTime}</span>
    </div>
    <h1 class="mwf-section-title" id="mwf-blog-title" data-page-reveal data-reveal-x="-18" data-reveal-y="12">${post.title}</h1>
    <p class="mwf-section-copy" data-page-reveal data-reveal-x="-18" data-reveal-y="12">${post.description}</p>
    <div class="mwf-blog-hero__cover mwf-glass-card" data-page-reveal data-reveal-x="-18" data-reveal-y="12">
      <img src="${toRootPath(post.coverImage)}" alt="${post.coverAlt}">
    </div>
  `;

  articleMain.innerHTML = `
    <div class="mwf-blog-article__lede" data-page-reveal data-reveal-y="12">
      ${(post.intro || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
    </div>
    <div class="mwf-blog-article__sections">
      ${contentSections.map((section, index) => `
        <section class="mwf-blog-article__section" id="${sectionIds[index]}" data-page-reveal data-reveal-y="14">
          <div class="mwf-blog-article__section-copy">
            <h2>${section.heading}</h2>
            ${(section.copy || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
            ${section.checklist && section.checklist.length ? `
              <ul>
                ${section.checklist.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
          ${renderSectionMedia(section.media)}
        </section>
      `).join('')}
    </div>
    ${post.quote ? `
      <div class="mwf-glass-card mwf-blog-article__quote" data-page-reveal data-reveal-y="14">
        <blockquote>"${post.quote.text}"</blockquote>
        <strong>${post.quote.attribution}</strong>
      </div>
    ` : ''}
    ${post.closingCta ? `
      <div class="mwf-glass-panel mwf-blog-article__closing" data-page-reveal data-reveal-y="14">
        <p class="mwf-section-eyebrow">Next move</p>
        <h2>${post.closingCta.title}</h2>
        <p>${post.closingCta.copy}</p>
        <div class="mwf-hero-ionyx__actions">
          <div class="mwf-hero-ionyx__button mwf-hero-ionyx__button--primary">
            <a class="wp-block-button__link" href="../Contact/contact.html">Start the Conversation</a>
          </div>
          <div class="mwf-hero-ionyx__button mwf-hero-ionyx__button--ghost">
            <a class="wp-block-button__link" href="../Services/services.html">Explore Services</a>
          </div>
        </div>
      </div>
    ` : ''}
  `;

  tocMount.innerHTML = `
    <p class="mwf-section-eyebrow">Article map</p>
    <nav class="mwf-blog-article__toc-nav" aria-label="Article sections">
      ${contentSections.map((section, index) => `<a href="#${sectionIds[index]}">${section.heading}</a>`).join('')}
    </nav>
  `;

  if (relatedPosts.length) {
    relatedMount.innerHTML = relatedPosts.map((item) => `
      <a class="mwf-glass-card mwf-blog-related-card" href="./blog.html?slug=${encodeURIComponent(item.slug)}" data-page-reveal data-reveal-y="14">
        <div class="mwf-blog-related-card__media">
          <img src="${toRootPath(item.coverImage)}" alt="${item.coverAlt}">
        </div>
        <div class="mwf-blog-related-card__body">
          <div class="mwf-blog-card__meta">
            <span>${item.category}</span>
            <span>${item.readTime}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
        </div>
      </a>
    `).join('');
  } else {
    relatedMount.closest('.mwf-blog-related')?.remove();
  }
});
