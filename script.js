document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initEmiCalculator();
  initScrollSpy();
  initLocationsCarousel();
  initReviewsCarousel();
  addRevealToProjectCards();
  initScrollReveal();
  initLightbox();
  initHeaderScroll();
});

/* ── Gallery Lightbox ── */
const galleryImages = [
  { src: 'images/gallery_award_2025.jpg',            caption: 'Telangana Business Innovation Award 2025' },
  { src: 'images/gallery_event_bouquets.jpg',        caption: 'VVR GROUPS Chairman & Team at Corporate Event' },
  { src: 'images/gallery_team_royals.jpg',           caption: 'Welcome to Team Royals - Sri Vajra Developers' },
  { src: 'images/gallery_customer_sree_mallika.jpg', caption: 'Welcoming Producer Sree Mallika Reddy Garu' },
  { src: 'images/gallery_presentation_room.jpg',     caption: 'Corporate Presentation & Briefing Session' },
  { src: 'images/sancha_drone_1.jpg',            caption: 'VVR Adhiran Sancha — Industrial Aerial Drone View' },
  { src: 'images/sancha_hoarding.jpg',           caption: 'VVR Adhiran Sancha — Site Hoarding & Development' },
  { src: 'images/sancha_layout_1.jpg',           caption: 'VVR Adhiran Sancha — Phase 1 Plot Layout' },
  { src: 'images/sancha_layout_2.jpg',           caption: 'VVR Adhiran Sancha — Internal CC Roads' },
  { src: 'images/gopanapally_building_1.jpg',    caption: 'VVR Gopanapally Apartments — Construction Progress' },
  { src: 'images/gopanapally_building_2.jpg',    caption: 'VVR Gopanapally Apartments — Tower View' },
  { src: 'images/gopanapally_building_3.jpg',    caption: 'VVR Gopanapally Apartments — Premium Towers' },
  { src: 'images/modern_luxury_villa.png',        caption: 'Sovereign Gated Luxury Villa' },
  { src: 'images/varahi_main.jpg',               caption: 'VVR Adhiran Varahi County — Main Site' },
  { src: 'images/varahi_master_layout.png',       caption: 'Varahi County DTCP & TS RERA Approved Layout' },
  { src: 'images/varahi_user_aerial.jpg',         caption: 'Varahi County — Aerial Drone View' },
  { src: 'images/varahi_drone.jpg',               caption: 'Varahi County — Aerial Drone View 1' },
  { src: 'images/varahi_drone2.jpg',              caption: 'Varahi County — Aerial Drone View 2' },
  { src: 'images/varahi_site.jpg',                caption: 'Site Development & Blacktop Roads' },

];

let lbCurrent = 0;

function initLightbox() {
  const overlay = document.getElementById('gallery-lightbox');
  if (!overlay) return;

  document.getElementById('lightboxPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    lbCurrent = (lbCurrent - 1 + galleryImages.length) % galleryImages.length;
    setLightboxImage(lbCurrent);
  });

  document.getElementById('lightboxNext').addEventListener('click', (e) => {
    e.stopPropagation();
    lbCurrent = (lbCurrent + 1) % galleryImages.length;
    setLightboxImage(lbCurrent);
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay || overlay.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  { lbCurrent = (lbCurrent - 1 + galleryImages.length) % galleryImages.length; setLightboxImage(lbCurrent); }
    if (e.key === 'ArrowRight') { lbCurrent = (lbCurrent + 1) % galleryImages.length; setLightboxImage(lbCurrent); }
  });
}

function setLightboxImage(index) {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = galleryImages[index].src;
    img.alt = galleryImages[index].caption;
    if (cap) cap.textContent = galleryImages[index].caption;
    img.style.transition = 'opacity 0.25s ease';
    img.style.opacity = '1';
  }, 120);
}

function openLightbox(src, caption) {
  let idx = galleryImages.findIndex(g => g.src === src);
  if (idx === -1) {
    galleryImages.push({ src: src, caption: caption || 'Property Image' });
    idx = galleryImages.length - 1;
  }
  lbCurrent = idx;
  const overlay = document.getElementById('gallery-lightbox');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setLightboxImage(lbCurrent);
}

function closeLightbox(event) {
  // Close if called directly, or if clicked on the dark overlay itself
  if (event && event.target.closest('.lightbox-box')) return;
  const overlay = document.getElementById('gallery-lightbox');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ── Header shadow on scroll ── */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Add reveal class to project cards ── */
function addRevealToProjectCards() {
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.classList.add('reveal', 'visible');
    if (i % 3 === 1) card.classList.add('reveal-delay-1');
    if (i % 3 === 2) card.classList.add('reveal-delay-2');
  });
}

