const revealElements = document.querySelectorAll('.reveal, .reveal-photo');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((el) => observer.observe(el));

const countup = document.querySelector('[data-countup]');
if (countup) {
  const endValue = Number(countup.dataset.countup);
  const startValue = 2010;
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || animated) return;
      animated = true;
      const start = performance.now();
      const duration = 800;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(startValue + (endValue - startValue) * progress);
        countup.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  countObserver.observe(countup);
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}
