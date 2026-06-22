// ==============================
// Fade-in on scroll
// ==============================
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .detail-card:nth-child(1) { transition-delay: 0s; }
  .detail-card:nth-child(4) { transition-delay: 0.12s; }
`;
document.head.appendChild(fadeStyle);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.detail-card, .message .container, .parents .container, .contact .container, .rsvp .container, #countdown'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ==============================
// Baby photo fallback (moved from inline onerror)
// ==============================
const babyPhoto = document.getElementById('baby-photo');
const photoPlaceholder = document.getElementById('photo-placeholder');

if (babyPhoto && photoPlaceholder) {
  babyPhoto.addEventListener('error', () => {
    babyPhoto.style.display = 'none';
    photoPlaceholder.style.display = 'flex';
  });
}

// ==============================
// Countdown timer
// ==============================
(function initCountdown() {
  // Event: July 5, 2026 at 9:00 AM Philippine Time (UTC+8)
  const EVENT_DATE = new Date('2026-07-05T09:00:00+08:00');

  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');
  const cdContainer = document.getElementById('countdown');

  if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

  function pad(n) {
    return String(Math.floor(n)).padStart(2, '0');
  }

  function tick(el, newVal) {
    if (el.textContent !== newVal) {
      el.textContent = newVal;
      el.classList.remove('tick');
      // Force reflow so animation replays
      void el.offsetWidth;
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 300);
    }
  }

  function update() {
    const now  = Date.now();
    const diff = EVENT_DATE.getTime() - now;

    if (diff <= 0) {
      cdContainer.innerHTML = '<p class="countdown-done">Blessed Day Is Here! ✝</p>';
      return;
    }

    const totalSecs = Math.floor(diff / 1000);
    const days  = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins  = Math.floor((totalSecs % 3600) / 60);
    const secs  = totalSecs % 60;

    tick(cdDays,  pad(days));
    tick(cdHours, pad(hours));
    tick(cdMins,  pad(mins));
    tick(cdSecs,  pad(secs));
  }

  update();
  setInterval(update, 1000);
})();
