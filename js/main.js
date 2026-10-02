/**
 * Lokendra Singh Shekhawat | Portfolio Interactive Engine
 * High-performance, lightweight Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initArchitectureTabs();
  initProjectFilters();
  initProjectModals();
  initResumeModal();
  initCertificateModal();
  initIndiaClock();
  initThemeToggle();
  initNavScroll();
  initClipboardActions();
  initContactForm();
});

/* ==========================================================================
   1. Role Typewriter Cycler
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-role');
  if (!target) return;

  const roles = [
    'React & Next.js Web Applications',
    'Node.js, PHP & Python Backends',
    'AI Agents & LLM Workflow Automation',
    'REST APIs & SaaS Platform Engineering',
    'Existing App Maintenance & Support'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 65;

  function typeStep() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 30;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(typeStep, typingSpeed);
  }

  typeStep();
}

/* ==========================================================================
   2. Architecture Visualizer Tabs
   ========================================================================== */
function initArchitectureTabs() {
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const panes = document.querySelectorAll('.arch-content-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Project Filter & Show More/Less System
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const toggleWrap = document.querySelector('.projects-toggle-wrap');
  const toggleBtn = document.getElementById('toggle-projects-btn');
  const toggleText = document.getElementById('toggle-projects-text');
  const toggleIcon = document.getElementById('toggle-projects-icon');

  let currentFilter = 'all';
  let isExpanded = false;

  function applyVisibility() {
    projectCards.forEach((card, idx) => {
      const categories = card.getAttribute('data-category') || '';
      const matches = currentFilter === 'all' || categories.includes(currentFilter);

      if (!matches) {
        card.style.display = 'none';
      } else {
        if (currentFilter === 'all') {
          // In 'all' view: show top 6, or all 9 if expanded
          if (idx < 6 || isExpanded) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        } else {
          // When a specific category is filtered, show all matching cards
          card.style.display = 'flex';
        }
      }
    });

    if (toggleWrap) {
      if (currentFilter === 'all') {
        toggleWrap.style.display = 'flex';
        if (toggleText) toggleText.textContent = isExpanded ? 'Show Less' : 'Show All Projects (11)';
        if (toggleIcon) {
          toggleIcon.className = isExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
        }
      } else {
        toggleWrap.style.display = 'none';
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter') || 'all';
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyVisibility();
    });
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      applyVisibility();
      if (!isExpanded) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Initial execution to display default 6 projects
  applyVisibility();
}

/* ==========================================================================
   4. Project Deep-Dive Modal Data & Handler
   ========================================================================== */
const projectDetailsData = {
  adsmith: {
    title: 'Adsmith.ai — AI-Native Advertising Platform',
    role: 'Lead AI Engineer & Backend Architect',
    techStack: ['Docker', 'PERN', 'Supabase Edge Functions', 'OpenAI Sora 2 Pro', 'Veo 3.1', 'LTX-2', 'Google Ads API', 'Meta Graph API', 'Mapbox'],
    imgSrc: 'assets/images/adsmith-preview.png',
    headline: 'Multi-Model Generative AI Video Pipeline with Closed-Loop Performance Learning',
    summary: 'Engineered an enterprise generative advertising platform that automates campaign creation, multi-model AI video production, audience targeting, and continuous optimization across Meta Advantage+ and Google Performance Max campaigns.',
    architectureDetails: [
      'Engineered an asynchronous multi-model video generation pipeline integrating LTX-2 (cost-effective high throughput), Veo 3.1 (cinematic quality), and Sora 2 Pro (complex motion prompts) behind a unified provider abstraction.',
      'Designed status tracking and asynchronous polling state machine: OpenAI status tracking (states 2 → 3), Veo polling at ~10s intervals, backed by z2queuetracker and i2production.',
      'Constructed a cross-platform location intelligence engine resolving geographic mismatches between Google Ads and Meta location IDs using adgeolocation, v2mappings, canonical normalization, and geocoding fallbacks for non-standard locales (e.g., Odisha vs. Orissa, Puducherry vs. Pondicherry).',
      'Developed Supabase Edge Functions orchestrating video generation, creative experimentation variants, and real-time campaign performance ingestion.'
    ],
    impactMetrics: [
      'Cut video production costs by 65% via dynamic model arbiter (routing simpler prompts to LTX-2 vs heavy prompts to Veo/Sora).',
      'Handled 2-3 minute async video generation cycles with zero server connection timeouts using distributed polling architecture.',
      'Enabled automated multi-variant creative testing that increased ad profitability by 4x based on performance feedback loops.'
    ],
    liveUrl: 'https://adsmith.ai/'
  },
  rocketsites: {
    title: 'Rocketsites AI — Autonomous AI Website Builder',
    role: 'Lead AI Architect & Python Systems Lead',
    techStack: ['Python', 'AI Agents', 'GLM API', 'Local AI Subagents', 'DOM Parsing', 'FastAPI', 'Visual Drag-and-Drop'],
    imgSrc: 'assets/images/zayrro-preview.png',
    headline: 'Hybrid Cloud-Local AI Agent System for Automated Web Development & Visual Editing',
    summary: 'Designed and built a Python-based autonomous AI agent platform that translates high-level natural language prompts into responsive websites, synchronizing generated DOM structures directly with an interactive drag-and-drop editor.',
    architectureDetails: [
      'Architected a cooperative multi-agent system pairing the cloud-based GLM API with a lightweight local AI subagent handling real-time syntax checking, local CSS/HTML generation, and AST mutations.',
      'Created bidirectional state synchronizer: modifications made in visual drag-and-drop builder update the AI agent context, and AI modifications update the visual canvas without full page re-renders.',
      'Engineered prompt compiler parsing business constraints (colors, layout hierarchy, typography, responsiveness) into structured component definitions.'
    ],
    impactMetrics: [
      'Reduced initial website prototype generation time from hours to under 45 seconds.',
      'Seamlessly blended generative AI with visual WYSIWYG editing for zero-code and low-code workflows.',
      'Designed local subagent caching that lowered cloud LLM token consumption by 40%.'
    ],
    liveUrl: 'https://app.rocketsites.org/signin'
  },
  zayrro: {
    title: 'Zayrro — Multi-Supplier AI Travel Booking Platform',
    role: 'Software Consultant & Principal Architect | Eyvy Solutions',
    techStack: ['PERN (PostgreSQL, Express, React, Node.js)', 'AWS', 'OpenAI', 'Amadeus GDS', 'Akbar Travels API', 'Benzy API', 'Rayna Tours API', 'Stripe'],
    imgSrc: 'assets/images/zayrro-preview.png',
    headline: 'High-Concurrency Travel Booking Aggregator with AI Route & Fare Optimization',
    summary: 'Engineered a unified travel booking platform aggregating flights, hotels, visa processing, and attraction tickets across multiple global GDS and NDC suppliers with real-time AI-assisted route suggestions saving users up to 40%.',
    architectureDetails: [
      'Integrated and normalized heterogeneous response formats from Amadeus, Akbar Travels, Benzy, and Rayna Tours into a unified canonical JSON schema for instantaneous search.',
      'Developed end-to-end flight booking pipeline: Search & Availability → Alternative Airport Matching → Dynamic Fare Families → Interactive Seat Selection → Itinerary Creation → Payment/Wallet → PNR Issuance & Voucher Retrieval.',
      'Engineered intelligent supplier failover and rate-limiting queues to navigate strict API concurrency limits and complex provider-specific authentication protocols.',
      'Implemented cancellation, refund calculation, digital wallet, and multi-currency (AED, USD, EUR, INR) settlement engines.'
    ],
    impactMetrics: [
      'Saved travelers up to 40% via alternative airport and multi-supplier fare comparisons.',
      'Sub-2-second search aggregation across 4 concurrent global travel suppliers.',
      'Zero booking discrepancies across hundreds of synchronized PNR tickets.'
    ],
    liveUrl: 'https://zayrro.com/'
  },
  vinstar: {
    title: 'Vinstar IDV — Automated Identity Verification & Video KYC',
    role: 'Lead Full-Stack & AI Systems Architect | Eyvy Solutions',
    techStack: ['Next.js', 'React', 'Python', 'FastAPI', 'Computer Vision (OCR)', 'Biometric Liveness', 'WebRTC', 'PostgreSQL', 'Docker'],
    imgSrc: 'assets/images/vinstar-preview.png',
    headline: 'AI-Powered Identity Verification & Fraud Prevention Under 1.2-Second SLA',
    summary: 'Engineered an enterprise-grade automated identity verification (IDV) and Video KYC platform designed for rapid customer onboarding, real-time document forensics, anti-spoofing biometrics, and global AML compliance.',
    architectureDetails: [
      'Built automated document verification microservices using Python and FastAPI parsing 14,000+ government ID templates across 248 countries with MRZ checksum validation and forgery detection.',
      'Integrated ISO 30107-3 Level 2 certified 3D biometric liveness detection and selfie-to-ID facial matching achieving 99.8% precision in under 1.2 seconds.',
      'Developed end-to-end WebRTC video KYC pipeline enabling encrypted, low-latency agent-assisted and autonomous customer onboarding sessions with automated geolocation checks.',
      'Integrated real-time AML screening against 1,800+ global sanction lists, PEP databases, and adverse media registries with webhook notification infrastructure.'
    ],
    impactMetrics: [
      '<1.2-second average automated verification SLA across global identity documents.',
      '99.8% biometric face-match accuracy with strict ISO 30107-3 Level 2 anti-spoofing defense.',
      'Over 98.6% first-time onboarding pass rate with streamlined responsive mobile-first UI.'
    ],
    liveUrl: 'https://vinstar.in/'
  },
  'zayrro-chat': {
    title: 'Zayrro AI Chat — Conversational Travel Assistant & Agent Orchestration',
    role: 'Software Consultant & AI Agent Architect | Eyvy Solutions',
    techStack: ['React.js', 'Node.js', 'Python', 'FastAPI', 'OpenAI GPT-4o', 'AI Agent Orchestration', 'Function Calling', 'WebSockets / SSE'],
    imgSrc: 'assets/images/zayrro-chat-preview.png',
    headline: 'Autonomous AI Travel Planning Agent with Real-Time GDS Flight & Hotel Booking Integration',
    summary: 'Architected an interactive conversational AI travel assistant that turns open-ended natural language travel ideas into comprehensive, bookable multi-day itineraries, flight schedules, and hotel reservations.',
    architectureDetails: [
      'Orchestrated multi-step AI agent workflows using OpenAI models and specialized tool-calling pipelines to interpret user intent, extract travel parameters, and query supplier APIs.',
      'Connected conversational agent directly to Zayrro travel engine (Amadeus GDS, hotel inventories) to fetch live pricing, availability, and alternative routes without leaving chat.',
      'Developed high-performance streaming backend with Python FastAPI and Server-Sent Events (SSE) / WebSockets delivering instant interactive UI cards and token streaming.',
      'Built interactive client widgets in React for instant seat selection, flight comparison cards, day-by-day itinerary timelines, and one-click checkout actions.'
    ],
    impactMetrics: [
      'Reduces end-to-end trip planning and booking discovery from 2+ hours to under 3 minutes.',
      'Sub-500ms token streaming latency with real-time UI widget generation.',
      'Unified search, route recommendation, and itinerary generation into a single conversational session.'
    ],
    liveUrl: 'https://chat.eyvy.in/'
  },
  strategyworks: {
    title: 'StrategyWorks — Enterprise Strategy & Portfolio Management',
    role: 'Solutions Architect & Full-Stack Lead',
    techStack: ['Docker', 'Angular', 'PHP', 'AWS EC2/RDS', 'Runway', 'MySQL', 'RBAC Security'],
    imgSrc: 'assets/images/strategyworks-preview.png',
    headline: 'Connecting Strategic Objectives, OKRs, & KPIs to Enterprise Delivery Portfolios',
    summary: 'Built an enterprise SaaS platform connecting executive board objectives with operational programmes, project portfolios, risk registers, RACI accountability matrices, and financial benefits tracking.',
    architectureDetails: [
      'Designed interconnected enterprise data model linking Top-Level Strategic Objectives → Annual OKRs → Quarterly KPIs → Portfolios → Programmes → Work Projects → Milestones.',
      'Implemented real-time risk, issues, decisions, and dependencies (RIDD) tracking matrices with automated escalation triggers.',
      'Built multi-tenant subscription management, granular role-based access control (RBAC), executive PMO dashboards, and automated database snapshot/restore systems.'
    ],
    impactMetrics: [
      'Rated 4.7/5 on G2 for enterprise strategy execution and alignment.',
      'Adopted by multinational organizations for cross-functional PMO and executive governance.',
      'Automated executive board reporting, saving PMO leads over 12 hours weekly per reporting cycle.'
    ],
    liveUrl: 'https://strategyworks.io/'
  },
  lazim: {
    title: 'Lazim — Owners Association & Community ERP Platform',
    role: 'Machine Learning Engineer | Ilaj Services',
    techStack: ['Python (FastAPI)', 'AWS EC2', 'Docker', 'TensorFlow', 'Hugging Face', 'Groq', 'SparkNLP', 'GPU OCR'],
    imgSrc: 'assets/images/lazim-preview.png',
    headline: 'GPU-Accelerated OCR & AI Automation for Real Estate Accounting and Community Management',
    summary: 'Led the development of automated invoice processing, GPU-based OCR pipelines, and property management ERP workflows for residential and commercial real estate communities.',
    architectureDetails: [
      'Built and optimized a GPU-based OCR pipeline utilizing Hugging Face Transformers and SparkNLP, achieving 95% automated document extraction accuracy on complex utility bills and vendor invoices.',
      'Implemented real-time ERP accounting automation: Invoices → OCR Data Extraction → Validation Rules → Auto-Ledger Posting with human-in-the-loop review queues.',
      'Engineered Python/FastAPI microservices running on AWS EC2 with Docker containers, improving request throughput and document processing speed by 20%.'
    ],
    impactMetrics: [
      '95% document extraction accuracy on scanned, non-standard real estate invoices.',
      'Reduced manual accounting data-entry effort by 15% across property management teams.',
      'Engineered robust microservice data pipelines processing hundreds of real estate documents weekly.'
    ],
    liveUrl: 'https://www.lazim.ae/'
  },
  mrbasrai: {
    title: 'Mr Basrai\'s World Cuisines — Restaurant & Table Booking Platform',
    role: 'Senior Full-Stack Developer',
    techStack: ['HTML5/CSS3', 'JavaScript', 'Django', 'Responsive Design', 'Table Reservation API'],
    imgSrc: 'assets/images/mrbasrai-preview.png',
    headline: 'High-Impact Visual UI & Live Reservation System for Premier World Cuisine Buffet',
    summary: 'Built a visually engaging, responsive culinary platform showcasing multi-cuisine buffet spreads, menu management, customer reviews, branch locations, and instant online table reservations.',
    architectureDetails: [
      'Implemented a high-performance visual-first responsive front-end with appetizing food carousels, responsive galleries, and promotional banners.',
      'Integrated real-time table booking engine handling date/time slot capacity, party size validation, and email booking confirmations.',
      'Enhanced mobile usability and page loading speed, achieving 90+ Google PageSpeed score on image-heavy assets.'
    ],
    impactMetrics: [
      'Elevated direct table reservations and online visibility for flagship Blackpool location.',
      'Fluid, mobile-optimized experience across 100% of modern viewport sizes.'
    ],
    liveUrl: 'https://www.mrbasrai.com/'
  },
  aarmhealth: {
    title: 'AARM Health — Telemedicine & Healthcare Platform',
    role: 'Frontend & UI Architecture Lead',
    techStack: ['React.js', 'JavaScript', 'REST APIs', 'OTP Authentication', 'Responsive Healthcare UX'],
    imgSrc: 'assets/images/aarmhealth-preview.png',
    headline: 'Connecting Patients with Doctors through Telemedicine Discovery & Consultations',
    summary: 'Developed modern ReactJS front-end, secure OTP patient authentication, doctor discovery search by specialty and location, and digital consultation appointment workflows.',
    architectureDetails: [
      'Engineered doctor discovery search workflows filtering by medical specialty, location, and consultation availability.',
      'Implemented secure authentication, patient dashboard, medical document viewing, and appointment scheduling.',
      'Designed responsive telemedicine interface optimized for high performance on both mobile devices and desktop.'
    ],
    impactMetrics: [
      'Streamlined patient-doctor discovery and reduced appointment booking friction.',
      'Responsive healthcare UX compliant with modern accessibility standards.'
    ],
    liveUrl: 'https://aarmhealth.com/'
  },
  idfc: {
    title: 'IDFC First Bank — Loan Origination System (LOS)',
    role: 'Data Scientist | Datamatics',
    techStack: ['Python', 'Django', 'Elasticsearch', 'AWS', 'PySpark', 'Scikit-learn', 'Salesforce CRM API'],
    imgSrc: 'assets/images/idfc-preview.png',
    headline: 'Predictive ML Scoring & Regulatory Document Processing for Retail Banking Loans',
    summary: 'Developed predictive machine learning models and automated underwriting pipelines for Micro Business, Home, and Education Loans, accelerating loan disbursement and risk classification.',
    architectureDetails: [
      'Engineered predictive lead distribution and conversion scoring models using PySpark and Scikit-learn, boosting conversion rates by 10%.',
      'Automated loan approval, credit disbursement, and collection lead workflows, reducing end-to-end loan turnaround times by 30%.',
      'Built automated NLP sentiment and intent classification models for customer support tickets and automated debt collection schedules.',
      'Developed secure document authentication solutions including E-Stamp feature extraction and Aadhaar-based KYC verification compliant with banking regulatory standards.'
    ],
    impactMetrics: [
      'Reduced loan processing turnaround time by 30%.',
      '10% measurable increase in lead conversion rates via predictive matching.',
      'Enterprise integration with Salesforce CRM for sub-second loan status synchronization.'
    ],
    liveUrl: '#'
  },
  realmtalks: {
    title: 'RealmTalks — Real-Time Social Media Platform',
    role: 'Software Developer | Ecloud Solutions',
    techStack: ['Node.js', 'Express.js', 'AWS', 'PostgreSQL', 'Docker', 'RabbitMQ', 'MediaSoup WebRTC', 'ArgoDB'],
    imgSrc: 'assets/images/zayrro-preview.png',
    headline: 'Event-Driven Microservices Architecture with Group WebRTC Video & AI Content Feeds',
    summary: 'Built a scalable social networking platform featuring short-form video reels, real-time messaging, group WebRTC video conferencing, and event-driven microservices.',
    architectureDetails: [
      'Designed microservices mesh for Posts, Reels, Stories, Auth, Chat, and In-App Wallet communicating over RabbitMQ event brokers.',
      'Engineered low-latency group video conferencing and live broadcasting using MediaSoup and WebRTC, supporting up to 10 concurrent video publishers per 8-core instance.',
      'Implemented AI-based recommendation feeds for reels and explore suggestions using user affinity vectors and interaction histories.',
      'Optimized media pipeline with automated compression and progressive video streaming.'
    ],
    impactMetrics: [
      'Sub-100ms real-time chat delivery with RabbitMQ and WebSocket clustering.',
      'Concurrent group video calling with low bandwidth consumption via MediaSoup SFU.',
      'Decoupled microservice deployment supporting zero-downtime rolling upgrades.'
    ],
    liveUrl: '#'
  },
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.view-case-study-btn');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-role').textContent = data.role;
    document.getElementById('modal-project-headline').textContent = data.headline;
    document.getElementById('modal-project-summary').textContent = data.summary;

    const imgEl = document.getElementById('modal-project-img');
    if (imgEl && data.imgSrc) {
      imgEl.src = data.imgSrc;
      imgEl.alt = data.title;
      imgEl.style.display = 'block';
    } else if (imgEl) {
      imgEl.style.display = 'none';
    }

    const techContainer = document.getElementById('modal-project-tech');
    techContainer.innerHTML = '';
    data.techStack.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag highlight';
      tag.textContent = t;
      techContainer.appendChild(tag);
    });

    const archList = document.getElementById('modal-project-arch');
    archList.innerHTML = '';
    data.architectureDetails.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      archList.appendChild(li);
    });

    const impactList = document.getElementById('modal-project-impact');
    impactList.innerHTML = '';
    data.impactMetrics.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      impactList.appendChild(li);
    });

    const liveLinkBtn = document.getElementById('modal-project-live-btn');
    if (liveLinkBtn) {
      if (data.liveUrl && data.liveUrl !== '#') {
        liveLinkBtn.href = data.liveUrl;
        liveLinkBtn.style.display = 'inline-flex';
      } else {
        liveLinkBtn.style.display = 'none';
      }
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project');
      openModal(pid);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Resume Viewer Modal
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close-btn');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeResume);
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResume();
    }
  });
}