/* 1c. Reviews Testimonials Auto-Sliding Carousel */
function initReviewsCarousel() {
  const track = document.getElementById('reviewsCarouselTrack');
  const dotsContainer = document.getElementById('reviewsDots');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll('.reviews-slide'));
  const total = slides.length;
  let current = 0;
  let interval;

  function getSlidesVisible() {
    return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const vis = getSlidesVisible();
    const count = total - vis + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'reviews-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Review ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.reviews-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const vis = getSlidesVisible();
    const max = total - vis;
    current = Math.max(0, Math.min(index, max));
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 24;
    track.style.transform = `translateX(-${current * (slideWidth + gap)}px)`;
    updateDots();
  }

  function next() {
    const vis = getSlidesVisible();
    goTo(current >= total - vis ? 0 : current + 1);
  }

  function prev() {
    const vis = getSlidesVisible();
    goTo(current <= 0 ? total - vis : current - 1);
  }

  function startAuto() { interval = setInterval(next, 4000); }
  function stopAuto() { clearInterval(interval); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

  buildDots();
  startAuto();
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    startAuto();
  });
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

/* 1d. Scroll-Reveal IntersectionObserver */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

/* 1b. Location Cards Auto-Sliding Carousel */
function initLocationsCarousel() {
  const track = document.getElementById('locSliderTrack');
  const dotsContainer = document.getElementById('locSliderDots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll('.loc-slide'));
  const total = slides.length;
  let current = 0;
  let interval;

  function getSlidesVisible() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const vis = getSlidesVisible();
    const count = total - vis + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'loc-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.loc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const vis = getSlidesVisible();
    const max = total - vis;
    current = Math.max(0, Math.min(index, max));
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 24; // 1.5rem gap
    track.style.transform = `translateX(-${current * (slideWidth + gap)}px)`;
    updateDots();
  }

  function next() {
    const vis = getSlidesVisible();
    const max = total - vis;
    goTo(current >= max ? 0 : current + 1);
  }

  function startAuto() {
    interval = setInterval(next, 3000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  buildDots();
  startAuto();

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : goTo(current - 1);
    startAuto();
  });
  // Rebuild on resize
  window.addEventListener('resize', () => { buildDots(); goTo(current); });
}

/* 2. Mobile Menu Navigation Toggle & Dropdown Handling */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      if (menuIcon) {
        if (navLinks.classList.contains('active')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });

    // Handle dropdown toggles on mobile
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = trigger.parentElement;
          parent.classList.toggle('open');
        }
      });
    });

    // Close menu when a regular navigation link (not a dropdown trigger) is clicked
    document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* 3. Hero Search Functionality - Project Site Filter */
function executeHeroSearch(smoothScroll = true) {
  const locationSelect = document.getElementById('heroSearchLocation');
  if (!locationSelect) return;

  const location = locationSelect.value;

  if (smoothScroll) {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Filter Project Cards
  const cards = document.querySelectorAll('.project-card');
  let visibleProjects = 0;

  cards.forEach(card => {
    const cardLoc = (card.getAttribute('data-location') || '') + ' ' + card.innerText;
    const matchLoc = (location === 'all' || cardLoc.toLowerCase().includes(location.toLowerCase()));

    if (matchLoc) {
      card.style.display = 'flex';
      card.classList.add('visible');
      visibleProjects++;
    } else {
      card.style.display = 'none';
    }
  });

  // Filter Prime Locations Grid Section
  const locationBoxes = document.querySelectorAll('.location-box');
  locationBoxes.forEach(box => {
    const boxText = box.innerText.toLowerCase();
    if (location === 'all' || boxText.includes(location.toLowerCase())) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });

  // Reset tab filter buttons highlight
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

  showNotification(`Showing ${visibleProjects} matching project(s) for selected site.`);
}

// Bind real-time change event listeners for instant filtering when user selects any project site option
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('heroSearchLocation');
  if (el) {
    el.addEventListener('change', () => {
      executeHeroSearch(true);
    });
  }
});

