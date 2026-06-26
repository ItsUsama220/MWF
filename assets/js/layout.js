(function () {
  const body = document.body;

  if (!body) {
    return;
  }

  const root = (body.dataset.root || '.').replace(/\/$/, '');
  const currentPage = body.dataset.page || 'home';
  const activePage = currentPage === 'blog' ? 'blogs' : currentPage;

  const toRootPath = (path) => {
    if (path.startsWith('#') || path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) {
      return path;
    }

    return `${root}/${path}`.replace('/./', '/');
  };

  const serviceTitanLink = body.dataset.serviceTitanLink || (currentPage === 'service-titan' ? './service-titan.html' : toRootPath('Pages/ServiceTitan/service-titan.html'));
  const contactLink = body.dataset.contactLink || (currentPage === 'contact' ? './contact.html' : toRootPath('Pages/Contact/contact.html'));
  const homeLink = currentPage === 'home' ? '#top' : toRootPath('index.html#top');
  const aboutLink = body.dataset.aboutLink || (currentPage === 'about' ? './about-us.html' : toRootPath('Pages/AboutUs/about-us.html'));
  const workLink = body.dataset.workLink || (currentPage === 'work' ? './our-way.html' : toRootPath('Pages/OurWay/our-way.html'));
  const blogsLink = body.dataset.blogsLink || (currentPage === 'blogs' ? './blogs.html' : toRootPath('Pages/Blogs/blogs.html'));
  const servicesLink = currentPage === 'services' ? './services.html' : toRootPath('Pages/Services/services.html');
  const reviewsLink = currentPage === 'reviews' ? './reviews.html' : toRootPath('Pages/Reviews/reviews.html');
  const logoLink = currentPage === 'home' ? './index.html' : toRootPath('index.html');
  const logoSrc = toRootPath('assets/images/mwf-logo.png');

  const navItems = [
    { key: 'home', label: 'Home', href: homeLink },
    { key: 'services', label: 'Services', href: servicesLink },
    { key: 'reviews', label: 'Reviews', href: reviewsLink },
    { key: 'service-titan', label: 'Service Titan', href: serviceTitanLink },
    { key: 'about', label: 'About Us', href: aboutLink },
    { key: 'work', label: 'Our Way', href: workLink },
    { key: 'blogs', label: 'Blogs', href: blogsLink },
    { key: 'contact', label: 'Contact Us', href: contactLink }
  ];

  const renderHeader = () => `
    <header class="mwf-header-shell mwf-header-shell--marketing-glass mwf-header-shell--glass mwf-header-shell--navy mwf-header-shell--red-accent">
      <div class="mwf-header-shell__inner mwf-header-shell__inner--nav-row">
        <div class="mwf-header-shell__brand-row">
          <a class="mwf-header-logo" href="${logoLink}" aria-label="Marketing With a Flair">
            <img src="${logoSrc}" alt="Marketing With a Flair">
          </a>
        </div>

        <button
          class="mwf-nav-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-navigation"
          aria-label="Open navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="mwf-header-nav" id="site-navigation" aria-label="Primary navigation">
          <ul class="wp-block-navigation__container">
            ${navItems
              .map(
                (item) => `
              <li class="wp-block-navigation-item${item.key === activePage ? ' current-menu-item' : ''}">
                <a class="wp-block-navigation-item__content" href="${item.href}">${item.label}</a>
              </li>`
              )
              .join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;

  const renderFooter = () => `
    <footer class="mwf-site-footer" aria-labelledby="mwf-footer-title">
      <div class="mwf-site-footer__main">
        <div class="mwf-site-footer__inner">
          <div class="mwf-site-footer__brand">
            <p class="mwf-section-eyebrow" id="mwf-footer-title">Marketing With A Flair</p>
            <div class="mwf-site-footer__actions">
              <div class="mwf-hero-ionyx__actions mwf-landing-actions mwf-landing-actions--center">
                <div class="mwf-hero-ionyx__button mwf-hero-ionyx__button--primary">
                  <a class="wp-block-button__link" href="${contactLink}">Schedule Now</a>
                </div>
                <div class="mwf-hero-ionyx__button mwf-hero-ionyx__button--ghost">
                  <a class="wp-block-button__link" href="tel:6023744923">Call (602) 374-4923</a>
                </div>
              </div>
            </div>
            <p class="mwf-site-footer__tagline">Full-service marketing for home service brands with strategy, creative, and campaign support built for measurable growth.</p>

            <div class="mwf-site-footer__social" aria-label="Social media links">
              <a class="mwf-site-footer__social-link" href="https://www.facebook.com/mktgwithaflair/" target="_blank" rel="noreferrer" aria-label="Marketing With a Flair on Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 21v-7.2h2.4l.36-2.81H13.5V9.19c0-.81.23-1.36 1.39-1.36h1.49V5.31c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.63 1.31-3.63 3.72v2.07H8.14v2.81h2.44V21h2.92Z" fill="currentColor"></path>
                </svg>
              </a>
              <a class="mwf-site-footer__social-link" href="https://www.instagram.com/marketingwithaflair/" target="_blank" rel="noreferrer" aria-label="Marketing With a Flair on Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.75A3 3 0 0 0 4.75 7.75v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-8.5a3 3 0 0 0-3-3h-8.5Zm8.88 1.31a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.41 4.41 0 0 1 12 7.6Zm0 1.75A2.65 2.65 0 1 0 14.65 12 2.65 2.65 0 0 0 12 9.35Z" fill="currentColor"></path>
                </svg>
              </a>
            </div>
          </div>

          <nav class="mwf-site-footer__nav" aria-label="Footer navigation">
            ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
          </nav>
        </div>
      </div>
    </footer>
  `;

  const headerMount = document.querySelector('[data-mwf-header]');
  const footerMount = document.querySelector('[data-mwf-footer]');

  if (headerMount) {
    headerMount.outerHTML = renderHeader();
  }

  if (footerMount) {
    footerMount.outerHTML = renderFooter();
  }
})();
