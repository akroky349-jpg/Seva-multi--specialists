/* Seva Multi Specialist Hospital — Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initMobileMenu();
  initRippleButtons();
  initCounters();
  initParticles();
  initLazyLoad();
  initScrollTop();
  initActiveNav();
  initParallax();
  initForms();
  initFAQ();
  initGallery();
  initDoctorSelect();
  initReviewSubmit();
});

/* ---- AOS Scroll Animations ---- */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }
}

/* ---- Navbar Scroll Effect ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('menuClose');
  const links = menu?.querySelectorAll('a');

  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  links?.forEach(link => link.addEventListener('click', closeMenu));
}

/* ---- Button Ripple Effect ---- */
function initRippleButtons() {
  document.querySelectorAll('.btn-premium').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ---- Counter Animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* ---- Hero Particles ---- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (8 + Math.random() * 12) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(particle);
  }
}

/* ---- Lazy Load Images ---- */
function initLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
}

/* ---- Scroll to Top ---- */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Active Nav Link highlighting ---- */
function initActiveNav() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === pageName || (pageName === "index.html" && linkPath === "#") || (pageName === "index.html" && linkPath === "index.html")) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ---- Subtle Parallax ---- */
function initParallax() {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

/* ---- Form validation & Animations ---- */
function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    if (form.id === 'reviewForm') return; // Handled separately
    form.addEventListener('submit', (e) => {
      // If it doesn't navigate to another page, handle locally
      if (!form.getAttribute('action')) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;
        const originalText = btn.innerHTML;

        btn.innerHTML = `
          <svg class="w-5 h-5 animate-spin mx-auto text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Processing...
        `;
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = `
            <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Submitted Successfully!
          `;
          btn.classList.add('!bg-green-600');

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('!bg-green-600');
            form.reset();
            
            // If it's hero appointment, maybe redirect to appointment success page
            if (form.id === 'heroAppointmentForm') {
              window.location.href = 'appointment.html?success=true';
            }
          }, 2000);
        }, 1500);
      }
    });
  });
}

/* ---- FAQ Accordion toggles ---- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ---- Gallery Filtering & Lightbox Modal ---- */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-white', 'text-gray-600'));

        btn.classList.add('active', 'bg-primary', 'text-white');
        btn.classList.remove('bg-white', 'text-gray-600');

        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      });
    });
  }

  // Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          if (lightboxCaption) lightboxCaption.textContent = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }
}

/* ---- Dynamic Doctor Select by Department ---- */
function initDoctorSelect() {
  const deptSelect = document.getElementById('appointmentDept');
  const docSelect = document.getElementById('appointmentDoc');
  if (!deptSelect || !docSelect) return;

  const doctors = {
    'Cardiology': ['Dr. Rajesh Kumar', 'Dr. Mahesh Patil'],
    'Neurology': ['Dr. Priya Sharma', 'Dr. Santosh Mane'],
    'Orthopedics': ['Dr. Amit Patel', 'Dr. Sanjay Deshmukh'],
    'Pediatrics': ['Dr. Ananya Reddy', 'Dr. Snehal Shinde'],
    'General Medicine': ['Dr. Vijay Gupta', 'Dr. Ritu Shah'],
    'Gynecology': ['Dr. Kavita Joshi', 'Dr. Meena Apte'],
    'Dermatology': ['Dr. Arjun Mehta'],
    'ENT': ['Dr. Prakash Gore']
  };

  deptSelect.addEventListener('change', () => {
    const selectedDept = deptSelect.value;
    docSelect.innerHTML = '<option value="">Select Doctor</option>';

    if (doctors[selectedDept]) {
      doctors[selectedDept].forEach(docName => {
        const opt = document.createElement('option');
        opt.value = docName;
        opt.textContent = docName;
        docSelect.appendChild(opt);
      });
    }
  });
}

/* ---- Testimonial Submission ---- */
function initReviewSubmit() {
  const reviewForm = document.getElementById('reviewForm');
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  if (!reviewForm || !testimonialsContainer) return;

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const type = document.getElementById('reviewType').value;
    const rating = parseInt(document.getElementById('reviewRating').value, 10);
    const text = document.getElementById('reviewText').value;

    let starsSvg = '';
    for (let i = 0; i < 5; i++) {
      starsSvg += `
        <svg class="w-4 h-4 ${i < rating ? 'text-[#FFB800]' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      `;
    }

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    const card = document.createElement('article');
    card.className = 'testimonial-card glass-card p-8';
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
      <div class="quote-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      </div>
      <div class="star-rating flex gap-1 mb-4" aria-label="${rating} out of 5 stars">
        ${starsSvg}
      </div>
      <p class="text-gray-600 leading-relaxed mb-6">"${text}"</p>
      <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">${initials}</div>
        <div>
          <p class="font-semibold text-sm">${name}</p>
          <p class="text-gray-400 text-xs">${type}</p>
        </div>
      </div>
    `;

    testimonialsContainer.insertBefore(card, testimonialsContainer.firstChild);

    const btn = reviewForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Review Submitted!';
    btn.classList.add('!bg-green-600');
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('!bg-green-600');
      btn.disabled = false;
      reviewForm.reset();
    }, 2000);
  });
}