/* 4. Project Filters (Status / Category) */
function filterProjects(status, btnElement = null) {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');

  if (btnElement) {
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  cards.forEach(card => {
    const cardStatus = card.getAttribute('data-status');
    if (status === 'all' || cardStatus === status) {
      card.style.display = 'flex';
      card.classList.add('visible');
    } else {
      card.style.display = 'none';
    }
  });
}

function filterProjectsByCategory(category) {
  const cards = document.querySelectorAll('.project-card');
  const projectsSection = document.getElementById('projects');
  
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCategory.includes(category)) {
      card.style.display = 'flex';
      card.classList.add('visible');
    } else {
      card.style.display = 'none';
    }
  });
}

/* 5. Project Specifications Modal Data */
const projectSpecsData = {
  monarch: {
    title: "VVR Adhiran Varahi County Township",
    location: "Mall Town / Sagar Highway (Narsaipally)",
    type: "DTCP & TS RERA Approved Plotted Township",
    rera: "TS RERA NO. P02400005486 (T.L.P.No. 220/2022/H)",
    image: "images/varahi_user_aerial.jpg",
    layoutMap: "images/varahi_master_layout.png",
    price: "₹16 Lakhs Onwards",
    possession: "Immediate Registration & Ready to Build",
    highlights: [
      "TS RERA NO. P02400005486 | DTCP Approval T.L.P.No. 220/2022/H",
      "Located in Narsaipally Grampanchayat, Madgul Mandal (Sagar Highway)",
      "5 Mins to Amaravathi Expressway & 10 Mins from RRR Narsaipally Exit",
      "15 Mins to Bharat Future City (4th City Growth Corridor)",
      "Premium Corner Plot Options: East Facing +₹500/sq.yd, NE Corner +₹750/sq.yd",
      "20 Mins to Shamshabad RGI Airport & 15 Mins to Natco Pharma / Microsoft Data Center"
    ],
    specs: [
      "Roads: 40ft & 33ft wide asphalt roads with 300ft proposed approach road frontage",
      "Drainage & Water: Advanced underground drainage system & individual water line per plot",
      "Amenities: Dedicated open space park (2332 Sq.Yds & 4330 Sq.Yds), children's play park",
      "Security: 24/7 CCTV surveillance, compound wall & secure electric fencing"
    ]
  },
  imperial: {
    title: "VVR Adhiran Sancha Premium Gated Villa Plots",
    location: "Electronic Manufacturing Cluster (EMC) / Tukkuguda Exit 14",
    type: "HMDA & TG RERA Approved Premium Plotted Township",
    rera: "TG RERA NO. P02400009291 (HMDA: 008970/HMDA/2270/SMD/2024)",
    image: "images/sancha_drone_1.jpg",
    layoutMap: "images/sancha_layout_1.jpg",
    price: "₹36 Lakhs Onwards",
    possession: "Spot Registration Available & Ready for Construction",
    highlights: [
      "TG RERA NO. P02400009291 | HMDA Permit No: 008970/HMDA/2270/SMD/2024",
      "Frontage on Existing 33ft Wide Road & Proposed 100ft Road Expansion",
      "Beside Electronic Manufacturing Cluster (EMC)",
      "Adjacent to Samsung Electronics, Wipro Infra & Malabar Gold Manufacturing Unit",
      "15 Mins to Tukkuguda Exit No. 14 (Outer Ring Road - ORR Exit 14)",
      "20 Mins to Imarat RCI, DRDO, Aga Khan Academy & Shamshabad RGI Airport"
    ],
    specs: [
      "Roads: Proposed 33ft & 30ft wide internal asphalt roads with 100ft road expansion",
      "Infrastructure: Dedicated Social Infra space, underground drainage & individual water lines",
      "Amenities: Children's play park, open green spaces, rainwater harvesting & LED street lights",
      "Plot Pricing Extras: North-East Corner +₹750/sq.yd, East Facing +₹500/sq.yd, Any Corner +₹500/sq.yd",
      "Security: 24/7 CCTV surveillance, compound wall & spot registration ready"
    ]
  },
  vajra: {
    title: "Vajra Shivam County Premium Villa Plots",
    location: "Near Future City / Amangal Municipality",
    type: "DTCP Approved Layout & 100% Vaastu",
    rera: "TS RERA NO. P02400009827 (DTCP Approval: LP No. 0003/LO/3134/2025)",
    image: "images/vajra_aerial_layout.jpg",
    layoutMap: "images/vajra_master_layout.png",
    price: "₹18 Lakhs Onwards",
    possession: "Spot Registration Available & Construction Undertaken",
    highlights: [
      "DTCP Approved Layout & 100% Vaastu | Under HMDA Limits",
      "TS RERA NO. P02400009827 | DTCP Approval: LP No. 0003/LO/3134/2025",
      "Located near 4th City, Future City, and Amazon Data Center",
      "Near proposed Regional Ring Road (RRR) & Srisailam National Highway",
      "Approx. 40 minutes from Rajiv Gandhi International Airport",
      "Close to Skill University, Fab City, and Maisigandi Maisamma Temple"
    ],
    specs: [
      "Roads: Premium gated community with 33 ft & 30 ft concrete CC roads",
      "Amenities: Overhead water tanks, underground drinking water & drainage lines",
      "Landscaping: Beautiful avenue plantation, landscaped parks & children's play area",
      "Security: 24/7 round-the-clock gated community security & street lighting"
    ]
  },
  gopanapally: {
    title: "VVR Gopanapally Apartments",
    location: "Adjacent to Wipro, Gopanapally",
    type: "Ultra-Luxury 2 & 3 BHK Apartments",
    rera: "TBD",
    image: "images/luxury_apartments_tower_1786211178100.jpg",
    layoutMap: "",
    price: "TBD",
    possession: "TBD",
    highlights: [
      "Spread across a magnificent 6.5-acre premium community",
      "680 luxury apartments across 8 elegant towers",
      "Thoughtfully designed 2 BHK & 3 BHK residences",
      "Adjacent to Wipro, Gopanapally",
      "Family-Friendly Community Living"
    ],
    specs: [
      "Amenities: Premium Clubhouse & Lifestyle Amenities",
      "Environment: Landscaped Open & Green Spaces",
      "Security: Secure Gated Community",
      "Parking: Dedicated Parking Facilities",
      "Fitness: Modern Fitness & Recreation Facilities"
    ]
  }
};

