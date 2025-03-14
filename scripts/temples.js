// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.getElementById('primary-nav');
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        this.textContent = '☰';
        this.setAttribute('aria-expanded', 'false');
    } else {
        nav.classList.add('show');
        this.textContent = '✕';
        this.setAttribute('aria-expanded', 'true');
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('primary-nav');
    const hamburger = document.getElementById('hamburger');
    
    if (nav.classList.contains('show') && 
        !nav.contains(event.target) && 
        event.target !== hamburger) {
        nav.classList.remove('show');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Prevent menu from closing when clicking inside it
document.getElementById('primary-nav').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Footer dynamic year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Last modified date
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

const formattedDate = new Date(document.lastModified).toLocaleDateString('en-US', options);
document.getElementById('lastModified').textContent = `Last Modified: ${formattedDate}`;

// Add active class to current page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call the function when the page loads
window.addEventListener('load', setActiveLink);