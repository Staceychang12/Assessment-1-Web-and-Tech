// Ensure the script runs after the page is fully loaded
window.onload = function () {
    const btn = document.getElementById("toTopBtn");
  
    // Show/hide "Back to Top" button
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    };
  
    // Scroll to top
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };
  