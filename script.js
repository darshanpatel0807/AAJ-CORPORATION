// ---------- Mobile menu ----------
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ---------- Header shadow on scroll ----------
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Active nav link ----------
const links = [...nav.querySelectorAll('a:not(.btn)')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

// ---------- "Request quote" links pre-select the product ----------
const select = document.getElementById('productSelect');
document.querySelectorAll('[data-product]').forEach(el => {
  el.addEventListener('click', () => {
    if (el.getAttribute('href') === '#contact') select.value = el.dataset.product;
  });
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Quote form: sends details to WhatsApp (no backend needed) ----------
const form = document.getElementById('rfq');
const err = document.getElementById('formError');
form.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  if (!f.get('name').trim() || !f.get('phone').trim()) { err.hidden = false; return; }
  err.hidden = true;
  const line = (label, key) => f.get(key).trim() ? `*${label}:* ${f.get(key).trim()}\n` : '';
  const text =
    'Hello AAJ Corporation, I would like a quotation.\n\n' +
    line('Name', 'name') + line('Company', 'company') + line('Phone', 'phone') +
    line('Email', 'email') + line('Product', 'product') + line('Quantity', 'quantity') +
    line('Specification', 'message');
  window.open(`https://wa.me/919427422105?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.pillar, .product, .industry, .step, .contact-cards li, .rfq, .about-visual, .facts');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}
