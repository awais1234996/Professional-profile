const sharedHeader = `
  <header id="header" class="header dark-background d-flex flex-column">
    <i class="header-toggle d-xl-none bi bi-list"></i>

    <div class="profile-img">
      <img src="/assets/img/my-profile-img.jpg" alt="M Awais Raza" class="img-fluid rounded-circle">
    </div>

    <a href="/" class="logo d-flex align-items-center justify-content-center">
      <h1 class="sitename">M Awais Raza</h1>
    </a>

    <div class="mb-4 text-center">
      <a href="/assets/CV.pdf" download target="_blank" id="btn-cv" class="rounded-pill p-2 fw-bold">
        <i class="bi bi-download me-2"></i>Download CV
      </a>
    </div>

    <div class="mb-5 text-center">
      <a href="https://www.linkedin.com/in/m-awais-raza-7045672a1" target="_blank" class="py-2 px-3 fw-bold rounded-pill" id="btn-cv" rel="noreferrer">
        <i class="fa-brands fa-linkedin-in"></i>
      </a>
    </div>

    <nav id="navmenu" class="navmenu">
      <ul>
        <li><a href="/#hero" class="active"><i class="bi bi-house navicon"></i>Home</a></li>
        <li><a href="/#about"><i class="bi bi-person navicon"></i> About</a></li>
        <li><a href="/#resume"><i class="bi bi-file-earmark-text navicon"></i> Resume</a></li>
        <li><a href="/#portfolio"><i class="bi bi-images navicon"></i> Portfolio</a></li>
        <li><a href="/#services"><i class="bi bi-hdd-stack navicon"></i> Services</a></li>
        <li><a href="/#contact"><i class="bi bi-envelope navicon"></i> Contact</a></li>
      </ul>
    </nav>
  </header>
`;

const sharedFooter = `
  <footer id="footer" class="footer position-relative light-background">
    <div class="container">
      <div class="copyright text-center">
        <p>&copy; <span>Copyright</span> <span>All Rights Reserved</span></p>
      </div>
    </div>
  </footer>

  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>

  <div id="preloader"></div>
`;

function pageShell(content) {
  return `${sharedHeader}<main class="main">${content}</main>${sharedFooter}`;
}

function projectDetailPage(project) {
  const visualBlock = project.images?.length
    ? `
      <div class="col-lg-8">
        <div class="portfolio-details-slider swiper init-swiper">
          <div class="swiper-wrapper align-items-center">
            ${project.images.map((image) => `<div class="swiper-slide"><img src="${image.src}" alt="${image.alt}"></div>`).join("")}
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    `
    : `
      <div class="col-lg-8">
        <div class="portfolio-placeholder detail-placeholder">
          <div>
            <span class="portfolio-placeholder-kicker">${project.role}</span>
            <h2>${project.title}</h2>
            <p>${project.summary}</p>
            <small class="portfolio-card-note">${project.note || "Project visuals are not available in this repository."}</small>
          </div>
        </div>
      </div>
    `;

  const websiteRow = project.website
    ? `<li><strong>Website</strong>: <a href="${project.website}" target="_blank" rel="noreferrer">${project.websiteLabel || project.website}</a></li>`
    : "";

  const websiteCTA = project.website
    ? `<p><a href="${project.website}" target="_blank" rel="noreferrer" class="hero-btn primary">Visit Project</a></p>`
    : "";

  const noteBlock = project.note ? `<p class="portfolio-detail-note">${project.note}</p>` : "";

  return pageShell(`
    <div class="page-title dark-background">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">Portfolio Details</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li class="current">${project.title}</li>
          </ol>
        </nav>
      </div>
    </div>

    <section id="portfolio-details" class="portfolio-details section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          ${visualBlock}
          <div class="col-lg-4">
            <div class="portfolio-info" data-aos="fade-up" data-aos-delay="200">
              <h3>Project Information</h3>
              <ul>
                <li><strong>Project</strong>: ${project.title}</li>
                <li><strong>Role</strong>: ${project.role}</li>
                <li><strong>Focus</strong>: ${project.focus}</li>
                <li><strong>Stack</strong>: ${project.stack}</li>
                ${websiteRow}
              </ul>
            </div>
          </div>
        </div>

        <div class="portfolio-description" data-aos="fade-up" data-aos-delay="300">
          <h2>${project.title}</h2>
          <p>${project.summary}</p>
          <ul>
            ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
          ${noteBlock}
          ${websiteCTA}
        </div>
      </div>
    </section>
  `);
}

