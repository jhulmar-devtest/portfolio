(function () {
  "use strict";

  var navbar = document.querySelector(".navbar");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navbarMenu");
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".navbar_link")
  );

  /* Mobile menu */
  function setMenu(open) {
    menu.classList.toggle("is_open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* Border under the navbar once the page scrolls */
  function onScroll() {
    navbar.classList.toggle("is_scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Highlight the nav link for the section on screen */
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is_active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* Copy email to clipboard */
  var copyBtn = document.getElementById("copyEmail");
  var emailLink = document.getElementById("emailLink");
  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", function () {
      var address = emailLink.getAttribute("href").replace("mailto:", "");
      var done = function () {
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("is_copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("is_copied");
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done);
      }
    });
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
