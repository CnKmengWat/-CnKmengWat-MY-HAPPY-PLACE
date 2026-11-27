
/* ============================================
   NAN CAR GARAGE - Main JavaScript
   ============================================ */

// ---------- 1. Intro screen animation ----------
window.addEventListener("load", function () {
  const intro = document.getElementById("introScreen");
  if (intro) {
    setTimeout(() => intro.classList.add("hide"), 2300);
    setTimeout(() => intro.remove(), 3200);
  }
});

// ---------- 2. Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---------- 3. Mobile menu toggle ----------
function toggleMenu(btn) {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  const isOpen = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen);
}

// ---------- 4. Booking form (Netlify Forms handles submit) ----------
// Netlify Forms works automatically via HTML attributes:
//   method="POST" data-netlify="true" action="/success.html"
// No JS needed. We only add a small UX: disable button while submitting.
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function () {
    const btn = this.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "កំពុងផ្ញើ...";
    }
    // Form will POST to Netlify and redirect to /success.html
  });
}

// ---------- 5. Scroll reveal animations ----------
document.addEventListener("DOMContentLoaded", function () {
  const revealTargets = document.querySelectorAll(
    "main section, .section-head, .service, .project-grid article, .price-list, .price-list div, .booking form, .contact-items, .trust div"
  );

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    if (index % 3 === 1) el.style.transitionDelay = "90ms";
    if (index % 3 === 2) el.style.transitionDelay = "180ms";
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }

  // ---------- 6. Nav link active state + close mobile menu ----------
  const navLinks = document.querySelectorAll('.topbar nav a[href^="#"]');
  const navEl = document.querySelector("nav");
  const menuBtn = document.querySelector(".menu");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      if (navEl) navEl.classList.remove("open");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.classList.remove("is-visible");
        requestAnimationFrame(() => target.classList.add("is-visible"));
      }
    });
  });
});