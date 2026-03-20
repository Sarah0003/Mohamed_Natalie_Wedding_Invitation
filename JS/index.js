// document.addEventListener("DOMContentLoaded", function () {

//   // =========================
//   // ✅ NAVBAR ACTIVE LOGIC
//   // =========================
//   let currentPage = window.location.pathname.split("/").pop();

//   if (currentPage === "" || currentPage === "/") {
//     currentPage = "index.html";
//   }

//   let navLinks = document.querySelectorAll(".nav-link[data-page]");

//   navLinks.forEach(link => {
//     link.classList.remove("active");

//     if (link.getAttribute("data-page") === currentPage) {
//       link.classList.add("active");
//     }
//   });



// });

// let observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     const video = entry.target;

//     // Lazy-load source only once
//     const source = video.querySelector("source");
//     if (source && source.dataset.src && !source.src) {
//       source.src = source.dataset.src;
//       video.load(); // Important: reload after setting src
//     }

//     if (entry.isIntersecting) {
//       // Try to play – catch silently (common on iOS)
//       const playPromise = video.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(err => {
//           console.log("Play prevented:", err); // usually NotAllowedError
//         });
//       }
//     } else {
//       video.pause();
//     }
//   });
// }, {
// threshold: 0.1,
//   rootMargin: "200px" // optional: tweak if videos are near edges
// });

// // Attach observer to all lazy-videos
// document.querySelectorAll('video.lazy-video').forEach(video => {
//   observer.observe(video);
// });

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
  // ✅ VIDEO OBSERVER
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      // 🔥 Ensure iOS compatibility
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("autoplay", "");

      // =========================
      // Lazy-load source (once)
      // =========================
      const source = video.querySelector("source");

      if (source && source.dataset.src && !source.src) {
        source.src = source.dataset.src;
        video.load();
      }

      // =========================
      // Play / Pause logic
      // =========================
      if (entry.isIntersecting) {
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Autoplay blocked:", err);
          });
        }
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "500px"
  });

  // =========================
  // Attach observer
  // =========================
  document.querySelectorAll('video.lazy-video').forEach(video => {
    observer.observe(video);
  });

});