function showProjectDetails(key) {
  const data = projectSpecsData[key];
  if (!data) return;

  const modalBody = document.getElementById('specsModalBody');
  modalBody.innerHTML = `
    <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; height: 260px; margin-bottom: 1.5rem;">
      <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%); display: flex; align-items: flex-end; padding: 1.5rem; color: #fff;">
        <div>
          <span style="font-size: 0.8rem; color: var(--primary-gold); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">${data.type}</span>
          <h2 style="color: #fff; font-size: 1.8rem; line-height: 1.2;">${data.title}</h2>
          <p style="font-size: 0.85rem; color: #cbd5e1;"><i class="fa-solid fa-location-dot"></i> ${data.location}</p>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; font-size: 0.85rem; background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-sm);">
      <div><strong>RERA No:</strong> ${data.rera}</div>
      <div><strong>Price Range:</strong> <span style="color: var(--primary-gold); font-weight: 700;">${data.price}</span></div>
      <div><strong>Possession:</strong> ${data.possession}</div>
    </div>

    <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: var(--text-dark);">Key Architectural Highlights</h4>
    <ul style="padding-left: 1.2rem; margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
      ${data.highlights.map(h => `<li style="margin-bottom: 0.3rem;">${h}</li>`).join('')}
    </ul>

    <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem; color: var(--text-dark);">Technical Specifications</h4>
    <ul style="padding-left: 1.2rem; margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
      ${data.specs.map(s => `<li style="margin-bottom: 0.3rem;">${s}</li>`).join('')}
    </ul>

    ${data.layoutMap ? `
      <div style="margin-bottom: 1.5rem; background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <h4 style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--text-dark);"><i class="fa-solid fa-map"></i> Official Approved Master Layout Map</h4>
        <div style="cursor: pointer; position: relative; overflow: hidden; border-radius: var(--radius-sm); max-height: 200px; margin-bottom: 0.8rem;" onclick="openLightbox('${data.layoutMap}', '${data.title} - Master Layout Plan Map')">
          <img src="${data.layoutMap}" alt="Master Layout Plan" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 0.9rem;">
            <i class="fa-solid fa-expand" style="margin-right: 0.4rem;"></i> Click to View Full Layout Plan Map
          </div>
        </div>
        <a href="${data.layoutMap}" download="Adhiran_Varahi_County_Master_Layout.png" target="_blank" class="btn btn-outline btn-sm" style="width: 100%; text-align: center; display: inline-block;">
          <i class="fa-solid fa-download"></i> Download Approved Master Layout Map (PNG)
        </a>
      </div>
    ` : ''}

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary" style="flex: 1;" onclick="closeModal('specs-modal'); openModal('enquiry-modal', '${data.title}')">
        <i class="fa-solid fa-paper-plane"></i> Request Brochure & Price Sheet
      </button>
      ${data.layoutMap ? `
        <a href="${data.layoutMap}" download="Adhiran_Varahi_County_Master_Layout.png" target="_blank" class="btn btn-outline" style="flex: 1; text-align: center;">
          <i class="fa-solid fa-file-arrow-down"></i> Download Layout Plan
        </a>
      ` : ''}
    </div>
  `;

  openModal('specs-modal');
}

