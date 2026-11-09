// ===== Settings (edit these) =====
const WHATSAPP = "";                               // e.g. "919876543210" (country code + number)
const EMAIL = "Amritlifecareayurveda@gmail.com";

// ===== Header shadow on scroll =====
const hdr = document.getElementById('hdr');
addEventListener('scroll', () => hdr.classList.toggle('on', scrollY > 10), { passive: true });

// ===== Scroll reveal =====
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 100 + 'ms';
  io.observe(el);
});

// ===== Cursor glow + card spotlight =====
const glow = document.querySelector('.glow');
addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX - 210}px, ${e.clientY - 210}px)`;
}, { passive: true });
document.querySelectorAll('.spot').forEach(c => c.addEventListener('mousemove', e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', e.clientX - r.left + 'px');
  c.style.setProperty('--my', e.clientY - r.top + 'px');
}));

// ===== 3D tilt on hover (desktop) =====
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

// ===== Falling leaves in hero =====
const lv = document.getElementById('leaves');
if (lv && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('span');
    s.textContent = '🍃';
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 14 + Math.random() * 18 + 'px';
    s.style.animationDuration = 9 + Math.random() * 10 + 's';
    s.style.animationDelay = -Math.random() * 15 + 's';
    lv.appendChild(s);
  }
}

// ===== Countdown (resets daily at midnight) =====
const pad = n => String(n).padStart(2, '0');
const $ = id => document.getElementById(id);
function tick() {
  const now = new Date(), end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const d = end - now;
  $('h').textContent = pad(Math.floor(d / 36e5));
  $('m').textContent = pad(Math.floor(d % 36e5 / 6e4));
  $('s').textContent = pad(Math.floor(d % 6e4 / 1e3));
}
tick(); setInterval(tick, 1000);

// ===== Order form =====
$('form').addEventListener('submit', e => {
  e.preventDefault();
  const n = $('name').value.trim(), p = $('phone').value.trim(), a = $('addr').value.trim(), m = $('msg');
  if (!n || !/^[6-9]\d{9}$/.test(p) || !a) {
    m.style.color = '#b3261e';
    m.textContent = 'Please enter your name, a valid 10-digit mobile number and your address.';
    return;
  }
  const text = `New Order - The Thor Power Combo (Rs 2500)\nName: ${n}\nMobile: ${p}\nAddress: ${a}`;
  m.style.color = ''; m.textContent = 'Thank you! Opening your order message...';
  if (typeof gtag === 'function') gtag('event', 'conversion_lead'); // Google Ads hook
  location.href = WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent('New Order - The Thor Power Combo')}&body=${encodeURIComponent(text)}`;
});
