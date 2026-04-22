// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Clock
function updateClock() {
  const now = new Date();
  const dhaka = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));

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

// Social cards animate on scroll
const socialGrid = document.getElementById('socialGrid');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.social-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 80);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (socialGrid) observer.observe(socialGrid);
