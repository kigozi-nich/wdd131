// Global Variables
const testimonials = [
    {
        id: 1, 
        text: "Our stay at Naran Suites exceeded all expectations. The staff was incredibly attentive and the room was spectacular!",
        author: "Sarah Johnson, New York"
    },
    {
        id: 2,
        text: "The amenities at Naran Suites are unmatched. From the spa to the restaurants, everything was perfect for our anniversary getaway.",
        author: "Michael & Lisa Chen, San Francisco"
    },
    {
        id: 3,
        text: "As a business traveler, I appreciate the efficiency and comfort Naran Suites provides. The high-speed internet and workspace in my room were excellent.",
        author: "James Wilson, London"
    },
    {
        id: 4,
        text: "The attention to detail at this hotel is remarkable. Every aspect of our stay was carefully considered and executed flawlessly.",
        author: "Maria Rodriguez, Madrid"
    }
];

let currentTestimonialIndex = 0;

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Track last visit using localStorage
    trackLastVisit();
    
    // Initialize testimonials if on home page
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (testimonialContainer) {
        displayTestimonials();
        setupTestimonialControls();
    }
    
    // Set up Book Now button event listener if on home page
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBookNow);
    }
    
    // Set up newsletter form submission if on home page
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
});

// Function to track and display last visit using localStorage
function trackLastVisit() {
    const lastVisitElement = document.getElementById('lastVisit');
    if (!lastVisitElement) return;
    
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString();
    
    // Get the last visit date from localStorage
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    
    if (lastVisitDate) {
        // Calculate days between visits
        const daysBetween = calculateDaysBetween(new Date(lastVisitDate), currentDate);
        
        if (daysBetween === 0) {
            lastVisitElement.textContent = "Welcome back today!";
        } else if (daysBetween === 1) {
            lastVisitElement.textContent = "Your last visit was yesterday.";
        } else {
            lastVisitElement.textContent = `Your last visit was ${daysBetween} days ago.`;
        }
    } else {
        lastVisitElement.textContent = "Welcome to your first visit!";
    }
    
    // Update the last visit date in localStorage
    localStorage.setItem('lastVisitDate', currentDateString);
}

// Function to calculate days between two dates
function calculateDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date2 - date1) / oneDay));
    return diffDays;
}

// Function to display testimonials
function displayTestimonials() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (!testimonialContainer) return;
    
    // Clear existing testimonials
    testimonialContainer.innerHTML = '';
    
    // Create and append testimonial elements
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.classList.add('testimonial');
        testimonialElement.style.transform = `translateX(${(index - currentTestimonialIndex) * 100}%)`;
        
        // Use template literals for content
        testimonialElement.innerHTML = `
            <p>${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.author}</p>
        `;
        
        testimonialContainer.appendChild(testimonialElement);
    });
}

// Function to set up testimonial navigation controls
function setupTestimonialControls() {
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (!prevButton || !nextButton) return;
    
    prevButton.addEventListener('click', () => {
        if (currentTestimonialIndex > 0) {
            currentTestimonialIndex--;
            updateTestimonialPosition();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentTestimonialIndex < testimonials.length - 1) {
            currentTestimonialIndex++;
            updateTestimonialPosition();
        }
    });
}

// Function to update testimonial positions
function updateTestimonialPosition() {
    const testimonialElements = document.querySelectorAll('.testimonial');
    
    testimonialElements.forEach((testimonial, index) => {
        testimonial.style.transform = `translateX(${(index - currentTestimonialIndex) * 100}%)`;
    });
}

// Function to handle Book Now button click
function handleBookNow() {
    // Get user preferences from localStorage or set defaults
    const userPreferences = JSON.parse(localStorage.getItem('userBookingPreferences')) || {
        roomType: 'standard',
        guests: 2,
        amenities: ['wifi', 'breakfast']
    };
    
    // Show a modal or redirect based on user preferences
    const preferredRoomType = userPreferences.roomType;
    
    if (preferredRoomType) {
        // Use conditional branching for different room types
        if (preferredRoomType === 'suite') {
            alert(`Welcome back! Would you like to book our luxury suite again for ${userPreferences.guests} guests?`);
        } else if (preferredRoomType === 'deluxe') {
            alert(`Welcome back! Would you like to book our deluxe room again for ${userPreferences.guests} guests?`);
        } else {
            alert(`Welcome back! Would you like to book our standard room again for ${userPreferences.guests} guests?`);
        }
    } else {
        // Redirect to rooms page if no preferences found
        window.location.href = 'rooms.html';
    }
}

// Function to handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const offersChecked = form.offers.checked;
    
    // Create subscriber object
    const subscriber = {
        email: email,
        name: name,
        wantsOffers: offersChecked,
        dateSubscribed: new Date().toISOString()
    };
    
    // Save to localStorage
    // Get existing subscribers or initialize empty array
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    subscribers.