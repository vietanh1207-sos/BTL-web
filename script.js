// Handle navigation tab switching
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = link.getAttribute('data-tab');
    showTab(tabName);
    
    // Update active link
    document.querySelectorAll('#navbar a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// Show section tab
function showTab(tabName) {
  // Hide all sections
  document.querySelectorAll('main > section').forEach(section => {
    section.classList.remove('show');
  });
  
  // Show selected section
  const activeSection = document.getElementById(tabName);
  if (activeSection) {
    activeSection.classList.add('show');
    
    // Initialize tab buttons if in course section
    if (tabName === 'course') {
      initializeCourseTabs();
    }
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize course tabs
function initializeCourseTabs() {
  const tabButtons = document.querySelectorAll('.tab-title');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const paneId = button.getAttribute('data-pane');
      
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Hide all content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('show');
      });
      
      // Add active to clicked button
      button.classList.add('active');
      
      // Show selected content
      const tabContent = document.getElementById('tab-' + paneId);
      if (tabContent) {
        tabContent.classList.add('show');
      }
    });
  });
}

// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const course = document.getElementById('course-select').value;
  const message = document.getElementById('message').value;
  
  // Validate
  if (!name || !email || !phone || !course) {
    alert('Vui lòng điền đầy đủ các trường bắt buộc!');
    return;
  }
  
  // Show success message
  const msgDiv = document.getElementById('msg');
  msgDiv.style.display = 'block';
  
  // Reset form
  document.getElementById('register-form').reset();
  
  // Hide message after 3 seconds
  setTimeout(() => {
    msgDiv.style.display = 'none';
  }, 3000);
  
  // Log data (in real application, send to server)
  console.log({
    name,
    email,
    phone,
    course,
    message
  });
});

// Handle comment form submission
document.getElementById('comment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const commentInput = document.getElementById('comment-input');
  const commentText = commentInput.value.trim();
  
  if (!commentText) {
    alert('Vui lòng nhập bình luận!');
    return;
  }
  
  // Create new comment element
  const newComment = document.createElement('div');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <strong>Bạn:</strong>
    <div class="comment-text">${escapeHtml(commentText)}</div>
  `;
  
  // Insert new comment at the beginning
  const commentsList = document.getElementById('comments-list');
  commentsList.insertBefore(newComment, commentsList.firstChild);
  
  // Clear input
  commentInput.value = '';
  
  // Show confirmation
  alert('Cảm ơn bạn đã bình luận!');
});

// Utility function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && !href.startsWith('#tab')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Add scroll animations to elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards, course cards, etc.
document.querySelectorAll('.feature-card, .course-card, .gallery figure, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
  const navbar = document.querySelector('nav');
  navbar.classList.toggle('mobile-open');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set home as default active tab
  document.querySelector('[data-tab="home"]').classList.add('active');
  
  // Initialize course tabs when page loads
  initializeCourseTabs();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Press '1' for home, '2' for courses, '3' for community
  if (e.key === '1') showTab('home');
  if (e.key === '2') showTab('course');
  if (e.key === '3') showTab('community');
});

// Prevent right-click on demo (optional, can be removed)
document.addEventListener('contextmenu', (e) => {
  // Allow context menu, just logging
  console.log('Context menu accessed');
});
