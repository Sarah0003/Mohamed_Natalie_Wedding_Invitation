   // Set active navigation based on current page
   document.addEventListener("DOMContentLoaded", function () {
     // Get current page filename
     let currentPage = window.location.pathname.split("/").pop();

     // If no specific page (root), default to index.html
     if (currentPage === "" || currentPage === "/") {
       currentPage = "index.html";
     }

     // Get all nav links
     let navLinks = document.querySelectorAll(".nav-link[data-page]");

     // Remove active class from all links
     navLinks.forEach(link => {
       link.classList.remove("active");
     });

     // Add active class to current page link
     navLinks.forEach(link => {
       if (link.getAttribute("data-page") === currentPage) {
         link.classList.add("active");
       }
     });

     // Lazy video loading
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
           observer.unobserve(video);
         }
       });
     });

     lazyVideos.forEach(video => {
       observer.observe(video);
     });
   });
   