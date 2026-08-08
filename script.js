/* ==========================================================================
   VVR GROUPS INFRA DEVELOPERS - MASTER JAVASCRIPT LOGIC
   Building Landmarks. Creating Legacies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initEmiCalculator();
  initScrollSpy();
});

/* 1. Theme Toggle (Light / Dark Mode) */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  const htmlTag = document.documentElement;

  // Saved theme or default to light
  const savedTheme = localStorage.getItem('vvr_theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('vvr_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.innerHTML = theme === 'dark' 
    ? '<i class="fa-solid fa-sun" style="color: #f59e0b;"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
}

/* 2. Mobile Menu Navigation Toggle */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
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
    image: "images/sancha_aerial_drone.png",
    layoutMap: "images/sancha_master_layout.jpg",
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
  emerald: {
    title: "VVR Emerald Palms Layout",
    location: "Sagar Highway Belt, Hyderabad",
    type: "HMDA & DTCP Approved Gated Plot Township",
    rera: "P02400006540",
    image: "images/residential_plots_layout_1786211157283.jpg",
    price: "₹8 Lakhs Onwards",
    possession: "Immediate Registration",
    highlights: [
      "100-Acre master-planned luxury gated plot community on Sagar Highway",
      "60ft & 40ft wide asphalt roads with underground sewage cabling",
      "3-Acre central park with jogging tracks & sports courts",
      "Clear marketable titles with spot registration"
    ],
    specs: [
      "Plot Sizes: 200, 300, 400 & 600 Sq. Yards",
      "Utilities: Underground storm drainage & avenue palm plantations"
    ]
  },
  pinnacle: {
    title: "VVR Pinnacle Tech & Commercial Park",
    location: "Warangal Highway Express Corridor",
    type: "Grade-A Commercial & Retail Center",
    rera: "P02400009230",
    image: "images/commercial_tech_park_1786211223794.jpg",
    price: "₹15 Lakhs Onwards",
    possession: "December 2026",
    highlights: [
      "Iconic corporate office & commercial glass facade tower on Warangal Highway",
      "High-speed passenger elevators & multi-level basement parking",
      "High-street retail shops on ground and first floors"
    ],
    specs: [
      "Spaces: Executive Offices & Commercial Shops from 500 Sq.Ft. upwards",
      "Power: 100% power backup with 11KV dedicated substation"
    ]
  },
  royal: {
    title: "VVR Royal County Enclave",
    location: "Alwal & Shamirpet Belt, Secunderabad",
    type: "Upcoming Smart Residential Plotted Layout",
    rera: "Application under process",
    image: "images/residential_plots_layout_1786211157283.jpg",
    price: "₹10 Lakhs Onwards",
    possession: "Q4 2026",
    highlights: [
      "Strategic plot layout connecting Alwal residential hub and Shamirpet Genome Valley",
      "Solar street lighting & smart water metering infrastructure",
      "Clubhouse with badminton courts, swimming pool, and park"
    ],
    specs: [
      "Plot Sizes: 167 to 500 Sq. Yards",
      "Location: 5 Mins from Shamirpet ORR Exit 7 & Alwal Junction"
    ]
  },
  horizon: {
    title: "VVR Grand Horizon Township",
    location: "Amangal & Mall Town Growth Corridor",
    type: "Plotted Township & Commercial Retail Arcade",
    rera: "P02400004120",
    image: "images/amenities_clubhouse_1786211251386.jpg",
    price: "₹6 Lakhs Onwards",
    possession: "Ready to Construct",
    highlights: [
      "High-appreciation residential plotted layout in Amangal & Mall Town hub",
      "Direct frontage on main arterial highway with massive future capital ROI"
    ],
    specs: [
      "Plot Sizes: 150 Sq.Yds to 1,000 Sq.Yds",
      "Returns: High Appreciation Potential along RRR & Mega Infrastructure Corridors"
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
function openLightbox(imgSrc, captionText) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = captionText;
  openModal('lightbox-modal');
}

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

/* Form Submit Handlers */
function handleFormSubmit(event) {
  event.preventDefault();
  alert("Thank you for contacting VVR GROUPS INFRA DEVELOPERS! Your enquiry has been received. Our sales executive will call you within 30 minutes.");
  event.target.reset();
}

function handleModalSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your enquiry for VVR GROUPS INFRA DEVELOPERS has been submitted. Brochure and price sheet will be sent to your phone/email.");
  closeModal('enquiry-modal');
  event.target.reset();
}

function handleSiteVisitSubmit(event) {
  event.preventDefault();
  const selectEl = document.getElementById('siteVisitProjectSelect');
  const selectedSite = selectEl ? selectEl.value : 'your selected site';
  alert(`Site Visit Confirmed for ${selectedSite}!\n\nOur sales representative will contact you to arrange complimentary pick-up & guided site tour.`);
  closeModal('site-visit-modal');
  event.target.reset();
}

/* Toast Notifications */
function showNotification(msg) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '90px';
  notification.style.right = '25px';
  notification.style.background = 'var(--accent-emerald)';
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
