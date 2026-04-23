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

// ── DUAL NAVBAR
const dualNavbar = document.getElementById('dualNavbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  const heroHeight = document.querySelector('.locate-section').offsetHeight;

  if (current > heroHeight * 0.75) {
    if (current < lastScroll) {
      dualNavbar.classList.add('visible');
      dualNavbar.classList.remove('hidden');
    } else {
      dualNavbar.classList.remove('visible');
      dualNavbar.classList.add('hidden');
    }
  } else {
    dualNavbar.classList.remove('visible');
    dualNavbar.classList.remove('hidden');
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

// ── WEATHER (Open-Meteo, no API key)
async function fetchWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true'
    );
    const data = await res.json();
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;
    const descs = {
      0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
      45:'Foggy', 48:'Foggy', 51:'Light drizzle', 53:'Drizzle',
      55:'Heavy drizzle', 61:'Light rain', 63:'Rain', 65:'Heavy rain',
      71:'Light snow', 73:'Snow', 75:'Heavy snow', 80:'Showers',
      81:'Showers', 82:'Heavy showers', 95:'Thunderstorm', 96:'Thunderstorm'
    };
    document.getElementById('weatherVal').textContent = `${temp}°C`;
    document.getElementById('weatherDesc').textContent = descs[code] || 'Clear';
  } catch {
    document.getElementById('weatherVal').textContent = '--°C';
    document.getElementById('weatherDesc').textContent = 'unavailable';
  }
}
fetchWeather();

// ── MOON PHASE
function getMoonPhase() {
  const now = new Date();
  const known = new Date(2000, 0, 6);
  const diff = (now - known) / (1000 * 60 * 60 * 24);
  const cycle = 29.53058867;
  const phase = ((diff % cycle) + cycle) % cycle;
  const phases = [
    { max: 1.85,  emoji: '🌑', name: 'New Moon' },
    { max: 7.38,  emoji: '🌒', name: 'Waxing Crescent' },
    { max: 9.22,  emoji: '🌓', name: 'First Quarter' },
    { max: 14.77, emoji: '🌔', name: 'Waxing Gibbous' },
    { max: 16.61, emoji: '🌕', name: 'Full Moon' },
    { max: 22.15, emoji: '🌖', name: 'Waning Gibbous' },
    { max: 23.99, emoji: '🌗', name: 'Last Quarter' },
    { max: 29.53, emoji: '🌘', name: 'Waning Crescent' },
  ];
  const p = phases.find(p => phase < p.max) || phases[0];
  document.getElementById('moonEmoji').textContent = p.emoji;
  document.getElementById('moonName').textContent = p.name;
}
getMoonPhase();

// ── DAYS LEFT THIS YEAR
function daysLeftThisYear() {
  const now = new Date();
  const end = new Date(now.getFullYear(), 11, 31);
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  document.getElementById('daysLeft').textContent = diff;
  document.getElementById('currentYear').textContent = now.getFullYear();
}
daysLeftThisYear();

// ── JOKES (clean, family-friendly)
const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.",
  "Why was the math book sad? It had too many problems.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java developers wear glasses? Because they don't C#.",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "How do you comfort a JavaScript bug? You console it.",
  "Why did the developer go broke? Because he used up all his cache.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "What's a computer's favorite snack? Microchips.",
  "Why do engineers hate nature? It has too many bugs.",
  "A photon checks into a hotel. The bellhop asks 'Can I help you with your luggage?' The photon replies 'No thanks, I'm traveling light.'",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why can't you give Elsa a balloon? She'll let it go.",
  "I'm reading a book on anti-gravity. It's impossible to put down.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I used to hate facial hair but then it grew on me.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "I asked the librarian if they had books about paranoia. She whispered: 'They're right behind you.'",
];

let jokeIndex = Math.floor(Math.random() * jokes.length);

function showJoke() {
  document.getElementById('jokeText').textContent = jokes[jokeIndex];
  jokeIndex = (jokeIndex + 1) % jokes.length;
}

showJoke();
document.getElementById('jokeBtn').addEventListener('click', showJoke);

// ── ENTRANCE ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.p-card, .ms-card, .c-circle').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
