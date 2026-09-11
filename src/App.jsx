import React, { useEffect, useMemo, useState } from 'react';
import { pages } from './pages';

const pageByPath = new Map(pages.map((page) => [page.route, page]));

function normalizePath(pathname) {
  if (pathname === '/' || pathname === '') return '/';
  return pathname.replace(/\/$/, '');
}

function getCurrentPath() {
  return normalizePath(window.location.pathname);
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}

function initPageInteractions() {
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');
  const scrollTop = document.querySelector('.scroll-top');
  const contactForm = document.querySelector('.react-contact-form');
  const preloader = document.querySelector('#preloader');

  preloader?.remove();

  function headerToggle() {
    if (!header || !headerToggleBtn) return;
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  function handleHeaderToggle() {
    headerToggle();
  }

  function handleNavClick() {
    if (header?.classList.contains('header-show')) {
      headerToggle();
    }
  }

  function toggleScrollTop() {
    if (!scrollTop) return;
    scrollTop.classList.toggle('active', window.scrollY > 100);
  }

  function handleScrollTopClick(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    const sentMessage = contactForm?.querySelector('.sent-message');
    const errorMessage = contactForm?.querySelector('.error-message');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    const endpoint = contactForm?.getAttribute('data-endpoint');

    sentMessage?.classList.add('d-none');
    errorMessage?.classList.add('d-none');

    if (!contactForm || !endpoint) {
      if (errorMessage) {
        errorMessage.textContent = 'Contact form is not configured correctly.';
        errorMessage.classList.remove('d-none');
      }
      return;
    }

    if (submitButton) {
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
    }

    try {
      const formData = new FormData(contactForm);
      const senderEmail = contactForm.querySelector('input[name="email"]')?.value?.trim();
      if (senderEmail) {
        formData.set('_replyto', senderEmail);
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      contactForm.reset();
      errorMessage?.classList.add('d-none');
      sentMessage?.classList.remove('d-none');

      if (submitButton) {
        submitButton.innerHTML = '<i class="bi bi-check2 me-2"></i> Sent!';
      }

      setTimeout(() => {
        sentMessage?.classList.add('d-none');
        if (submitButton) {
          submitButton.removeAttribute('disabled');
          submitButton.innerHTML = '<span>Send Message</span> <i class="bi bi-send-fill ms-2"></i>';
        }
      }, 3000);
    } catch (error) {
      sentMessage?.classList.add('d-none');
      if (errorMessage) {
        errorMessage.textContent = 'Message could not be sent right now. Please try again or email me directly at awaisraza030379@gmail.com.';
        errorMessage.classList.remove('d-none');
      }
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        submitButton.innerHTML = '<span>Send Message</span> <i class="bi bi-send-fill ms-2"></i>';
      }
      console.error(error);
    }
  }

  headerToggleBtn?.addEventListener('click', handleHeaderToggle);
  document.querySelectorAll('#navmenu a').forEach((link) => {
    link.addEventListener('click', handleNavClick);
  });
  scrollTop?.addEventListener('click', handleScrollTopClick);
  document.addEventListener('scroll', toggleScrollTop);
  contactForm?.addEventListener('submit', handleContactSubmit);
  toggleScrollTop();

  if (window.AOS) {
    window.AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }

  if (window.Typed && document.querySelector('.typed')) {
    const typedElement = document.querySelector('.typed');
    const strings = typedElement.getAttribute('data-typed-items')?.split(',') || [];
    const typed = new window.Typed('.typed', {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
    typedElement.__typed = typed;
  }

  if (window.PureCounter) {
    new window.PureCounter();
  }

  document.querySelectorAll('.skills-animation .progress .progress-bar').forEach((bar) => {
    bar.style.width = `${bar.getAttribute('aria-valuenow') || 0}%`;
  });

  if (window.GLightbox) {
    window.__glightbox = window.GLightbox({ selector: '.glightbox' });
  }

  const v1 = document.querySelector('.hero-video-1');
  const v2 = document.querySelector('.hero-video-2');
  let onV1Ended = null;
  let onV2Ended = null;

  if (v1 && v2) {
    v1.classList.add('is-active');
    v2.classList.remove('is-active');
    v1.play().catch(() => {});
    v2.load();

    onV1Ended = () => {
      v2.currentTime = 0;
      v2.play().then(() => {
        v2.classList.add('is-active');
        v1.classList.remove('is-active');
      }).catch(() => {
        v2.classList.add('is-active');
        v1.classList.remove('is-active');
      });
    };

    onV2Ended = () => {
      v1.currentTime = 0;
      v1.play().then(() => {
        v1.classList.add('is-active');
        v2.classList.remove('is-active');
      }).catch(() => {
        v1.classList.add('is-active');
        v2.classList.remove('is-active');
      });
    };

    v1.addEventListener('ended', onV1Ended);
    v2.addEventListener('ended', onV2Ended);

    const ensureVideoPlaying = () => {
      if (v1 && v1.classList.contains('is-active') && v1.paused) {
        v1.play().catch(() => {});
      } else if (v2 && v2.classList.contains('is-active') && v2.paused) {
        v2.play().catch(() => {});
      }
    };
    window.addEventListener('touchstart', ensureVideoPlaying, { once: true, passive: true });
    window.addEventListener('scroll', ensureVideoPlaying, { once: true, passive: true });
  } else if (v1) {
    v1.classList.add('is-active');
    v1.setAttribute('loop', 'loop');
    v1.play().catch(() => {});
  }

  document.querySelectorAll('.portfolio-filters li').forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      const filter = filterButton.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-filters li').forEach((button) => {
        button.classList.toggle('filter-active', button === filterButton);
      });
      document.querySelectorAll('.isotope-item').forEach((item) => {
        item.style.display = filter === '*' || item.matches(filter) ? '' : 'none';
      });
    });
  });

  return () => {
    if (v1 && onV1Ended) v1.removeEventListener('ended', onV1Ended);
    if (v2 && onV2Ended) v2.removeEventListener('ended', onV2Ended);
    headerToggleBtn?.removeEventListener('click', handleHeaderToggle);
    document.querySelectorAll('#navmenu a').forEach((link) => {
      link.removeEventListener('click', handleNavClick);
    });
    scrollTop?.removeEventListener('click', handleScrollTopClick);
    document.removeEventListener('scroll', toggleScrollTop);
    contactForm?.removeEventListener('submit', handleContactSubmit);
    document.querySelector('.typed')?.__typed?.destroy?.();
    window.__glightbox?.destroy?.();
  };
}

export default function App() {
  const [path, setPath] = useState(getCurrentPath);
  const page = useMemo(() => pageByPath.get(path) || pageByPath.get('/'), [path]);

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath());
    const handleDocumentClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || anchor.hasAttribute('download')) {
        return;
      }
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      navigate(url.pathname + url.hash);
      if (url.hash) {
        setTimeout(() => {
          try {
            document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
          } catch {
            window.scrollTo({ top: 0 });
          }
        }, 0);
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    document.body.className = page.bodyClass;
    return initPageInteractions();
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: page.html }} />;
}
