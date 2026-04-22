// Clock
function updateClock() {
  const now = new Date();
  const dhaka = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));

  const h = String(dhaka.getHours()).padStart(2, '0');
  const m = String(dhaka.getMinutes()).padStart(2, '0');

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const dayName = days[dhaka.getDay()];
  const date = dhaka.getDate();
  const month = months[dhaka.getMonth()];

  document.getElementById('clock').textContent = `${h}:${m}`;
  document.getElementById('clock-date').textContent = `${dayName}, ${date} ${month}`;
}

updateClock();
setInterval(updateClock, 1000);
