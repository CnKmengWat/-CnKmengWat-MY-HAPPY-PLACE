
// បង្ហាញ Logo animation ពេលអ្នកចូល Website ហើយបិទដោយស្វ័យប្រវត្តិ
window.addEventListener("load", function () {
  const intro = document.getElementById("introScreen");
  if (intro) {
    window.setTimeout(() => intro.classList.add("hide"), 2300);
    window.setTimeout(() => intro.remove(), 3200);
  }
});

// ប្តូរ USERNAME ខាងក្រោមទៅជា Telegram username របស់ហាង ដោយមិនដាក់ @
const TELEGRAM_USERNAME = "nangamerkh";
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const f = new FormData(this);
  const message = [
    "ការកក់ជួសជុល - NAN CAR GARAGE",
    "ឈ្មោះ៖ " + f.get("name"),
    "លេខទូរស័ព្ទ៖ " + f.get("phone"),
    "រថយន្ត៖ " + f.get("car"),
    "ថ្ងៃណាត់៖ " + f.get("date"),
    "សេវាកម្ម៖ " + f.get("service"),
    "បញ្ហាបន្ថែម៖ " + (f.get("details") || "មិនមាន")
  ].join("\\n");
  const recipient = "lonjamnan050@gmail.com";
  const subject = encodeURIComponent("ការកក់ពេលជួសជុល - NAN CAR GARAGE");
  const body = encodeURIComponent(message);
  window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
});

// ចលនាបង្ហាញផ្នែក និងធាតុទាំងអស់ពេលរមូរ ឬចុចម៉ឺនុយ
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

  const navLinks = document.querySelectorAll('.topbar nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
      document.querySelector("nav").classList.remove("open");
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.classList.remove("is-visible");
        requestAnimationFrame(() => target.classList.add("is-visible"));
      }
    });
  });
});
