import { useEffect, useMemo, useState } from 'react';
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

  function handleContactSubmit(event) {
    event.preventDefault();
    contactForm?.querySelector('.sent-message')?.classList.add('d-block');
    contactForm?.reset();
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
