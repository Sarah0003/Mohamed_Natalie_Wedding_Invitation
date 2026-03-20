

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


//   // =========================
//   // ✅ VIDEO OBSERVER
//   // =========================
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       const video = entry.target;

//       // 🔥 Ensure iOS compatibility
//       video.muted = true;
//       video.setAttribute("muted", "");
//       video.setAttribute("playsinline", "");
//       video.setAttribute("autoplay", "");

//       // =========================
//       // Lazy-load source (once)
//       // =========================
//       const source = video.querySelector("source");

//       if (source && source.dataset.src && !source.src) {
//         source.src = source.dataset.src;
//         video.load();
//       }

//       // =========================
//       // Play / Pause logic
//       // =========================
//       if (entry.isIntersecting) {
//         const playPromise = video.play();

//         if (playPromise !== undefined) {
//           playPromise.catch(err => {
//             console.log("Autoplay blocked:", err);
//           });
//         }
//       } else {
//         video.pause();
//       }
//     });
//   }, {
//     threshold: 0.1,
//     rootMargin: "300px"
//   });

//   // =========================
//   // Attach observer
//   // =========================
//   document.querySelectorAll('video.lazy-video').forEach(video => {
//     observer.observe(video);
//   });

// });

// // =========================
// // ✅ ADD THIS PART BELOW
// // =========================
// let videosUnlocked = false;

// function unlockVideos() {
//   if (videosUnlocked) return;

//   const videos = document.querySelectorAll("video.lazy-video");

//   videos.forEach(video => {
//     video.muted = true;
//     video.setAttribute("muted", "");
//     video.setAttribute("playsinline", "");

//     const playPromise = video.play();

//     if (playPromise !== undefined) {
//       playPromise
//         .then(() => {
//           video.pause(); // important
//         })
//         .catch(() => {});
//     }
//   });

//   videosUnlocked = true;

//   // remove listeners after first tap
//   document.removeEventListener("touchstart", unlockVideos);
//   document.removeEventListener("click", unlockVideos);
// }

// // listen for first tap
// document.addEventListener("touchstart", unlockVideos, {
//   passive: true
// });
// document.addEventListener("click", unlockVideos);
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
  // ✅ VIDEO OBSERVER (SMART)
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      // iOS safety
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      // =========================
      // Lazy load only when near
      // =========================
      if (entry.isIntersecting) {
        const source = video.querySelector("source");

        if (source && source.dataset.src && !source.src) {
          source.src = source.dataset.src;
          video.load();
        }
      }

      // =========================
      // PLAY when visible enough
      // =========================
      if (entry.intersectionRatio >= 0.3) {

        if (!video.dataset.started) {
          video.dataset.started = "true";

          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }

        } else if (video.paused) {
          video.play().catch(() => {});
        }

      }

      // =========================
      // PAUSE only when FAR away
      // =========================
      if (entry.intersectionRatio < 0.05) {
        video.pause();
      }

    });
  }, {
    threshold: [0, 0.05, 0.3],
    rootMargin: "200px 0px"
  });

  document.querySelectorAll('video.lazy-video').forEach(video => {
    observer.observe(video);
  });

  // =========================
  // ✅ iPhone UNLOCK (once)
  // =========================
  let unlocked = false;

  function unlockVideos() {
    if (unlocked) return;

    const videos = document.querySelectorAll("video.lazy-video");

    videos.forEach(video => {
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause(); // allow observer to control later
          })
          .catch(() => {});
      }
    });

    unlocked = true;

    document.removeEventListener("touchstart", unlockVideos);
    document.removeEventListener("click", unlockVideos);
  }

  document.addEventListener("touchstart", unlockVideos, {
    passive: true
  });
  document.addEventListener("click", unlockVideos);

});