const projects = [
  {
    route: "/event-management",
    title: "Event Management Platform",
    role: "Full Stack Developer",
    focus: "Events, bookings, planners, volunteers, and user participation",
    stack: "PHP, Laravel, JavaScript, MySQL, Bootstrap",
    summary: "Created an event management platform for managing events, bookings, planners, volunteers, and user participation through an interactive portal.",
    bullets: [
      "Built workflows for event creation, booking management, and participant coordination.",
      "Supported planners and volunteers with role-based dashboard features.",
      "Designed responsive pages for interactive event discovery and participation.",
      "Focused on practical admin control and smooth user flows."
    ],
    images: [
      { src: "/assets/img/portfolio/Event dashboard.png", alt: "Event dashboard" },
      { src: "/assets/img/portfolio/Event dashboard2.png", alt: "Event dashboard details" },
      { src: "/assets/img/portfolio/EVENT USER.png", alt: "Event user interface" },
      { src: "/assets/img/portfolio/evnet user2.png", alt: "Event participation view" }
    ]
  },
  {
    route: "/ecommerce-details",
    title: "E-commerce Web Application",
    role: "Full Stack Developer",
    focus: "Product browsing, categories, order processing, and secure checkout",
    stack: "PHP, Laravel, MySQL, Bootstrap, JavaScript",
    summary: "Developed an e-commerce web application with product browsing, category management, order processing, and secure checkout features.",
    bullets: [
      "Implemented category-based browsing and structured product management.",
      "Built order workflows from cart to checkout.",
      "Supported secure and reliable transaction-related user journeys.",
      "Kept the interface responsive for day-to-day business use."
    ],
    images: [
      { src: "/assets/img/portfolio/ecommerce 1.png", alt: "E-commerce home page" },
      { src: "/assets/img/portfolio/ecommerce 2.png", alt: "E-commerce product grid" },
      { src: "/assets/img/portfolio/ecommerce 3.png", alt: "E-commerce product page" },
      { src: "/assets/img/portfolio/ecommerce 4.png", alt: "E-commerce checkout flow" }
    ]
  },
  {
    route: "/news-detail",
    title: "News Management System",
    role: "PHP Developer",
    focus: "Categories, news, events, polls, media, and public portal",
    stack: "PHP, MySQL, Bootstrap, JavaScript",
    summary: "Built a news management system with an admin panel for managing categories, news, events, polls, and media, alongside a public-facing news portal.",
    bullets: [
      "Created admin tools for content publishing and site updates.",
      "Managed categories, news posts, events, polls, and media assets.",
      "Delivered a public portal for browsing news and updates.",
      "Structured the system for maintainable editorial workflows."
    ],
    images: [
      { src: "/assets/img/portfolio/new 1.png", alt: "News dashboard" },
      { src: "/assets/img/portfolio/news 2.png", alt: "News portal" },
      { src: "/assets/img/portfolio/news 3.png", alt: "News management" },
      { src: "/assets/img/portfolio/news 4.png", alt: "News details view" }
    ]
  },
  {
    route: "/library-management",
    title: "Library Management System",
    role: "Laravel Developer",
    focus: "Books, users, borrowing records, tracking, and administration",
    stack: "Laravel, PHP, MySQL, Bootstrap",
    summary: "Developed a Laravel-based library system for managing books, users, and borrowing records with efficient tracking and administration features.",
    bullets: [
      "Managed book catalog, user records, and borrowing activity.",
      "Supported issue and return workflows with administrative tracking.",
      "Built database-driven screens for daily operations.",
      "Designed a responsive interface for library staff usage."
    ],
    images: [
      { src: "/assets/img/portfolio/lms 1.png", alt: "Library dashboard" },
      { src: "/assets/img/portfolio/lms 2.png", alt: "Library books section" },
      { src: "/assets/img/portfolio/lms 3.png", alt: "Library records section" }
    ]
  },
  {
    route: "/chatapp-details",
    title: "ChatApp",
    role: "Full Stack Developer",
    focus: "Instant messaging and live communication between users",
    stack: "Laravel, Reverb, PHP, JavaScript",
    summary: "Built a real-time chat application using Laravel and Reverb to support instant messaging and live communication between users.",
    bullets: [
      "Implemented real-time messaging for direct user-to-user conversations.",
      "Used Laravel Reverb to power live updates and fast message delivery.",
      "Designed conversation flows for clear, reliable communication.",
      "Focused on responsiveness and a simple messaging experience."
    ],
    note: "No local screenshots for ChatApp were found in this repository."
  },
  {
    route: "/smartkarigar-details",
    title: "Home Services Booking Platform",
    role: "Full Stack Developer",
    focus: "Service listing, booking management, and user-provider communication",
    stack: "Laravel, React JS, PHP, MySQL",
    summary: "Developed a home services booking platform using Laravel and React JS that allows users to hire professionals such as electricians, plumbers, and technicians through web and mobile-friendly interfaces.",
    bullets: [
      "Built service discovery, booking management, and hiring workflows.",
      "Supported communication between customers and service providers.",
      "Covered skilled categories such as electricians, plumbers, and technicians.",
      "Delivered a practical booking experience across web and mobile-oriented interfaces."
    ],
    website: "https://smartkarigar.com/",
    websiteLabel: "smartkarigar.com",
    note: "The live project is available, but local screenshots were not found in this repository."
  }
];

