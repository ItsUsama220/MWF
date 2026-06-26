document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('[data-page-reveal]'));

  if (!items.length) {
    return;
  }

  if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  items.forEach((item, index) => {
    const x = Number.parseFloat(item.dataset.revealX || '0');
    const y = Number.parseFloat(item.dataset.revealY || '16');
    const duration = Number.parseFloat(item.dataset.revealDuration || '0.82');
    const delayStep = Number.parseFloat(item.dataset.revealDelayStep || '0.04');
    const maxDelay = Number.parseFloat(item.dataset.revealMaxDelay || '0.2');
    const start = item.dataset.revealStart || 'top 84%';
    const delay = Math.min(index * delayStep, maxDelay);

    gsap.fromTo(
      item,
      {
        opacity: 0,
        x,
        y,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start,
          once: true
        }
      }
    );
  });
});
