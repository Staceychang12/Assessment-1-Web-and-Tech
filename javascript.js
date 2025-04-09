// Show/hide "Back to Top" button
window.onscroll = function () {
    const btn = document.getElementById("toTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
  
  // Scroll to top
  document.getElementById("toTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
// ALL YOUR EXISTING CODE REMAINS THE SAME

// =======================================
// New Feature 1: Simple Contact Form Validation
// =======================================
function validateContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Only run on pages with the contact form
    
    contactForm.addEventListener('submit', function(event) {
      let valid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const errorMessages = document.getElementById('formErrors');
      
      // Clear previous error messages
      errorMessages.innerHTML = '';
      errorMessages.style.display = 'none';
      
      // Validate name (required)
      if (!nameInput.value.trim()) {
        valid = false;
        const nameError = document.createElement('p');
        nameError.textContent = 'Name is required';
        errorMessages.appendChild(nameError);
        nameInput.classList.add('error-input');
      } else {
        nameInput.classList.remove('error-input');
      }
      
      // Validate email (required and format)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        valid = false;
        const emailError = document.createElement('p');
        emailError.textContent = 'Valid email address is required';
        errorMessages.appendChild(emailError);
        emailInput.classList.add('error-input');
      } else {
        emailInput.classList.remove('error-input');
      }
      
      // Validate message (required)
      if (!messageInput.value.trim()) {
        valid = false;
        const messageError = document.createElement('p');
        messageError.textContent = 'Message is required';
        errorMessages.appendChild(messageError);
        messageInput.classList.add('error-input');
      } else {
        messageInput.classList.remove('error-input');
      }
      
      // Show error messages if validation failed
      if (!valid) {
        event.preventDefault();
        errorMessages.style.display = 'block';
      }
    });
  }
  
  // =======================================
  // New Feature 2: Dark Mode Toggle
  // =======================================
  function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return; // Only run on pages with the toggle button
    
    // Check for saved user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Set initial state
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    
    // Handle toggle changes
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
  
  // =======================================
  // New Feature 3: Scroll Animation for Sections
  // =======================================
  function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, options);
    
    sections.forEach(section => {
      section.classList.add('hidden-section');
      observer.observe(section);
    });
  }
  
  // =======================================
  // New Feature 4: Simple Image Gallery for Beach Photos
  // =======================================
  function setupImageGallery() {
    const galleryContainer = document.getElementById('beachGallery');
    if (!galleryContainer) return; // Only run on pages with gallery
    
    const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbnail');
    const fullImage = document.getElementById('fullImage');
    const imageCaption = document.getElementById('imageCaption');
    
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-full');
        const caption = this.getAttribute('data-caption');
        
        // Apply transition effect
        fullImage.style.opacity = '0';
        
        setTimeout(() => {
          fullImage.src = imgSrc;
          imageCaption.textContent = caption;
          fullImage.style.opacity = '1';
        }, 300);
      });
    });
  }
  
  // =======================================
  // Initialize all interactive features
  // =======================================
  document.addEventListener('DOMContentLoaded', function() {
    // Your existing code here
    
    // New features
    validateContactForm();
    setupDarkModeToggle();
    setupScrollAnimations();
    setupImageGallery();
  });


 
  
