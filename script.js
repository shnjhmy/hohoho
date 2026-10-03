document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
    revealObserver.observe(item);
  });

  const bars = document.querySelectorAll(".bar i");

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      bar.style.width = `${bar.dataset.value}%`;
      barObserver.unobserve(bar);
    });
  }, { threshold: 0.5 });

  bars.forEach((bar) => barObserver.observe(bar));

  document.querySelectorAll(".software-card, .focus-grid article").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotate(${x * -3}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});


  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("#home, #education, #skills, #about, #software, #creative, #contact");
  const updateActiveNav = () => {
    let current = "home";
    sections.forEach((section) => {
      if (window.scrollY + 180 >= section.offsetTop) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", updateActiveNav, {passive:true});
  updateActiveNav();
