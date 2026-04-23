// ── NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL TO TOP
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ── CLOCK
function updateClock() {
  const dhaka = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  const h = String(dhaka.getHours()).padStart(2, '0');
  const m = String(dhaka.getMinutes()).padStart(2, '0');
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('clock').textContent = `${h}:${m}`;
  document.getElementById('clock-date').textContent =
    `${days[dhaka.getDay()]}, ${dhaka.getDate()} ${months[dhaka.getMonth()]}`;
}
updateClock();
setInterval(updateClock, 1000);

// ── DARK / LIGHT TOGGLE
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load saved theme
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'ph ph-moon' : 'ph ph-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
});

// ── ENTRANCE ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.s-pill, .p-card, .ms-item, .c-btn').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
