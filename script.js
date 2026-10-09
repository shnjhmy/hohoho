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
  const sections = [...document.querySelectorAll("#home, #education, #skills, #about, #software, #creative, #contact")];

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const updateActiveNav = () => {
    const navOffset = 100;
    const bottomReached =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30;

    // Contact is the final section, so make it active when the page reaches its bottom.
    if (bottomReached) {
      setActiveNav("contact");
      return;
    }

    // Find the section currently closest to the top of the visible content.
    let current = sections[0].id;
    let smallestDistance = Infinity;

    sections.forEach((section) => {
      const distance = Math.abs(section.getBoundingClientRect().top - navOffset);
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.55 && distance < smallestDistance) {
        smallestDistance = distance;
        current = section.id;
      }
    });

    setActiveNav(current);
  };

  // Clicking a navigation item immediately highlights the selected section.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      setActiveNav(id);
    });
  });

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

  // Reliable internal navigation with the sticky/fixed navigation offset.
  document.querySelectorAll('a.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });

  // If the page opens with a section hash, scroll to that section after layout.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveNav(target.id);
        }, 50);
      });
    }
  }


/* Active navigation follows the section visible while scrolling */
document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("#home, #education, #skills, #about, #software, #creative, #contact")];
  const activate = (id) => links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activate(visible.target.id);
  }, { threshold: [0.25, 0.5, 0.75] });
  sections.forEach(section => observer.observe(section));
  links.forEach(link => link.addEventListener("click", () => activate(link.hash.slice(1))));
});