/* ==========================================================================
   5b. Certificate Viewer Modal
   ========================================================================== */
function initCertificateModal() {
  const certModal = document.getElementById('cert-modal');
  if (!certModal) return;

  const modalImg = document.getElementById('modal-cert-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalSubtitle = document.getElementById('modal-cert-subtitle');
  const modalPdfBtn = document.getElementById('modal-cert-pdf-btn');
  const modalVerifyBtn = document.getElementById('modal-cert-verify-btn');
  const closeBtn = document.getElementById('cert-modal-close-btn');
  const openBtns = document.querySelectorAll('.open-cert-modal-btn');

  function openCert(btn) {
    const title = btn.getAttribute('data-title') || 'Certificate';
    const subtitle = btn.getAttribute('data-subtitle') || 'Verified Credential';
    const img = btn.getAttribute('data-img') || '';
    const pdf = btn.getAttribute('data-pdf') || '';
    const verify = btn.getAttribute('data-verify') || '#';

    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalImg.src = img;
    modalImg.alt = title;

    if (pdf) {
      modalPdfBtn.href = pdf;
      modalPdfBtn.style.display = 'inline-flex';
    } else {
      modalPdfBtn.style.display = 'none';
    }

    if (verify && verify !== '#') {
      modalVerifyBtn.href = verify;
      modalVerifyBtn.style.display = 'inline-flex';
    } else {
      modalVerifyBtn.style.display = 'none';
    }

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCert() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCert(btn);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCert);
  }

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeCert();
    }
  });
}

