document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // ✅ NAVBAR ACTIVE LOGIC
  // =========================
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  let navLinks = document.querySelectorAll(".nav-link[data-page]");

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    }
  });

  // =========================
  // ✅ VIDEO LAZY LOAD + PLAY
  // =========================
  let lazyVideos = document.querySelectorAll("video.lazy-video");

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let video = entry.target;
        let source = video.querySelector("source");

        if (source.dataset.src) {
          source.src = source.dataset.src;
          video.load();
        }

        // 👉 force play (important for iPhone)
        video.play().catch(() => {});

        observer.unobserve(video);
      }
    });
  });

  lazyVideos.forEach(video => {
    observer.observe(video);
  });

});