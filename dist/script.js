const bar = document.querySelector('#readingBar');
const links = [...document.querySelectorAll('.topbar nav a')];
const sections = links.filter((link) => link.getAttribute('href').startsWith('#')).map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach((section) => observer.observe(section));
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