const homePage = pageShell(`
  <section id="hero" class="hero section dark-background professional-hero">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <span class="hero-kicker">Full Stack Developer</span>
      <h2>M Awais Raza</h2>
      <p class="hero-role">I design and build modern digital products with <span class="typed" data-typed-items="PHP and Laravel,Node.js and Express.js,React JS,RESTful APIs,Laravel AI SDK"></span></p>
      <p class="hero-summary">I am a Full Stack Developer focused on building scalable, secure, and thoughtfully engineered web applications. My work brings together Laravel, Node.js, React JS, RESTful APIs, and AI-powered features to create business products that feel reliable, modern, and built to grow.</p>
      <div class="hero-actions">
        <a href="#portfolio" class="hero-btn primary">View Work</a>
        <a href="#contact" class="hero-btn secondary">Contact Me</a>
      </div>
      <div class="hero-highlights" aria-label="Professional highlights">
        <span>Laravel</span>
        <span>React JS</span>
        <span>Node.js</span>
        <span>REST APIs</span>
        <span>Docker</span>
      </div>
    </div>
  </section>

  <section id="about" class="about section">
    <div class="container section-title" data-aos="fade-up">
      <h2>About</h2>
      <p>I am a Full Stack Developer with a strong foundation in PHP, Laravel, Node.js, Express.js, React JS, MySQL, MongoDB, and Laravel AI SDK. I build web applications that balance performance, clean architecture, maintainable code, and polished user experience across business platforms, ERP systems, and modern SaaS-style products.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 justify-content-center">
        <div class="col-lg-12 content about-content-no-image">
          <h2>Building dependable products for business, operations, and digital growth</h2>
          <p class="fst-italic py-3">
            My experience spans ERP systems, dashboards, e-commerce platforms, news portals, event management systems, library solutions, real-time chat applications, and service booking products. I enjoy shaping backend systems and responsive interfaces that are practical for teams, intuitive for users, and strong enough to support long-term product growth.
          </p>
          <div class="row">
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>0303-7932504 | 0310-7434370</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>City:</strong> <span>Faisalabad, Pakistan</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>LinkedIn:</strong> <span><a href="https://www.linkedin.com/in/m-awais-raza-7045672a1" target="_blank" rel="noreferrer">linkedin.com/in/m-awais-raza-7045672a1</a></span></li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li><i class="bi bi-chevron-right"></i> <strong>Focus:</strong> <span>Laravel Applications, ERP Workflows, SaaS Products, and API-driven Systems</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong> <span>awaisraza030379@gmail.com</span></li>
                <li><i class="bi bi-chevron-right"></i> <strong>Languages:</strong> <span>Urdu, English</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="skills" class="skills section light-background">
    <div class="container section-title" data-aos="fade-up">
      <h2>Skills</h2>
      <p>Core technologies from my CV include PHP, Laravel, Node.js, Express.js, MySQL, MongoDB, JavaScript, React JS, Bootstrap, Tailwind CSS, RESTful APIs, WordPress, Git, GitHub, CI/CD pipelines, Docker, and Laravel AI SDK.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row skills-content skills-animation">
        <div class="col-lg-6">
          <div class="progress">
            <span class="skill"><span>PHP and Laravel</span> <i class="val">90%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>JavaScript</span> <i class="val">85%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>React JS</span> <i class="val">80%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>Node.js and Express.js</span> <i class="val">78%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>RESTful APIs</span> <i class="val">82%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="progress">
            <span class="skill"><span>MySQL and MongoDB</span> <i class="val">82%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>Bootstrap and Tailwind CSS</span> <i class="val">88%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>Laravel AI SDK</span> <i class="val">75%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>Git, GitHub and CI/CD</span> <i class="val">80%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
          <div class="progress">
            <span class="skill"><span>Docker and Deployment Workflows</span> <i class="val">72%</i></span>
            <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="resume" class="resume section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Resume</h2>
      <p>Full Stack Developer with professional experience across Laravel applications, ERP systems, responsive frontends, RESTful APIs, AI-powered features, and SaaS-oriented business platforms.</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <h3 class="resume-title">Summary</h3>
          <div class="resume-item pb-0">
            <h4>M Awais Raza</h4>
            <p><em>Experienced PHP and Laravel developer with strong expertise in building scalable and secure web applications using PHP and Laravel, Node.js, and Express.js, supported by frontend experience in JavaScript, React JS, CSS, Bootstrap, and Tailwind CSS, with a focus on performance, clean architecture, and maintainable code.</em></p>
            <ul>
              <li>Faisalabad, Pakistan</li>
              <li>0303-7932504 | 0310-7434370</li>
              <li>awaisraza030379@gmail.com</li>
            </ul>
          </div>

          <h3 class="resume-title">Education</h3>
          <div class="resume-item">
            <h4>BSc Electrical Engineering and Technology</h4>
            <h5>Oct 2019 - Jun 2023</h5>
            <p><em>Govt. College of Technology Samanabad, Faisalabad, affiliated by UET Lahore</em></p>
          </div>

          <h3 class="resume-title">Certificate</h3>
          <div class="resume-item">
            <h4>Web Development</h4>
            <h5>May 2024</h5>
            <p><em>M Salman</em></p>
            <p>Learned core web development concepts including HTML, CSS, JavaScript, responsive design, and frontend fundamentals for building simple and interactive websites.</p>
          </div>
        </div>

        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <h3 class="resume-title">Professional Experience</h3>
          <div class="resume-item">
            <h4>Laravel Developer</h4>
            <h5>Feb 2025 - Present</h5>
            <p><em>Optimum Tech, Faisalabad</em></p>
            <ul>
              <li>Support the Wapda City ERP system and mobile app dashboard workflows.</li>
              <li>Developed the Apollo ERP System for business-focused operations.</li>
              <li>Contribute to dashboard features, business processes, and maintainable Laravel architecture.</li>
            </ul>
          </div>
          <div class="resume-item">
            <h4>PHP Laravel Developer</h4>
            <h5>May 2024 - Jan 2025</h5>
            <p><em>WAPEXP Institute of Information Technology</em></p>
            <ul>
              <li>Built dynamic Laravel applications with responsive interfaces and database-backed features.</li>
              <li>Delivered end-to-end features, improvements, and day-to-day project support.</li>
            </ul>
          </div>

          <h3 class="resume-title">Achievements and Interests</h3>
          <div class="resume-item">
            <h4>Achievements</h4>
            <ul>
              <li>PHP and Laravel framework proficiency.</li>
              <li>Responsive design and dynamic website development.</li>
              <li>Practical delivery experience across ERP systems, portals, dashboards, and service platforms.</li>
            </ul>
          </div>
          <div class="resume-item">
            <h4>Languages and Interests</h4>
            <ul>
              <li>Urdu - Full Professional Proficiency</li>
              <li>English - Limited Working Proficiency</li>
              <li>Interests: Cricket, Traveling, Coding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="portfolio" class="portfolio section light-background">
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Selected projects from my CV, spanning ERP-oriented product work, commerce, publishing, event operations, library systems, real-time communication, and home services booking.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="portfolio-lead-card">
        <div>
          <span class="portfolio-lead-kicker">Selected Work</span>
          <h3>Applications built around real business workflows</h3>
          <p>My work covers admin-heavy systems, customer-facing products, and practical full stack delivery using Laravel, React JS, Node.js, and API-driven architecture.</p>
        </div>
        <div class="portfolio-lead-stats">
          <span><strong>6+</strong> Featured projects</span>
          <span><strong>2</strong> ERP-focused roles</span>
          <span><strong>Laravel</strong> Core platform</span>
        </div>
      </div>

      <div class="project-summary-grid">
        <div class="project-summary-item"><h4>Apollo ERP and Wapda City Work</h4><p>Laravel-based business systems, dashboards, and workflow-focused development.</p></div>
        <div class="project-summary-item"><h4>E-commerce</h4><p>Catalog browsing, product organization, orders, and checkout flows.</p></div>
        <div class="project-summary-item"><h4>News Management</h4><p>Admin publishing tools with a public-facing content portal.</p></div>
        <div class="project-summary-item"><h4>Event Management</h4><p>Bookings, planners, volunteers, and user participation management.</p></div>
        <div class="project-summary-item"><h4>Library Management</h4><p>Borrowing records, catalog administration, and operational tracking.</p></div>
        <div class="project-summary-item"><h4>ChatApp and SmartKarigar</h4><p>Real-time messaging and services booking product experiences.</p></div>
      </div>
    </div>

    <div class="container">
      <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
        <div class="filter-slider" data-aos="fade-up" data-aos-delay="100">
          <ul class="portfolio-filters isotope-filters slide-tabs">
            <li data-filter="*" class="filter-active">All</li>
            <li data-filter=".filter-event">Event Management</li>
            <li data-filter=".filter-commerce">E-commerce</li>
            <li data-filter=".filter-news">News Management</li>
            <li data-filter=".filter-library">Library System</li>
            <li data-filter=".filter-realtime">Real-time and Services</li>
          </ul>
        </div>

        <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-event">
            <div class="portfolio-content h-100">
              <img src="/assets/img/portfolio/Event dashboard.png" class="img-fluid" alt="Event management platform">
              <div class="portfolio-info">
                <h4>Event Management Platform</h4>
                <p>Bookings, planners, volunteers</p>
                <a href="/assets/img/portfolio/Event dashboard.png" data-gallery="portfolio-gallery-event" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                <a href="/event-management" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-commerce">
            <div class="portfolio-content h-100">
              <img src="/assets/img/portfolio/ecommerce 1.png" class="img-fluid" alt="E-commerce application">
              <div class="portfolio-info">
                <h4>E-commerce Web Application</h4>
                <p>Catalog, orders, checkout</p>
                <a href="/assets/img/portfolio/ecommerce 1.png" data-gallery="portfolio-gallery-commerce" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                <a href="/ecommerce-details" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-news">
            <div class="portfolio-content h-100">
              <img src="/assets/img/portfolio/new 1.png" class="img-fluid" alt="News management system">
              <div class="portfolio-info">
                <h4>News Management System</h4>
                <p>Publishing, media, public portal</p>
                <a href="/assets/img/portfolio/new 1.png" data-gallery="portfolio-gallery-news" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                <a href="/news-detail" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-library">
            <div class="portfolio-content h-100">
              <img src="/assets/img/portfolio/lms 1.png" class="img-fluid" alt="Library management system">
              <div class="portfolio-info">
                <h4>Library Management System</h4>
                <p>Books, borrowing, administration</p>
                <a href="/assets/img/portfolio/lms 1.png" data-gallery="portfolio-gallery-library" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                <a href="/library-management" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-realtime">
            <div class="portfolio-content portfolio-text-card h-100">
              <div class="portfolio-text-card-body">
                <span class="portfolio-text-tag">Laravel Reverb</span>
                <h4>ChatApp</h4>
                <p>Real-time messaging experience built for instant user communication and live conversations.</p>
                <span class="portfolio-card-note">No local screenshots found in this repo yet.</span>
                <a href="/chatapp-details" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 portfolio-item isotope-item filter-realtime">
            <div class="portfolio-content portfolio-text-card h-100">
              <div class="portfolio-text-card-body">
                <span class="portfolio-text-tag">Laravel and React JS</span>
                <h4>Home Services Booking Platform</h4>
                <p>Users can hire electricians, plumbers, and technicians through service discovery, booking, and communication flows.</p>
                <div class="portfolio-text-actions">
                  <a href="https://smartkarigar.com/" target="_blank" rel="noreferrer" class="portfolio-inline-link">Visit Live Site</a>
                  <span class="portfolio-card-note">Live project available, local screenshots missing.</span>
                </div>
                <a href="/smartkarigar-details" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="services section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>I help businesses build reliable web products, SaaS-style platforms, admin systems, APIs, and responsive interfaces using the same stack highlighted in my CV.</p>
    </div>

    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi bi-code-slash"></i></div>
            <h3>Laravel Development</h3>
            <p>Secure backend systems, dashboards, ERP modules, admin panels, and application architecture built for long-term maintainability.</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi bi-window"></i></div>
            <h3>Frontend Interfaces</h3>
            <p>Responsive interfaces with React JS, Bootstrap, Tailwind CSS, and user-friendly interaction flows for modern products.</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
          <div class="service-item position-relative">
            <div class="icon"><i class="bi bi-diagram-3"></i></div>
            <h3>REST APIs and Integrations</h3>
            <p>Structured backend services, integrations, and maintainable API layers that support modern web applications.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact section professional-contact">
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Available for Laravel, full stack, ERP, SaaS, dashboard, and product development opportunities.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="contact-shell">
        <div class="contact-simple-card">
          <div class="contact-simple-content">
            <span class="contact-kicker">Open to opportunities</span>
            <h3>Available for product, dashboard, and Laravel application work</h3>
            <p>I can contribute to Laravel products, React-based interfaces, REST APIs, and business systems that need dependable engineering support and practical delivery.</p>
            <div class="contact-simple-details">
              <div class="contact-line">
                <i class="bi bi-envelope"></i>
                <span><strong>Email</strong><small>awaisraza030379@gmail.com</small></span>
              </div>
              <div class="contact-line">
                <i class="bi bi-telephone"></i>
                <span><strong>Phone</strong><small>0303-7932504 | 0310-7434370</small></span>
              </div>
              <div class="contact-line">
                <i class="bi bi-geo-alt"></i>
                <span><strong>Location</strong><small>Faisalabad, Pakistan</small></span>
              </div>
            </div>
            <a href="tel:03037932504" class="call-button">Call Now</a>
          </div>
        </div>
        <div class="contact-form-card">
          <form class="react-contact-form php-email-form" data-endpoint="https://formsubmit.co/ajax/awaisraza030379@gmail.com">
            <input type="hidden" name="_subject" value="New portfolio contact message from M Awais Raza website">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_replyto" value="">
            <div class="row gy-3">
              <div class="col-md-6">
                <input type="text" name="name" class="form-control" placeholder="Your Name" required>
              </div>
              <div class="col-md-6">
                <input type="email" class="form-control" name="email" placeholder="Your Email" required>
              </div>
              <div class="col-md-12">
                <input type="text" class="form-control" name="subject" placeholder="Subject" required>
              </div>
              <div class="col-md-12">
                <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
              </div>
              <div class="col-md-12 text-center">
                <div class="loading">Sending message...</div>
                <div class="error-message">Message could not be sent.</div>
                <div class="sent-message">Your message has been sent. Thank you.</div>
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
`);