/* 6. Real-Time EMI Calculator Logic */
function initEmiCalculator() {
  const loanInput = document.getElementById('loanAmount');
  const rateInput = document.getElementById('interestRate');
  const tenureInput = document.getElementById('loanTenure');

  const amountVal = document.getElementById('amountVal');
  const rateVal = document.getElementById('rateVal');
  const tenureVal = document.getElementById('tenureVal');

  const emiDisplay = document.getElementById('emiDisplay');
  const totalPayableDisplay = document.getElementById('totalPayableDisplay');

  function calculate() {
    const P = parseFloat(loanInput.value);
    const R = parseFloat(rateInput.value) / 12 / 100;
    const N = parseFloat(tenureInput.value) * 12;

    amountVal.textContent = '₹' + P.toLocaleString('en-IN');
    rateVal.textContent = rateInput.value + '%';
    tenureVal.textContent = tenureInput.value + ' Years';

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayable = emi * N;

    if (!isNaN(emi)) {
      emiDisplay.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
      totalPayableDisplay.textContent = `Total Payable: ₹${Math.round(totalPayable).toLocaleString('en-IN')} (Principal: ₹${P.toLocaleString('en-IN')} + Interest)`;
    }
  }

  loanInput.addEventListener('input', calculate);
  rateInput.addEventListener('input', calculate);
  tenureInput.addEventListener('input', calculate);

  calculate();
}

/* 7. Image Lightbox Modal */
/* (Handled via openLightbox at line 67) */


/* 8. User Original Image Swap Handler (Live Preview) */
function swapImageLocally(targetKey, event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const newSrc = e.target.result;

    if (targetKey === 'hero') {
      document.getElementById('home').style.backgroundImage = `url('${newSrc}')`;
    } else if (targetKey === 'chairman') {
      document.querySelector('.chairman-image-box img').src = newSrc;
    } else if (targetKey === 'plots') {
      document.querySelectorAll('img[alt*="Plots"], img[alt*="Emerald"]').forEach(img => img.src = newSrc);
    } else if (targetKey === 'apartments') {
      document.querySelectorAll('img[alt*="Apartments"], img[alt*="Monarch"]').forEach(img => img.src = newSrc);
    } else if (targetKey === 'villas') {
      document.querySelectorAll('img[alt*="Villas"], img[alt*="Imperial"]').forEach(img => img.src = newSrc);
    } else if (targetKey === 'commercial') {
      document.querySelectorAll('img[alt*="Commercial"], img[alt*="Pinnacle"]').forEach(img => img.src = newSrc);
    }

    showNotification(`Successfully updated ${targetKey.toUpperCase()} image preview on website!`);
  };
  reader.readAsDataURL(file);
}

/* Modal Helpers */
function openModal(modalId, projectTitle = null) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (projectTitle && modalId === 'enquiry-modal') {
      document.getElementById('modalProjectTitle').textContent = `Enquiry: ${projectTitle}`;
    }
    if (modalId === 'site-visit-modal' && projectTitle) {
      const selectEl = document.getElementById('siteVisitProjectSelect');
      if (selectEl) {
        for (let i = 0; i < selectEl.options.length; i++) {
          if (selectEl.options[i].value.toLowerCase().includes(projectTitle.toLowerCase())) {
            selectEl.selectedIndex = i;
            break;
          }
        }
      }
    }
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/* Form Submit Handlers - Direct WhatsApp Helpline Integration (+91 7207128384) */
const VVR_HELPLINE_WA = "917207128384";

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contactName')?.value || 'Valued Customer';
  const phone = document.getElementById('contactPhone')?.value || 'Not provided';
  const email = document.getElementById('contactEmail')?.value || 'N/A';
  const vertical = document.getElementById('contactVertical')?.value || 'General Real Estate';
  const location = document.getElementById('contactLocation')?.value || 'Preferred Corridor';
  const message = document.getElementById('contactMessage')?.value || 'No extra notes.';

  const text = `🚨 *NEW WEBSITE CONSULTATION ENQUIRY — VVR GROUPS* 🚨\n\n` +
               `👤 *Name:* ${name}\n` +
               `📞 *Phone:* ${phone}\n` +
               `📧 *Email:* ${email}\n` +
               `🏡 *Interested Property:* ${vertical}\n` +
               `📍 *Location:* ${location}\n` +
               `💬 *Message:* ${message}\n\n` +
               `Please send site layout map, price details & arrange call back.`;

  const waUrl = `https://wa.me/${VVR_HELPLINE_WA}?text=${encodeURIComponent(text)}`;

  showNotification(`Enquiry formatted for ${name}! Opening WhatsApp to connect with VVR Helpline (+91 7207128384)...`);
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);

  event.target.reset();
}

function handleModalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('enquiryName')?.value || 'Valued Customer';
  const phone = document.getElementById('enquiryPhone')?.value || 'Not provided';
  const email = document.getElementById('enquiryEmail')?.value || 'N/A';
  const title = document.getElementById('modalProjectTitle')?.textContent || 'Project Quick Enquiry';

  const text = `🚨 *NEW QUICK PROJECT ENQUIRY — VVR GROUPS* 🚨\n\n` +
               `👤 *Name:* ${name}\n` +
               `📞 *Phone:* ${phone}\n` +
               `📧 *Email:* ${email}\n` +
               `📋 *Project / Topic:* ${title}\n\n` +
               `Please send complete layout brochure, price list & available plot numbers.`;

  const waUrl = `https://wa.me/${VVR_HELPLINE_WA}?text=${encodeURIComponent(text)}`;

  showNotification(`Enquiry received for ${name}! Opening WhatsApp to send directly to VVR Helpline (+91 7207128384)...`);
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);

  closeModal('enquiry-modal');
  event.target.reset();
}

function handleSiteVisitSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('siteVisitName')?.value || 'Valued Customer';
  const phone = document.getElementById('siteVisitPhone')?.value || 'Not provided';
  const selectEl = document.getElementById('siteVisitProjectSelect');
  const site = selectEl ? selectEl.value : 'VVR Project Site';
  const date = document.getElementById('siteVisitDate')?.value || 'Earliest available date';
  const time = document.getElementById('siteVisitTime')?.value || 'Morning slot';

  const text = `🚨 *NEW SITE VISIT RESERVATION — VVR GROUPS* 🚨\n\n` +
               `👤 *Customer Name:* ${name}\n` +
               `📞 *Phone Number:* ${phone}\n` +
               `📍 *Project Site:* ${site}\n` +
               `📅 *Preferred Date:* ${date}\n` +
               `⏰ *Time Slot:* ${time}\n\n` +
               `Please confirm complimentary pickup & guided site layout tour reservation.`;

  const waUrl = `https://wa.me/${VVR_HELPLINE_WA}?text=${encodeURIComponent(text)}`;

  showNotification(`Site visit reserved for ${name}! Opening WhatsApp to notify VVR Helpline (+91 7207128384)...`);
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);

  closeModal('site-visit-modal');
  event.target.reset();
}

/* Toast Notifications */
function showNotification(msg) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '90px';
  notification.style.right = '25px';
  notification.style.background = 'var(--primary-gold)';
  notification.style.color = '#ffffff';
  notification.style.padding = '0.8rem 1.4rem';
  notification.style.borderRadius = 'var(--radius-md)';
  notification.style.boxShadow = 'var(--shadow-lg)';
  notification.style.zIndex = '3000';
  notification.style.fontSize = '0.9rem';
  notification.style.fontFamily = 'var(--font-sans)';
  notification.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

/* 9. ScrollSpy for Navigation Links */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reviewAuthor').value;
  const project = document.getElementById('reviewProject').value;
  const reviewText = document.getElementById('reviewText').value;

  const grid = document.querySelector('.reviews-grid') || document.getElementById('reviewsCarouselTrack');
  if (grid) {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VVR';
    const card = document.createElement('div');
    card.className = 'review-card reviews-slide';
    card.innerHTML = `
      <div class="review-header">
        <div class="reviewer-avatar">${initials}</div>
        <div>
          <h4 class="reviewer-name">${name}</h4>
          <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified Buyer • ${project}</span>
        </div>
      </div>
      <div class="review-rating">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <p class="review-text">“${reviewText}”</p>
    `;
    grid.prepend(card);
  }

  alert("Thank you for your review! Your feedback has been published successfully.");
  closeModal('write-review-modal');
  event.target.reset();
}

/* FAQ Accordion Toggle */
function toggleFaq(btn) {
  const faqItem = btn.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

