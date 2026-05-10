const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = process.cwd();
const pages = [
  ['/', 'index.html'],
  ['/portfolio-details', 'portfolio-details.html'],
  ['/ecommerce-details', 'ecommerce_details.html'],
  ['/library-detail', 'library_detail.html'],
  ['/news-detail', 'news_detail.html'],
  ['/service-details', 'service-details.html'],
  ['/starter-page', 'starter-page.html'],
];

const routeMap = new Map([
  ['index.html', '/'],
  ['portfolio-details.html', '/portfolio-details'],
  ['ecommerce_details.html', '/ecommerce-details'],
  ['library_detail.html', '/library-detail'],
  ['news_detail.html', '/news-detail'],
  ['service-details.html', '/service-details'],
  ['starter-page.html', '/starter-page'],
]);

function extractBody(html) {
  const bodyClass = html.match(/<body[^>]*class="([^"]*)"/i)?.[1] || 'index-page';
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
  return { bodyClass, body };
}

function transform(html) {
  let output = html;
  output = output.replace(/<script[\s\S]*?<\/script>/gi, '');
  output = output.replace(/<!--\s*Vendor JS Files\s*-->/gi, '');
  output = output.replace(/<!--\s*Main JS File\s*-->/gi, '');
  output = output.replace(/<!--\s*Contact Form Messages\s*-->/gi, '');
  output = output.replace(/href="\.\/assets\//g, 'href="/assets/');
  output = output.replace(/href="assets\//g, 'href="/assets/');
  output = output.replace(/src="assets\//g, 'src="/assets/');
  output = output.replace(/href="#/g, 'href="/#');
  output = output.replace(/href="\/#"/g, 'href="#"');
  for (const [file, route] of routeMap) {
    output = output.replaceAll(`href="${file}"`, `href="${route}"`);
  }
  output = output.replaceAll('php-email-form', 'react-contact-form');
  output = output.replace(/<form\s+action="forms\/contact\.php"\s+method="post"\s+class="react-contact-form">/i, '<form class="react-contact-form">');
  output = output.replace(/<form\s+class="react-contact-form"\s+action="forms\/contact\.php"\s+method="post">/i, '<form class="react-contact-form">');
  output = output.replace(/<div class="loading">Loading<\/div>/gi, '');
  output = output.replace(/<div class="error-message"><\/div>/gi, '');
  output = output.replace(
    /<div class="sent-message">[\s\S]*?<\/div>/i,
    '<div class="sent-message">Thank you. Please use the email or phone details above to contact me directly.</div>'
  );
  return output.trim();
}

const generatedPages = pages.map(([route, file]) => {
  const raw = file === 'index.html'
    ? execFileSync('git', ['show', 'HEAD:index.html'], { cwd: root, encoding: 'utf8' })
    : fs.readFileSync(path.join(root, file), 'utf8');
  const { bodyClass, body } = extractBody(raw);
  return { route, bodyClass, html: transform(body) };
});

const pagesModule = `export const pages = ${JSON.stringify(generatedPages, null, 2)};\n`;

fs.mkdirSync(path.join(root, 'src'), { recursive: true });
fs.writeFileSync(path.join(root, 'src', 'pages.js'), pagesModule);

const app = `import { useEffect, useMemo, useState } from 'react';
import { pages } from './pages';

const pageByPath = new Map(pages.map((page) => [page.route, page]));

function normalizePath(pathname) {
  if (pathname === '/' || pathname === '') return '/';
  return pathname.replace(/\\/$/, '');
}

function getCurrentPath() {
  return normalizePath(window.location.pathname);
}

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
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
    bar.style.width = \`\${bar.getAttribute('aria-valuenow') || 0}%\`;
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
        setTimeout(() => document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' }), 0);
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
`;

fs.writeFileSync(path.join(root, 'src', 'App.jsx'), app);

const main = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;

fs.writeFileSync(path.join(root, 'src', 'main.jsx'), main);