const serviceDetailsPage = pageShell(`
  <div class="page-title dark-background">
    <div class="container d-lg-flex justify-content-between align-items-center">
      <h1 class="mb-2 mb-lg-0">Service Details</h1>
      <nav class="breadcrumbs">
        <ol>
          <li><a href="/">Home</a></li>
          <li class="current">Service Details</li>
        </ol>
      </nav>
    </div>
  </div>

  <section id="service-details" class="service-details section">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="services-list">
            <a href="#" class="active">Laravel Development</a>
            <a href="#">React Interfaces</a>
            <a href="#">REST APIs</a>
            <a href="#">ERP Modules</a>
            <a href="#">Deployment Support</a>
          </div>

          <h4>Business-focused web application development</h4>
          <p>I work on backend systems, dashboards, portals, and user-facing products with practical architecture and maintainable delivery.</p>
        </div>

        <div class="col-lg-8" data-aos="fade-up" data-aos-delay="200">
          <img src="/assets/img/services.jpg" alt="Development services" class="img-fluid services-img">
          <h3>Laravel, full stack, and product engineering support</h3>
          <p>I help build applications that combine solid backend structure with responsive interfaces and day-to-day usability. My recent work includes ERP platforms, portals, service booking products, and communication features.</p>
          <ul>
            <li><i class="bi bi-check-circle"></i> <span>Custom Laravel applications and admin systems.</span></li>
            <li><i class="bi bi-check-circle"></i> <span>React-based frontend experiences and dashboard UI.</span></li>
            <li><i class="bi bi-check-circle"></i> <span>REST APIs, database design, and maintainable deployment workflows.</span></li>
          </ul>
          <p>I aim for clean implementation, practical feature scope, and products that teams can keep extending without fighting the codebase.</p>
        </div>
      </div>
    </div>
  </section>
`);

const starterPage = pageShell(`
  <div class="page-title dark-background">
    <div class="container d-lg-flex justify-content-between align-items-center">
      <h1 class="mb-2 mb-lg-0">Starter Page</h1>
      <nav class="breadcrumbs">
        <ol>
          <li><a href="/">Home</a></li>
          <li class="current">Starter Page</li>
        </ol>
      </nav>
    </div>
  </div>

  <section id="starter-section" class="starter-section section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Starter Section</h2>
      <p>This page is kept as a simple placeholder for future custom content.</p>
    </div>

    <div class="container" data-aos="fade-up">
      <p>Use this route for any additional section or custom page you want to add later.</p>
    </div>
  </section>
`);

export const pages = [
  {
    route: "/",
    bodyClass: "index-page",
    html: homePage
  },
  ...projects.map((project) => ({
    route: project.route,
    bodyClass: "index-page",
    html: projectDetailPage(project)
  })),
  {
    route: "/service-details",
    bodyClass: "index-page",
    html: serviceDetailsPage
  },
  {
    route: "/starter-page",
    bodyClass: "index-page",
    html: starterPage
  }
];
