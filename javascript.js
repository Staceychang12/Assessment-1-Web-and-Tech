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

    // =======================================
    // RPS
    // =======================================
    // Game state
let playerScoreCount = 0;
let computerScoreCount = 0;

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Cache DOM elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('navMenu');
  const toTopBtn = document.getElementById('toTopBtn');
  const resultDiv = document.getElementById('result');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  console.log('Element check:', {
    menuToggle: !!menuToggle,
    navMenu: !!navMenu,
    toTopBtn: !!toTopBtn,
    resultDiv: !!resultDiv,
    playAgainBtn: !!playAgainBtn,
    playerScoreElement: !!playerScoreElement,
    computerScoreElement: !!computerScoreElement
  });
  
  // Initialize scores from localStorage if available
  try {
    const savedPlayerScore = localStorage.getItem('rpsPlayerScore');
    const savedComputerScore = localStorage.getItem('rpsComputerScore');
    
    if (savedPlayerScore && playerScoreElement) {
      playerScoreCount = parseInt(savedPlayerScore);
      playerScoreElement.textContent = playerScoreCount;
    }
    
    if (savedComputerScore && computerScoreElement) {
      computerScoreCount = parseInt(savedComputerScore);
      computerScoreElement.textContent = computerScoreCount;
    }
  } catch (error) {
    console.error('Error loading scores from localStorage:', error);
  }
  
  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
  
  // Back to top button functionality
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        toTopBtn.classList.add('visible');
      } else {
        toTopBtn.classList.remove('visible');
      }
    });
    
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Dark mode toggle
  if (darkModeToggle) {
    // Check if user has previously set dark mode
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
  
  // Set up play again button
  if (playAgainBtn) {
    console.log('Setting up Play Again button');
    playAgainBtn.addEventListener('click', function() {
      console.log('Play Again clicked!');
      // Reset scores to zero
      playerScoreCount = 0;
      computerScoreCount = 0;
      updateScores();
      
      // Clear the result text
      if (resultDiv) {
        resultDiv.textContent = "Game reset! Choose Rock, Paper, or Scissors to start.";
      }
      
      // Apply animation to score boxes
      const scoreBoxes = document.querySelectorAll('.score-box');
      scoreBoxes.forEach(box => {
        box.classList.add('score-reset');
        setTimeout(() => box.classList.remove('score-reset'), 500);
      });
    });
  } else {
    console.error('Play Again button not found in the DOM');
  }
});

// Helper function to capitalize first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Update score display and save to localStorage
function updateScores() {
  const playerScoreElement = document.getElementById('playerScore');
  const computerScoreElement = document.getElementById('computerScore');
  
  if (playerScoreElement) {
    playerScoreElement.textContent = playerScoreCount;
  }
  
  if (computerScoreElement) {
    computerScoreElement.textContent = computerScoreCount;
  }
  
  try {
    // Save scores to localStorage for persistence
    localStorage.setItem('rpsPlayerScore', playerScoreCount);
    localStorage.setItem('rpsComputerScore', computerScoreCount);
  } catch (error) {
    console.error('Error saving scores to localStorage:', error);
  }
}