/* ==========================================================================
   6. Live India Clock (IST - UTC+5:30)
   ========================================================================== */
function initIndiaClock() {
  const clockEl = document.getElementById('india-live-time');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `${timeString} IST (Jaipur, India)`;
    } catch (e) {
      clockEl.textContent = 'Jaipur, India (IST · UTC+5:30)';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. Theme Switcher (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('theme-light');
    updateThemeIcon(true);
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Switched to Clean Light theme' : 'Switched to Obsidian Dark theme');
  });

  function updateThemeIcon(isLight) {
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }
}

/* ==========================================================================
   8. Navigation Scroll & Scrollspy (requestAnimationFrame Throttled)
   ========================================================================== */
function initNavScroll() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScrollUpdates();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function handleScrollUpdates() {
    const scrollY = window.scrollY;

    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    const scrollPos = scrollY + 160;
    let currentSection = '';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
        break;
      }
    }

    if (currentSection) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  // Mobile Drawer Navigation Logic
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('mobile-drawer-close');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeMobileDrawer();
    }
  });
}

/* ==========================================================================
   9. Clipboard Actions & Toast
   ========================================================================== */
function initClipboardActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('s2lokendra@gmail.com', 'Email copied to clipboard!');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyToClipboard('+918690802002', 'Phone number copied to clipboard!');
    });
  }
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(() => {
    showToast('Failed to copy to clipboard');
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

/* ==========================================================================
   10. Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Save button original state
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch('https://formsubmit.co/ajax/s2lokendra@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast('Thank you! Your message has been sent directly to Lokendra.');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.message) {
          showToast(data.message);
        } else {
          // Fallback to direct HTML form submit if AJAX endpoint returns non-200
          form.submit();
        }
      }
    } catch (err) {
      console.warn('FormSubmit AJAX failed, falling back to native POST:', err);
      // Native fallback submit
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHtml;
      }
    }
  });
}
