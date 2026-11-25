// navigation
window.addEventListener("DOMContentLoaded", (e) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// progress
const progress = document.querySelector(".progress > div");
window.addEventListener("scroll", (e) => {
  const scrollTop = window.scrollY;
  const hight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / hight) * 100;
  progress.style.width = `${scrollPercent}%`;
});
// active links
const navBarLinks = document.querySelectorAll(".navbar-nav a");
navBarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navBarLinks.forEach((l) => {
      l.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// navigation bar Links Scroll

const sections = [
  ".landing",
  ".about-us",
  ".foods-explore",
  ".testimonials",
  ".questions",
];
sections.forEach((s) => {
  const section = document.querySelector(s);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navBarLinks.forEach((l) => {
            l.classList.remove("active");
          });
          const linkActive = document.querySelector(
            `.navbar-nav a[href='#${entry.target.getAttribute("id")}']`,
          );
          if (linkActive) {
            linkActive.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.5 },
  );
  obs.observe(section);
});
// counter section
const counterSection = document.querySelector(".counters");
const numbersH3 = document.querySelectorAll(".counters h3");
const duration = 1000;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const startTime = performance.now();
        function animation(currTime) {
          const elapsed = currTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          numbersH3.forEach((counter) => {
            const target = Number(counter.dataset.num);
            const currValue = Math.floor(target * progress);
            counter.textContent = `+${currValue}`;
          });
          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        }
        requestAnimationFrame(animation);
        observer.unobserve(counterSection);
      }
    });
  },
  { threshold: 0.5 },
);
observer.observe(counterSection);