// Main game logic - this needs to be a global function since it's called from onclick
function play(userChoice) {
  console.log('Play function called with choice:', userChoice);
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const resultDiv = document.getElementById('result');
  const playAgainBtn = document.getElementById('playAgainBtn');
  
  if (!resultDiv) {
    console.error('Result div not found');
    return;
  }
  
  let result = '';

  if (userChoice === computerChoice) {
    result = `🤝 Draw! We both chose ${userChoice}.`;
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = `🎉 You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}!`;
    playerScoreCount++;
  } else {
    result = `💀 You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}.`;
    computerScoreCount++;
  }

  // Update scores
  updateScores();

  // Display result
  resultDiv.textContent = result;

  // Add animation to result (if you have a pop class)
  resultDiv.classList.remove("pop");
  void resultDiv.offsetWidth; // Force reflow
  resultDiv.classList.add("pop");

  // Show "Play Again" button - MAKE SURE IT'S VISIBLE
  if (playAgainBtn) {
    console.log('Making Play Again button visible');
    playAgainBtn.style.display = "inline-block";
  } else {
    console.error('Play Again button not found when trying to show it');
  }

  // Try speech synthesis
  try {
    if (window.speechSynthesis) {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(result);
      utter.volume = 0.7;
      synth.speak(utter);
    }
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
}

// Added additional function to reset scores if needed
function resetScores() {
  playerScoreCount = 0;
  computerScoreCount = 0;
  updateScores();
  
  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.textContent = "Scores reset! Choose Rock, Paper, or Scissors to start a new game.";
  }
  
  const scoreBoxes = document.querySelectorAll('.score-box');
  scoreBoxes.forEach(box => {
    box.classList.add('score-reset');
    setTimeout(() => box.classList.remove('score-reset'), 500);
  });
}

    // =======================================
    // Flatland Business Advisor Functionality
    // =======================================
  /* Name: script.js
    Author: Stacey Chang Wai Ling
    Description: Add basic behaviour to Flatland
    Version: 1.0
  */

  // Find elements in DOM tree once the document is loaded
  document.addEventListener('DOMContentLoaded', function() {
    const square = document.getElementById('square');
    const words = document.getElementById('words');
    
    // Only run code if we're on a page with these elements
    if (square && words) {
        // Display initial greeting
        greeting();
        
        // Add event listeners to square
        square.addEventListener('click', function() {
            // Change color and display buzzword phrase
            changeColour('#c8685d');
            words.innerHTML = createBuzzwordPhrase();
        });
        
        square.addEventListener('mouseover', function() {
            changeColour('#4CAF50');
        });
        
        square.addEventListener('mouseout', function() {
            changeColour('#389098');
        });
        
        // Initialize square color
        changeColour('#389098');
    }
  });

  // Function to change the color of the square
  function changeColour(color) {
    const square = document.getElementById('square');
    if (square) {
        square.style.backgroundColor = color;
    }
  }

  // Function to display initial greeting
  function greeting() {
    const words = document.getElementById('words');
    if (words) {
        words.innerHTML = "Welcome to Flatland.<br> I am Square.<br>Click me for business advice.";
    }
  }

  // Function to create a random buzzword phrase
  function createBuzzwordPhrase() {
    let buzz = ["Paradigm-changing", "Multi-tier", "10,000-foot", "Agile", "Customer", "Win-win"];
    let action = ["empowered", "value-added", "synergy", "creative", "oriented", "focused", "aligned"];
    let outcome = ["process", "deliverable", "solution", "tipping-point", "strategy", "vision"];
    
    let idx_buz = Math.floor(Math.random() * buzz.length);
    let idx_act = Math.floor(Math.random() * action.length);
    let idx_out = Math.floor(Math.random() * outcome.length);
    
    return buzz[idx_buz] + " " + action[idx_act] + " " + outcome[idx_out];
  }


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
      // Mobile menu toggle
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.getElementById('navMenu');
      const navUl = document.querySelector('nav ul');
      
      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
          navMenu.classList.toggle('show');
          navUl.classList.toggle('show');
        });
      }
      
      // Highlight active navigation item
      const currentPage = window.location.pathname.split('/').pop();
      const navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      
      // New features
      validateContactForm();
      setupDarkModeToggle();
      setupScrollAnimations();
      setupImageGallery();
    });

    // =======================================

  // RSS Reader Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const feedSelector = document.getElementById('feed-selector');
    const contentDiv = document.getElementById('content');
    const loadingIndicator = document.getElementById('loading');
    const errorMessageContainer = document.getElementById('error-message');

    // Hide loading indicator initially
    loadingIndicator.style.display = 'none';

    // Event listener for feed selector
    feedSelector.addEventListener('change', function() {
      loadFeed(this.value);
    });

    // Load default feed on page load
    loadFeed(feedSelector.value);

    /**
     * Function to fetch and display feed data
     * @param {string} feedUrl - URL of the RSS feed to fetch
     */
    function loadFeed(feedUrl) {
      // Show loading indicator
      contentDiv.innerHTML = '';
      errorMessageContainer.innerHTML = '';
      loadingIndicator.style.display = 'flex';

      // Use a proxy service to avoid CORS issues and convert XML to JSON
      const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);

      fetch(proxyUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Hide loading indicator
          loadingIndicator.style.display = 'none';

          // Check if the feed was successfully parsed
          if (data.status !== 'ok') {
            throw new Error('Feed could not be parsed');
          }

          // Update the content div with the fetched articles
          displayArticles(data.items, data.feed.title);
        })
        .catch(error => {
          // Hide loading indicator
          loadingIndicator.style.display = 'none';

          // Display error message
          console.error('Error:', error);
          errorMessageContainer.innerHTML = `
            <div class="error-message">
              <h3>Unable to load the feed</h3>
              <p>There was a problem retrieving the selected feed. Please try again later or select a different feed.</p>
              <p>Error details: ${error.message}</p>
            </div>
          `;
        });
    }

    /**
     * Function to display articles with title and summary
     * @param {Array} articles - Array of article objects from the feed
     * @param {string} feedTitle - Title of the feed
     */
    function displayArticles(articles, feedTitle) {
      // Clear previous content
      contentDiv.innerHTML = '';

      // Create feed header
      const feedHeader = document.createElement('div');
      feedHeader.className = 'feed-header';
      feedHeader.innerHTML = `<h2>${feedTitle}</h2>`;
      contentDiv.appendChild(feedHeader);

      if (!articles || articles.length === 0) {
        contentDiv.innerHTML += '<div class="no-articles">No articles found in this feed.</div>';
        return;
      }

      // Create article container
      const articlesContainer = document.createElement('div');
      articlesContainer.className = 'articles-container';

      // Loop through articles and create a formatted block for each
      articles.forEach(article => {
        // Create publication date object
        const pubDate = new Date(article.pubDate);
        const formattedDate = pubDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        // Create an article element
        const articleEl = document.createElement('article');
        articleEl.className = 'feed-article';

        // Get description/content and clean it
        let description = article.description || article.content || 'No description available';
        
        // Create a temporary element to parse HTML and extract text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        // Get text content only (no HTML tags)
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        // Limit description length
        const shortDescription = textContent.length > 200 ? 
          textContent.substring(0, 200) + '...' : 
          textContent;

        // Insert article content
        articleEl.innerHTML = `
          <h3 class="article-title">
            <a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>
          </h3>
          <div class="article-meta">
            <span class="article-date">${formattedDate}</span>
          </div>
          <p class="article-description">${shortDescription}</p>
          <a href="${article.link}" class="read-more" target="_blank" rel="noopener noreferrer">Read more</a>
        `;

        articlesContainer.appendChild(articleEl);
      });

      contentDiv.appendChild(articlesContainer);
    }
  });



