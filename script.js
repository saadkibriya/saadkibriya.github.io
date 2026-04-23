// ── THEME
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'ph ph-moon' : 'ph ph-sun';

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
});

// ── DUAL NAVBAR — appears after scrolling past hero
const dualNavbar = document.getElementById('dualNavbar');
let lastScroll = 0;
let navVisible = false;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  const heroHeight = document.querySelector('.locate-section').offsetHeight;

  if (current > heroHeight * 0.8) {
    // Past hero — show or hide based on direction
    if (current < lastScroll) {
      // Scrolling up — show
      dualNavbar.classList.add('visible');
      dualNavbar.classList.remove('hidden');
      navVisible = true;
    } else {
      // Scrolling down — hide
      dualNavbar.classList.remove('visible');
      dualNavbar.classList.add('hidden');
      navVisible = false;
    }
  } else {
    // Still in hero — always hidden
    dualNavbar.classList.remove('visible');
    dualNavbar.classList.remove('hidden');
    navVisible = false;
  }

  lastScroll = current;
});

// ── SCROLL TO TOP
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ── CLOCK
function updateClock() {
  const dhaka = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const h = String(dhaka.getHours()).padStart(2, '0');
  const m = String(dhaka.getMinutes()).padStart(2, '0');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('clock').textContent = `${h}:${m}`;
  document.getElementById('clock-date').textContent =
    `${days[dhaka.getDay()]}, ${dhaka.getDate()} ${months[dhaka.getMonth()]}`;
}
updateClock();
setInterval(updateClock, 1000);

// ── ENTRANCE ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.p-card, .ms-books, .c-circle').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
