document.addEventListener('DOMContentLoaded', () => {
  let currentViewId = 'view-home';
  let activeLinks = [];
  let selectedIndex = 0;
  let userHasInteracted = false; // Tracks if user has used keyboard or mouse

  // Initialize the app
  function init() {
      updateActiveLinks();
      renderSelection();
      setupEventListeners();
  }

  // Fetch the navigation links for the currently visible view
  function updateActiveLinks() {
      const currentView = document.getElementById(currentViewId);
      activeLinks = Array.from(currentView.querySelectorAll('.nav-link'));
      selectedIndex = 0; // Reset selection to the first item
  }

  // Render the highlight/blinking effect based on state
  function renderSelection() {
      // Remove all active/blinking classes first
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active', 'blinking-active');
      });

      if (activeLinks.length === 0) return;

      const targetLink = activeLinks[selectedIndex];

      if (!userHasInteracted) {
          // Initial state: Blinking on the first item
          targetLink.classList.add('blinking-active');
      } else {
          // Solid highlight state after interaction
          targetLink.classList.add('active');
      }
  }

  // Handle switching views
  function navigateTo(targetId) {
      if (targetId === '#' || !targetId) return; // Ignore dummy links

      // Hide current view
      document.getElementById(currentViewId).classList.remove('active-view');
      
      // Show new view
      currentViewId = targetId;
      document.getElementById(currentViewId).classList.add('active-view');
      
      // Keep the 'interaction' state true so it doesn't blink again on new pages
      userHasInteracted = true; 

      updateActiveLinks();
      renderSelection();
  }

  // Setup mouse and keyboard events
  function setupEventListeners() {
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (activeLinks.length === 0) return;

          if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
              userHasInteracted = true; // Stop blinking
              
              if (e.key === 'ArrowDown') {
                  e.preventDefault(); // Prevent page scroll
                  selectedIndex = (selectedIndex + 1) % activeLinks.length;
                  renderSelection();
              } else if (e.key === 'ArrowUp') {
                  e.preventDefault(); // Prevent page scroll
                  selectedIndex = (selectedIndex - 1 + activeLinks.length) % activeLinks.length;
                  renderSelection();
              } else if (e.key === 'Enter') {
                  e.preventDefault();
                  const target = activeLinks[selectedIndex].getAttribute('data-target');
                  navigateTo(target);
              }
          }
      });

      // Mouse interaction for all current and future links (event delegation)
      document.addEventListener('mouseover', (e) => {
          if (e.target.classList.contains('nav-link')) {
              userHasInteracted = true; // Stop blinking
              
              // Find the index of the hovered link within the current view
              const index = activeLinks.indexOf(e.target);
              if (index !== -1) {
                  selectedIndex = index;
                  renderSelection();
              }
          }
      });

      // Mouse click
      document.addEventListener('click', (e) => {
          if (e.target.classList.contains('nav-link')) {
              e.preventDefault();
              userHasInteracted = true;
              const target = e.target.getAttribute('data-target');
              navigateTo(target);
          }
      });
  }

  // Boot the script
  init();
});
