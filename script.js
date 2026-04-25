/* ============================================================
   IMTHIYAZ PORTFOLIO — script.js
   ============================================================ */

/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Dot follows mouse instantly
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  // Ring follows with lag
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Grow ring on hoverable elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-tag, .cert-badge');

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(124,109,250,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(124,109,250,0.5)';
  });
});


/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ─────────────────────────────────────────
   PROJECT DATA
   → Add your GitHub URLs in the `github` field below!
───────────────────────────────────────── */
const projects = {
  jobportal: {
    number: '01 / 04',
    title: 'Full Stack Job Portal',
    desc: 'A complete job marketplace built with the MERN stack and MySQL. Features JWT-based authentication, role-based access control for admin and regular users, and full CRUD operations for job listings. Deployed live on Vercel (frontend) and Render (backend).',
    features: [
      'JWT authentication with protected routes and session management',
      'Role-based access control — Admin dashboard + User job applications',
      'CRUD operations for job listings with real-time updates',
      'RESTful Node.js/Express.js backend with MySQL database',
      'Production deployment on Vercel + Render',
    ],
    tech: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'REST APIs', 'Vercel', 'Render', 'HTML5/CSS3'],
    github: '', // ← ADD YOUR GITHUB LINK HERE
  },

  resumebuilder: {
    number: '02 / 04',
    title: 'Resume Builder Web App',
    desc: 'A feature-rich resume builder with live preview. Users fill in sections and see their resume update in real time through DOM manipulation. Includes PDF export functionality and is fully responsive across all screen sizes.',
    features: [
      'Real-time DOM rendering — see changes as you type',
      'Live preview panel with instant visual feedback',
      'PDF export for download and printing',
      'Fully responsive across mobile, tablet, and desktop',
      'Architected for RESTful Node.js backend integration',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Node.js', 'DOM API', 'PDF Export'],
    github: 'https://imthiyaz-asm.github.io/resume-builder/', // ← ADD YOUR GITHUB LINK HERE
  },

  elearning: {
    number: '03 / 04',
    title: 'E-Learning Platform',
    desc: 'A modular e-learning frontend built with React.js and Tailwind CSS. Features reusable component architecture for scalability, course listing pages, and contact flows — designed mobile-first for consistent accessibility across all devices.',
    features: [
      'Modular React.js component architecture for scalability',
      'Course listings with filtering and navigation',
      'Contact and enrollment flow components',
      'Mobile-first Tailwind CSS design system',
      'WCAG accessibility standards compliance',
    ],
    tech: ['React.js', 'Tailwind CSS', 'Component Architecture', 'Responsive Design', 'JSX'],
    github: ' https://imthiyaz-asm.github.io/togrowmarketing/', // ← ADD YOUR GITHUB LINK HERE
  },

  tracker: {
    number: '04 / 04',
    title: 'Job Application Tracker',
    desc: 'A relational database system designed to track the full recruitment lifecycle. Features a normalized schema with 8+ tables, optimized queries with indexed JOINs, and real-time status lookups supporting 100+ records efficiently.',
    features: [
      'Normalized relational schema with 8+ tables',
      'Full recruitment lifecycle tracking — applied to offer',
      'Indexed JOINs for optimized query performance',
      'Real-time status lookups across 100+ records',
      'Comprehensive relational database design patterns',
    ],
    tech: ['SQL', 'MySQL', 'Relational Design', 'Query Optimization', 'Indexing', 'JOINs'],
    github: '', // ← ADD YOUR GITHUB LINK HERE
  },
};


/* ─────────────────────────────────────────
   MODAL — OPEN
───────────────────────────────────────── */
function openModal(id) {
  const p = projects[id];
  if (!p) return;

  // Fill number and title
  document.getElementById('modal-number').textContent = p.number;
  document.getElementById('modal-title').textContent = p.title;

  // Fill description
  document.getElementById('modal-desc').textContent = p.desc;

  // Fill features list
  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = p.features
    .map((f) => `<li>${f}</li>`)
    .join('');

  // Fill tech grid
  const techGrid = document.getElementById('modal-tech');
  techGrid.innerHTML = p.tech
    .map((t) => `<div class="modal-tech-item">${t}</div>`)
    .join('');

  // Fill GitHub link or placeholder
  const linkArea = document.getElementById('modal-link-area');
  if (p.github) {
    linkArea.innerHTML = `
      <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="modal-github-btn">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        View on GitHub
      </a>
    `;
  } else {
    linkArea.innerHTML = `
      <div class="modal-soon">
        🔗 Add your GitHub link in script.js to enable this button
      </div>
    `;
  }

  // Show modal
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}


/* ─────────────────────────────────────────
   MODAL — CLOSE
───────────────────────────────────────── */
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(event) {
  if (event.target === document.getElementById('modal-overlay')) {
    closeModal();
  }
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
