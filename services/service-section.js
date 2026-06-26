document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.mwf-services-v02');

  if (!section || section.dataset.servicesReady === 'true') {
    return;
  }

  section.dataset.servicesReady = 'true';

  const deck = section.querySelector('.mwf-services-v02__deck');
  const cards = Array.from(section.querySelectorAll('[data-service-card]'));
  const introItems = [
    section.querySelector('.mwf-services-v02__eyebrow'),
    section.querySelector('.mwf-services-v02__title'),
    section.querySelector('.mwf-services-v02__lede'),
    section.querySelector('.mwf-services-v02__manifesto')
  ].filter(Boolean);

  if (!deck || !cards.length) {
    return;
  }

  const setStaticFlow = () => {
    deck.style.minHeight = 'auto';

    cards.forEach((card, index) => {
      card.removeAttribute('style');
      card.style.position = 'relative';
      card.style.width = '100%';
      card.style.minHeight = 'auto';
      card.style.marginTop = index === 0 ? '0' : '16px';
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.filter = 'none';
      card.style.pointerEvents = 'auto';
      card.style.zIndex = 'auto';
    });
  };

  if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setStaticFlow();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const desktopConfig = {
    width: '64%',
    xPercent: 18,
    hiddenY: 248,
    backY: 14,
    backScale: 0.76,
    backRotation: 4,
    backOpacity: 0.18,
    backBlur: 9
  };
  const desktopStepScroll = () => window.innerHeight * 0.4;
  const getHeaderOffset = () => {
    const header = document.querySelector('.mwf-header-shell');
    return Math.round((header?.getBoundingClientRect().height || 120) + 16);
  };
  const syncHeaderOffset = () => {
    const headerOffset = getHeaderOffset();
    section.style.setProperty('--services-header-offset', `${headerOffset}px`);
    section.style.scrollMarginTop = `${headerOffset + 16}px`;
    return headerOffset;
  };

  const getTallestCard = () => cards.reduce((height, card) => (
    Math.max(height, card.offsetHeight || 0)
  ), 0);

  const clearCardStyles = () => {
    cards.forEach((card) => {
      card.removeAttribute('style');
    });
  };

  const applyDesktopState = (card, state) => {
    gsap.set(card, {
      width: desktopConfig.width,
      xPercent: desktopConfig.xPercent,
      yPercent: state.yPercent,
      scale: state.scale,
      rotation: state.rotation,
      rotationX: 0,
      opacity: state.opacity,
      filter: `blur(${state.blur}px)`,
      zIndex: state.zIndex,
      pointerEvents: state.pointerEvents,
      transformOrigin: 'top center',
      force3D: true
    });
  };

  const getActiveState = (zIndex) => ({
    yPercent: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    blur: 0,
    zIndex,
    pointerEvents: 'auto'
  });

  const getHiddenState = (zIndex) => ({
    yPercent: desktopConfig.hiddenY,
    scale: 1,
    rotation: 0,
    opacity: 0,
    blur: 0,
    zIndex,
    pointerEvents: 'none'
  });

  const getBackState = (zIndex) => ({
    yPercent: desktopConfig.backY,
    scale: desktopConfig.backScale,
    rotation: desktopConfig.backRotation,
    opacity: desktopConfig.backOpacity,
    blur: desktopConfig.backBlur,
    zIndex,
    pointerEvents: 'none'
  });

  const resetDesktopStackState = () => {
    syncHeaderOffset();
    deck.style.minHeight = `${Math.max(700, getTallestCard() + 36)}px`;

    cards.forEach((card, index) => {
      applyDesktopState(
        card,
        index === 0
          ? getActiveState(cards.length + 2)
          : getHiddenState(cards.length - index)
      );
    });
  };

  const setupDesktopStack = () => {
    clearCardStyles();
    resetDesktopStackState();

    gsap.set(deck, {
      perspective: 1400,
      transformStyle: 'preserve-3d'
    });

    const introTween = gsap.fromTo(
      introItems,
      { x: -18, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.58,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%'
        }
      }
    );

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'none'
      },
      scrollTrigger: {
        trigger: section,
        start: () => {
          syncHeaderOffset();
          return 'top top';
        },
        end: `+=${Math.max(1, cards.length - 1) * desktopStepScroll()}`,
        pin: section,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: resetDesktopStackState
      }
    });

    for (let index = 0; index < cards.length - 1; index += 1) {
      const currentCard = cards[index];
      const nextCard = cards[index + 1];
      const label = `card-step-${index}`;

      timeline.add(label);
      timeline.to(currentCard, {
        ...getBackState(cards.length - index),
        filter: `blur(${desktopConfig.backBlur}px)`,
        duration: 0.92
      }, label);
      timeline.to(nextCard, {
        yPercent: 0,
        scale: 1,
        rotation: 0,
        zIndex: cards.length + 2,
        pointerEvents: 'auto',
        filter: 'blur(0px)',
        duration: 0.8
      }, `${label}+=0.3`);
      timeline.to(nextCard, {
        opacity: 1,
        duration: 0.24
      }, `${label}+=0.3`);

      for (let hiddenIndex = index + 2; hiddenIndex < cards.length; hiddenIndex += 1) {
        timeline.to(cards[hiddenIndex], {
          ...getHiddenState(cards.length - hiddenIndex),
          filter: 'blur(0px)'
        }, label);
      }
    }

    return () => {
      introTween.scrollTrigger?.kill();
      introTween.kill();
      timeline.scrollTrigger?.kill();
      timeline.kill();
      clearCardStyles();
      deck.style.minHeight = '';
      gsap.set(deck, { clearProps: 'perspective,transformStyle' });
    };
  };

  const setupMobileFlow = () => {
    setStaticFlow();

    const introTween = gsap.fromTo(
      introItems,
      { x: -12, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.44,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%'
        }
      }
    );

    return () => {
      introTween.scrollTrigger?.kill();
      introTween.kill();
      clearCardStyles();
      deck.style.minHeight = '';
    };
  };

  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => setupDesktopStack());
  mm.add('(max-width: 860px)', () => setupMobileFlow());

  window.requestAnimationFrame(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
});
