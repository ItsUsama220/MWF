document.addEventListener('DOMContentLoaded', () => {
  const pageShell = document.querySelector('.mwf-page-shell');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!pageShell || !window.gsap || !window.ScrollTrigger || prefersReducedMotion) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(pageShell, {
    '--mwf-page-backdrop-shift': '-96px',
    ease: 'none',
    scrollTrigger: {
      trigger: pageShell,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.mwf-header-shell');
  const nav = document.querySelector('.mwf-header-nav');
  const navToggle = document.querySelector('.mwf-nav-toggle');
  const section = document.querySelector('.mwf-hero-ionyx');

  const toggleScrolledState = () => {
    if (!header) {
      return;
    }

    if (window.scrollY > 18) {
      document.body.classList.add('mwf-scrolled');
      return;
    }

    document.body.classList.remove('mwf-scrolled');
  };

  const closeMenu = () => {
    if (!nav || !navToggle) {
      return;
    }

    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('mwf-menu-open');
  };

  const openMenu = () => {
    if (!nav || !navToggle) {
      return;
    }

    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation');
    document.body.classList.add('mwf-menu-open');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeMenu();
        return;
      }

      openMenu();
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) {
        closeMenu();
      }
    });
  }

  toggleScrolledState();
  window.addEventListener('scroll', toggleScrolledState, { passive: true });

  if (!section || section.dataset.heroReady === 'true') {
    return;
  }

  section.dataset.heroReady = 'true';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const canvas = section.querySelector('.mwf-hero-ionyx__orb-canvas');
  const shell = section.querySelector('.mwf-hero-ionyx__orb-shell');
  const visual = section.querySelector('.mwf-hero-ionyx__visual');
  const content = section.querySelector('.mwf-hero-ionyx__content');

  if (!canvas || !shell || !visual || !content) {
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    content.style.opacity = '1';
    visual.style.opacity = '1';
    return;
  }

  const particleCount = isMobile ? 760 : 1380;
  const particles = [];
  const pointer = { x: 0, y: 0, canvasX: 0, canvasY: 0, active: false };
  let frameId = 0;
  let isVisible = true;
  let sphereRadius = 150;
  let viewportSize = 320;
  let rotationX = -0.18;
  let rotationY = 0.4;
  let velocityX = 0;
  let velocityY = 0.0075;
  let targetVelocityX = 0;
  let targetVelocityY = 0.009;

  const makeParticles = () => {
    particles.length = 0;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < particleCount; index += 1) {
      const y = 1 - (index / (particleCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;

      particles.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        weight: 0.35 + Math.random() * 0.5
      });
    }
  };

  const resize = () => {
    const bounds = shell.getBoundingClientRect();
    const size = Math.max(Math.min(bounds.width, bounds.height), 260);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    viewportSize = size;
    sphereRadius = size * 0.34;

    canvas.width = Math.round(size * pixelRatio);
    canvas.height = Math.round(size * pixelRatio);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const rotatePoint = (point) => {
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const y2 = point.y * cosX - z1 * sinX;
    const z2 = point.y * sinX + z1 * cosX;

    return {
      x: x1 * sphereRadius,
      y: y2 * sphereRadius,
      z: z2 * sphereRadius
    };
  };

  const draw = () => {
    if (!isVisible) {
      frameId = 0;
      return;
    }

    const center = viewportSize / 2;
    const perspective = sphereRadius * 2.3;

    context.clearRect(0, 0, viewportSize, viewportSize);

    if (!prefersReducedMotion) {
      targetVelocityY = 0.009 + pointer.x * 0.014;
      targetVelocityX = -0.002 + pointer.y * 0.009;
      velocityY += (targetVelocityY - velocityY) * 0.08;
      velocityX += (targetVelocityX - velocityX) * 0.08;
      rotationY += velocityY;
      rotationX += velocityX;
    }

    const rotated = particles.map(rotatePoint);

    rotated.forEach((point) => {
      const scale = perspective / (perspective - point.z);
      let projectedX = point.x * scale + center;
      let projectedY = point.y * scale + center;
      const normalizedDepth = (point.z + sphereRadius) / (sphereRadius * 2);
      const radius = Math.max(0.2, normalizedDepth * 0.62);
      let opacity = 0.14 + normalizedDepth * 0.38;
      const goldMix = pointer.active ? 0.22 : 0.12;
      const red = 255 - Math.round(57 * goldMix);
      const green = 255 - Math.round(94 * goldMix);
      const blue = 255 - Math.round(164 * goldMix);

      if (pointer.active) {
        const dx = projectedX - pointer.canvasX;
        const dy = projectedY - pointer.canvasY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = viewportSize * 0.17;

        if (distance < influenceRadius) {
          const safeDistance = Math.max(distance, 0.001);
          const force = 1 - safeDistance / influenceRadius;
          const repel = force * force * (22 + normalizedDepth * 18);

          projectedX += (dx / safeDistance) * repel;
          projectedY += (dy / safeDistance) * repel;
          opacity *= 1 - force * 0.72;
        }
      }

      context.beginPath();
      context.arc(projectedX, projectedY, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      context.fill();
    });

    frameId = window.requestAnimationFrame(draw);
  };

  const handlePointerMove = (event) => {
    const bounds = shell.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;

    pointer.x = (relativeX - 0.5) * 2;
    pointer.y = (relativeY - 0.5) * 2;
    pointer.canvasX = relativeX * viewportSize;
    pointer.canvasY = relativeY * viewportSize;
    pointer.active = true;
    shell.classList.add('is-hovered');
    shell.style.setProperty('--orb-light-x', `${(relativeX * 100).toFixed(2)}%`);
    shell.style.setProperty('--orb-light-y', `${(relativeY * 100).toFixed(2)}%`);
  };

  const handlePointerLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
    pointer.canvasX = viewportSize * 0.5;
    pointer.canvasY = viewportSize * 0.5;
    pointer.active = false;
    shell.classList.remove('is-hovered');
    shell.style.setProperty('--orb-light-x', '50%');
    shell.style.setProperty('--orb-light-y', '50%');
  };

  const startAnimation = () => {
    if (!frameId) {
      frameId = window.requestAnimationFrame(draw);
    }
  };

  const stopAnimation = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
  };

  makeParticles();
  resize();
  pointer.canvasX = viewportSize * 0.5;
  pointer.canvasY = viewportSize * 0.5;
  shell.style.setProperty('--orb-light-x', '50%');
  shell.style.setProperty('--orb-light-y', '50%');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;

          if (isVisible) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }

  startAnimation();

  shell.addEventListener('pointermove', handlePointerMove);
  shell.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('resize', resize);

  if (window.gsap) {
    window.gsap.set([content, visual], { opacity: 1 });

    if (!prefersReducedMotion) {
      const introTimeline = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
      const addIntroStep = (target, animation, position) => {
        if (target) {
          introTimeline.from(target, animation, position);
        }
      };

      addIntroStep(content, { y: 28, opacity: 0, duration: 0.9 });
      addIntroStep(section.querySelector('.mwf-hero-ionyx__title'), { y: 26, opacity: 0, duration: 0.72 }, '-=0.55');
      addIntroStep(section.querySelector('.mwf-hero-ionyx__tagline'), { y: 26, opacity: 0, duration: 0.72 }, '-=0.55');
      addIntroStep(section.querySelector('.mwf-hero-ionyx__actions'), { y: 26, opacity: 0, duration: 0.72 }, '-=0.55');
      addIntroStep(visual, { scale: 0.92, opacity: 0, rotate: -8, duration: 1.05 }, '-=0.92');

      document.querySelectorAll('.mwf-hero-ionyx__button').forEach((button) => {
        const hoverLiftY = -2.5;
        const hoverScale = 1.022;
        const interactiveTarget = button.querySelector('.wp-block-button__link');

        if (!interactiveTarget) {
          return;
        }

        interactiveTarget.addEventListener('pointermove', (event) => {
          const bounds = button.getBoundingClientRect();
          const relativeX = (event.clientX - bounds.left) / bounds.width;
          const relativeY = (event.clientY - bounds.top) / bounds.height;
          const moveX = (relativeX - 0.5) * 5.5;
          const moveY = (relativeY - 0.5) * 4;

          interactiveTarget.style.setProperty('--button-glow-x', `${(relativeX * 100).toFixed(2)}%`);
          interactiveTarget.style.setProperty('--button-glow-y', `${(relativeY * 100).toFixed(2)}%`);

          window.gsap.to(interactiveTarget, {
            x: moveX,
            y: moveY + hoverLiftY,
            scale: hoverScale,
            duration: 0.42,
            ease: 'power3.out',
            overwrite: true
          });
        });

        interactiveTarget.addEventListener('pointerenter', () => {
          button.classList.add('is-hovered');

          window.gsap.to(interactiveTarget, {
            scale: hoverScale,
            y: hoverLiftY,
            duration: 0.46,
            ease: 'power4.out',
            overwrite: true
          });
        });

        interactiveTarget.addEventListener('pointerleave', () => {
          button.classList.remove('is-hovered');
          interactiveTarget.style.setProperty('--button-glow-x', '82%');
          interactiveTarget.style.setProperty('--button-glow-y', '12%');

          window.gsap.to(interactiveTarget, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: true
          });
        });
      });

      shell.addEventListener('pointermove', (event) => {
        const bounds = shell.getBoundingClientRect();
        const moveX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
        const moveY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;

        window.gsap.to(shell, {
          x: moveX,
          y: moveY,
          scale: 1.015,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true
        });
      });

      shell.addEventListener('pointerleave', () => {
        window.gsap.to(shell, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true
        });
      });

      if (window.ScrollTrigger && !isMobile) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        const bottomWave = section.querySelector('.mwf-hero-ionyx__wave--bottom');
        if (bottomWave) {
          window.gsap.to(bottomWave, {
            xPercent: 10,
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        window.gsap.to(shell, {
          yPercent: 8,
          rotate: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  } else {
    content.style.opacity = '1';
    visual.style.opacity = '1';
  }
});

const initContinuationAnimations = () => {
  const continuation = document.querySelector('.mwf-landing-continuation');

  if (!continuation || continuation.dataset.continuationReady === 'true') {
    return;
  }

  continuation.dataset.continuationReady = 'true';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = Boolean(window.gsap && window.ScrollTrigger && !prefersReducedMotion);

  if (!canAnimate) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const reveal = (targets, config = {}) => {
    if (!targets) {
      return null;
    }

    const items = gsap.utils.toArray(targets).filter(Boolean);

    if (!items.length) {
      return null;
    }

    const {
      trigger = items[0],
      start = 'top 84%',
      duration = 0.94,
      delay = 0.12,
      stagger = 0,
      ease = 'power2.out',
      x = 0,
      y = 28,
      scale = 1,
      filter = 'blur(10px)'
    } = config;

    gsap.set(items, {
      x,
      y,
      scale,
      opacity: 0,
      filter,
    });

    return ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          stagger,
          ease,
          clearProps: 'transform,filter,opacity'
        });
      }
    });
  };

  const revealSequence = (targets, config = {}) => reveal(targets, {
    stagger: 0.1,
    ...config
  });

  const getTextContentTargets = (container, extras = []) => {
    if (!container) {
      return [];
    }

    return [
      container.querySelector('.mwf-section-eyebrow'),
      container.querySelector('.mwf-section-title'),
      ...container.querySelectorAll('.mwf-section-copy, .mwf-copy-stack p, .mwf-contact-row'),
      ...extras.filter(Boolean)
    ].filter(Boolean);
  };

  const trustSection = continuation.querySelector('.mwf-trust-section');
  if (trustSection) {
    const trustPlaceholder = trustSection.querySelector('[data-reveal="placeholder-left"]');
    const trustContent = trustSection.querySelector('[data-reveal="panel-right"]');
    const trustActions = trustContent?.querySelector('[data-reveal="cta"]');

    reveal(trustPlaceholder, {
      trigger: trustSection,
      x: -72,
      y: 18,
      duration: 1.02,
      start: 'top 66%'
    });
    revealSequence(getTextContentTargets(trustContent, [trustActions]), {
      trigger: trustSection,
      x: 58,
      y: 0,
      duration: 0.88,
      stagger: 0.12,
      start: 'top 66%'
    });
  }

  const marqueeSection = continuation.querySelector('.mwf-partner-marquee');
  if (marqueeSection) {
    const rail = marqueeSection.querySelector('[data-marquee-rail]');
    const track = marqueeSection.querySelector('[data-marquee-track]');
    const set = track?.querySelector('.mwf-marquee-set');
    let marqueeTween;

    if (track && set) {
      const updateMarquee = () => {
        marqueeTween?.kill();
        gsap.set(track, { x: 0 });

        rail?.style.setProperty('--mwf-marquee-set-width', `${rail.clientWidth}px`);
        const gap = Number.parseFloat(window.getComputedStyle(track).gap || '16');
        const distance = set.offsetWidth + gap;
        const speed = window.innerWidth <= 767 ? 24 : 34;
        const duration = distance / speed;

        marqueeTween = gsap.to(track, {
          x: -distance,
          duration,
          ease: 'none',
          repeat: -1,
          paused: false
        });
      };

      updateMarquee();
      window.addEventListener('resize', updateMarquee);

      const playMarquee = () => marqueeTween?.play();

      const pauseMarquee = () => marqueeTween?.pause();

      rail?.addEventListener('mouseenter', pauseMarquee);
      rail?.addEventListener('mouseleave', playMarquee);
      track.addEventListener('focusin', pauseMarquee);
      track.addEventListener('focusout', playMarquee);
    }
  }

  const testimonials = continuation.querySelector('.mwf-testimonials');
  if (testimonials) {
    const reviewCards = testimonials.querySelectorAll('.mwf-review-card');
    const summaryContent = testimonials.querySelectorAll('[data-reveal="summary"] > *');
    const headerContent = [
      testimonials.querySelector('.mwf-section-eyebrow'),
      testimonials.querySelector('.mwf-section-title'),
      testimonials.querySelector('.mwf-section-copy')
    ].filter(Boolean);

    revealSequence(headerContent, {
      trigger: testimonials,
      x: 36,
      y: 0,
      duration: 0.84,
      stagger: 0.12,
      start: 'top 68%'
    });
    revealSequence(summaryContent, {
      trigger: testimonials,
      x: -28,
      y: 18,
      duration: 0.74,
      stagger: 0.08,
      start: 'top 70%'
    });
    reviewCards.forEach((card) => {
      revealSequence(card.children, {
        trigger: card,
        y: 26,
        duration: 0.7,
        stagger: 0.06,
        start: 'top 82%'
      });
    });
  }

  const resources = continuation.querySelector('.mwf-resource-grid');
  if (resources) {
    const resourceCards = resources.querySelectorAll('.mwf-resource-card');
    const resourceIntro = [
      resources.querySelector('.mwf-section-eyebrow'),
      resources.querySelector('.mwf-section-title'),
      resources.querySelector('.mwf-section-copy')
    ].filter(Boolean);

    revealSequence(resourceIntro, {
      trigger: resources,
      x: 34,
      y: 0,
      duration: 0.82,
      stagger: 0.12,
      start: 'top 68%'
    });
    resourceCards.forEach((card, index) => {
      revealSequence([
        card.querySelector('.mwf-resource-card__icon'),
        card.querySelector('h3'),
        card.querySelector('p')
      ], {
        trigger: card,
        x: index % 2 === 0 ? -22 : 22,
        y: 18,
        duration: 0.68,
        stagger: 0.06,
        start: 'top 82%'
      });
    });
  }

  const qualityBanner = continuation.querySelector('.mwf-quality-banner');
  if (qualityBanner) {
    const bannerVisual = qualityBanner.querySelector('[data-reveal="banner"]');
    const overlayContent = getTextContentTargets(
      qualityBanner.querySelector('.mwf-quality-banner__overlay'),
      [qualityBanner.querySelector('[data-reveal="cta-group"]')]
    );

    reveal(bannerVisual, {
      trigger: qualityBanner,
      x: -60,
      y: 20,
      duration: 0.92,
      start: 'top 70%'
    });
    revealSequence(overlayContent, {
      trigger: qualityBanner,
      x: 54,
      y: 0,
      duration: 0.76,
      stagger: 0.1,
      start: 'top 70%'
    });
  }

  const localSection = continuation.querySelector('.mwf-local-specialist');
  if (localSection) {
    const localRows = localSection.querySelectorAll('.mwf-contact-row');
    const localMap = localSection.querySelector('.mwf-map-placeholder');
    const localVisuals = localSection.querySelector('[data-reveal="panel-right"]');
    const localContact = localSection.querySelector('[data-reveal="panel-left"]');
    const localText = [
      localContact?.querySelector('.mwf-section-eyebrow'),
      localContact?.querySelector('.mwf-section-title'),
      localContact?.querySelector('.mwf-section-copy')
    ].filter(Boolean);

    revealSequence(localText, {
      trigger: localSection,
      x: 42,
      y: 0,
      duration: 0.74,
      stagger: 0.1,
      start: 'top 70%'
    });
    revealSequence(localRows, {
      trigger: localSection,
      x: 28,
      y: 18,
      duration: 0.58,
      stagger: 0.06,
      start: 'top 74%'
    });
    reveal(localVisuals?.querySelector('.mwf-badge-placeholder'), {
      trigger: localSection,
      x: -44,
      y: 18,
      duration: 0.82,
      start: 'top 70%'
    });
    reveal(localMap, {
      trigger: localSection,
      x: -44,
      y: 22,
      duration: 0.82,
      start: 'top 70%'
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContinuationAnimations, { once: true });
} else {
  initContinuationAnimations();
}
