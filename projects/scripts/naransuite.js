/**
 * Naran Suites and Hotel International Limited
 * Main JavaScript file for all pages
 */

// Define main object to avoid global namespace pollution
const NaranSuites = {
    // Store common data
    data: {
        testimonials: [
            {
                text: "Our stay at Naran Suites was nothing short of exceptional. The staff anticipated our every need and the accommodations were luxurious.",
                author: "Michael J., New York"
            },
            {
                text: "The attention to detail at Naran Suites is remarkable. From the welcome amenities to the turndown service, everything was perfect.",
                author: "Sarah T., London"
            },
            {
                text: "I've stayed in many luxury hotels, but Naran Suites truly stands out. The personalized service made our anniversary truly special.",
                author: "David & Emma R., Sydney"
            },
            {
                text: "The culinary experience at Naran Suites is world-class. The chef's tasting menu was a highlight of our entire vacation.",
                author: "Priya M., Mumbai"
            }
        ],
        values: [
            {
                title: "Excellence",
                description: "We strive for excellence in every detail of our service and accommodations."
            },
            {
                title: "Personalization",
                description: "We believe in creating unique experiences tailored to each guest's preferences."
            },
            {
                title: "Cultural Appreciation",
                description: "We embrace and celebrate local culture in each of our properties around the world."
            },
            {
                title: "Sustainability",
                description: "We are committed to sustainable practices that protect the environment and support local communities."
            }
        ],
        rooms: [
            {
                type: "standard",
                name: "Standard Room",
                price: 200,
                capacity: 2,
                description: "Comfortable and elegant room with modern amenities.",
                features: ["King-size bed", "High-speed Wi-Fi", "Smart TV", "Premium toiletries"],
                image: "images/standard_room.jpg"
            },
            {
                type: "deluxe",
                name: "Deluxe Room",
                price: 350,
                capacity: 2,
                description: "Spacious room with upgraded amenities and city views.",
                features: ["King-size bed", "Sitting area", "Premium toiletries", "Minibar", "Workspace"],
                image: "images/deluxe_room.jpg"
            },
            {
                type: "suite",
                name: "Executive Suite",
                price: 550,
                capacity: 3,
                description: "Luxurious suite with separate living room and premium amenities.",
                features: ["King-size bed", "Separate living area", "Private balcony", "Premium toiletries", "Espresso machine"],
                image: "images/executive_suite.jpg"
            },
            {
                type: "presidential",
                name: "Presidential Suite",
                price: 1200,
                capacity: 4,
                description: "Our most exclusive accommodation with panoramic views and luxury finishes.",
                features: ["Master bedroom", "Dining room", "Living room", "Private terrace", "Butler service", "Complimentary minibar"],
                image: "images/presidential_suite.jpg"
            }
        ],
        faqs: [
            {
                question: "What are your check-in and check-out times?",
                answer: "Check-in time is 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability."
            },
            {
                question: "Do you offer airport transfers?",
                answer: "Yes, we offer airport transfer services for our guests. Please contact our concierge at least 24 hours in advance to arrange transportation."
            },
            {
                question: "Is breakfast included in the room rate?",
                answer: "Breakfast is included with all suites and can be added to standard and deluxe rooms for an additional fee. We offer both buffet and à la carte options."
            },
            {
                question: "Do you have parking facilities?",
                answer: "Yes, we offer both self-parking and valet parking services. Valet parking is complimentary for suite guests."
            }
        ],
        transportation: [
            {
                name: "Hotel Shuttle",
                description: "Complimentary for all guests, runs every hour to major attractions.",
                schedule: "7:00 AM - 10:00 PM"
            },
            {
                name: "Taxi Service",
                description: "Available 24/7, can be arranged by our concierge.",
                contact: "Dial 0 from your room"
            },
            {
                name: "Luxury Car Rental",
                description: "Premium vehicles available for daily or weekly rental.",
                contact: "Concierge desk"
            }
        ]
    },
    
    // Element references to be filled on page load
    elements: {},
    
    // Current page tracker
    currentPage: "",
    
    // Current testimonial/slide index
    currentIndex: 0,
    
    // Initialize the application
    init: function() {
        // Set current page based on active navigation link
        const activeNavLink = document.querySelector('nav a.active');
        if (activeNavLink) {
            this.currentPage = activeNavLink.getAttribute('href').split('.')[0];
        }
        
        // Common functionality for all pages
        this.setupCommonElements();
        this.handleLastVisit();
        this.setupBackToTop();
        
        // Page-specific initialization
        switch (this.currentPage) {
            case "index":
                this.initHomePage();
                break;
            case "about":
                this.initAboutPage();
                break;
            case "rooms":
                this.initRoomsPage();
                break;
            case "contact":
                this.initContactPage();
                break;
        }
        
        console.log(`Initialized NaranSuites script for ${this.currentPage} page`);
    },
    
    // Setup common elements used across all pages
    setupCommonElements: function() {
        // Back to top button
        this.elements.backToTopBtn = document.getElementById('backToTopBtn');
        
        // Last visit elements
        this.elements.lastVisit = document.getElementById('lastVisit');
        this.elements.lastVisitFooter = document.getElementById('lastVisitFooter');
    },
    
    // Handle last visit tracking using localStorage
    handleLastVisit: function() {
        // Get current date
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        
        // Get last visit from localStorage
        const lastVisit = localStorage.getItem('lastVisit');
        
        // Display last visit message if available
        if (lastVisit) {
            const message = `Your last visit was on ${lastVisit}`;
            
            if (this.elements.lastVisit) {
                this.elements.lastVisit.textContent = message;
            }
            
            if (this.elements.lastVisitFooter) {
                this.elements.lastVisitFooter.textContent = message;
            }
        }
        
        // Update last visit in localStorage
        localStorage.setItem('lastVisit', `${currentDate} at ${currentTime}`);
    },
    
    // Setup back to top button functionality
    setupBackToTop: function() {
        if (!this.elements.backToTopBtn) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.elements.backToTopBtn.classList.add('visible');
            } else {
                this.elements.backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        this.elements.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
    
    // Helper function for resetting forms and clearing messages
    resetFormAndMessage: function(form, messageElement, successMessage, timeout = 5000) {
        if (messageElement) {
            messageElement.textContent = successMessage;
            messageElement.classList.add('success-message');
            form.reset();

            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('success-message');
            }, timeout);
        }
    },
    
    /* HOME PAGE Functions */
    initHomePage: function() {
        // Setup newsletter form
        this.setupNewsletterForm();
        
        // Setup testimonials slider
        this.setupTestimonials();
        
        // Set up book now button
        const bookNowBtn = document.getElementById('bookNowBtn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', () => {
                alert('Redirecting to booking system...');
                // In a real implementation, this would redirect to a booking page
                window.location.href = 'rooms.html';
            });
        }
    },
    
    setupNewsletterForm: function() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const receiveOffers = document.getElementById('offers').checked;

            const subscription = { name, email, offers: receiveOffers, date: new Date().toISOString() };
            try {
                localStorage.setItem('newsletterSubscription', JSON.stringify(subscription));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }

            const messageElement = document.getElementById('subscriptionMessage');
            this.resetFormAndMessage(newsletterForm, messageElement, `Thank you, ${name}! Your subscription has been confirmed.`);
        });
    },
    
    setupTestimonials: function() {
        const testimonialContainer = document.getElementById('testimonialContainer');
        if (!testimonialContainer) return;
        
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        
        // Populate testimonials
        this.displayTestimonial();
        
        // Set up navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + this.data.testimonials.length) % this.data.testimonials.length;
                this.displayTestimonial();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.data.testimonials.length;
                this.displayTestimonial();
            });
        }
    },
    
    displayTestimonial: function() {
        const testimonialContainer = document.getElementById('testimonialContainer');
        if (!testimonialContainer) return;
        
        const testimonial = this.data.testimonials[this.currentIndex];
        const testimonialHTML = `
            <div class="testimonial">
                <blockquote>"${testimonial.text}"</blockquote>
                <cite>- ${testimonial.author}</cite>
            </div>
        `;
        
        testimonialContainer.innerHTML = testimonialHTML;
    },
    
    /* ABOUT PAGE Functions */
    initAboutPage: function() {
        // Display company values
        this.displayValues();
    },
    
    displayValues: function() {
        const valuesContainer = document.getElementById('valuesContainer');
        if (!valuesContainer) return;
        
        let valuesHTML = '';
        
        this.data.values.forEach(value => {
            valuesHTML += `
                <div class="value-card">
                    <h3>${value.title}</h3>
                    <p>${value.description}</p>
                </div>
            `;
        });
        
        valuesContainer.innerHTML = valuesHTML;
    },
    
    /* ROOMS PAGE Functions */
    initRoomsPage: function() {
        // Display rooms
        this.displayRooms();
        
        // Setup room filter functionality
        this.setupRoomFilter();
        
        // Setup booking form
        this.setupBookingForm();
    },
    
    displayRooms: function(filter = {}) {
        const roomsContainer = document.getElementById('roomsContainer');
        if (!roomsContainer) return;
        
        // Filter rooms based on criteria
        let filteredRooms = [...this.data.rooms];
        
        if (filter.type && filter.type !== 'all') {
            filteredRooms = filteredRooms.filter(room => room.type === filter.type);
        }
        
        if (filter.guests && filter.guests !== 'all') {
            const guestsNum = parseInt(filter.guests);
            filteredRooms = filteredRooms.filter(room => room.capacity >= guestsNum);
        }
        
        // Generate room cards HTML
        let roomsHTML = '';
        
        if (filteredRooms.length === 0) {
            roomsHTML = '<p class="no-results">No rooms match your criteria. Please try different filters.</p>';
        } else {
            filteredRooms.forEach(room => {
                const featuresHTML = room.features.map(feature => `<li>${feature}</li>`).join('');
                
                roomsHTML += `
                    <div class="room-card" data-room-type="${room.type}">
                        <div class="room-image">
                            <img src="${room.image}" alt="${room.name}" loading="lazy">
                        </div>
                        <div class="room-details">
                            <h3>${room.name}</h3>
                            <p class="room-price">$${room.price} per night</p>
                            <p>${room.description}</p>
                            <h4>Features:</h4>
                            <ul class="room-features">
                                ${featuresHTML}
                            </ul>
                            <button class="room-select-btn" data-room-type="${room.type}">Select Room</button>
                        </div>
                    </div>
                `;
            });
        }
        
        roomsContainer.innerHTML = roomsHTML;
        
        // Add event listeners to the select buttons
        const selectButtons = document.querySelectorAll('.room-select-btn');
        selectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const roomType = e.target.getAttribute('data-room-type');
                // Scroll to booking form
                document.getElementById('room-booking').scrollIntoView({ behavior: 'smooth' });
                // Set the room type in the form
                document.getElementById('bookingRoomType').value = roomType;
            });
        });
    },
    
    setupRoomFilter: function() {
        const filterBtn = document.getElementById('filterRoomsBtn');
        if (!filterBtn) return;
        
        filterBtn.addEventListener('click', () => {
            const roomType = document.getElementById('roomType').value;
            const guests = document.getElementById('guests').value;
            
            this.displayRooms({ type: roomType, guests: guests });
        });
    },
    
    setupBookingForm: function() {
        const bookingForm = document.getElementById('bookingForm');
        if (!bookingForm) return;
        
        // Set minimum dates for the date inputs
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && checkoutInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const formatDate = (date) => {
                return date.toISOString().split('T')[0];
            };
            
            checkinInput.min = formatDate(today);
            checkoutInput.min = formatDate(tomorrow);
            
            // Update checkout min date when checkin changes
            checkinInput.addEventListener('change', () => {
                const newMin = new Date(checkinInput.value);
                newMin.setDate(newMin.getDate() + 1);
                checkoutInput.min = formatDate(newMin);
                
                // If current checkout date is before new minimum, update it
                if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
                    checkoutInput.value = formatDate(newMin);
                }
            });
        }
        
        // Handle form submission
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const roomType = document.getElementById('bookingRoomType').value;
            const guests = document.getElementById('bookingGuests').value;
            const requests = document.getElementById('specialRequests').value;
            
            // Store booking in localStorage (for demonstration)
            const booking = {
                name,
                email,
                checkin,
                checkout,
                roomType,
                guests,
                requests,
                bookingDate: new Date().toISOString()
            };
            
            try {
                let bookings = JSON.parse(localStorage.getItem('roomBookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('roomBookings', JSON.stringify(bookings));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
            
            // Show success message
            const messageElement = document.getElementById('bookingMessage');
            this.resetFormAndMessage(bookingForm, messageElement, `Thank you, ${name}! Your booking request has been submitted. We will contact you at ${email} to confirm your reservation.`, 8000);
        });
    },
    
    /* CONTACT PAGE Functions */
    initContactPage: function() {
        // Display FAQs
        this.displayFAQs();
        
        // Display transportation options
        this.displayTransportation();
        
        // Setup contact form
        this.setupContactForm();
    },
    
    displayFAQs: function() {
        const faqContainer = document.getElementById('faqContainer');
        if (!faqContainer) return;
        
        let faqsHTML = '';
        
        this.data.faqs.forEach((faq, index) => {
            faqsHTML += `
                <div class="faq-item">
                    <div class="faq-question" data-faq-index="${index}">
                        <h3>${faq.question}</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer" id="faq-answer-${index}">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `;
        });
        
        faqContainer.innerHTML = faqsHTML;
        
        // Add click event listeners to toggle FAQ answers
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const index = question.getAttribute('data-faq-index');
                const answer = document.getElementById(`faq-answer-${index}`);
                const toggle = question.querySelector('.faq-toggle');
                
                // Toggle visibility
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });
    },
    
    displayTransportation: function() {
        const transportationOptions = document.getElementById('transportationOptions');
        if (!transportationOptions) return;
        
        let optionsHTML = '<h4>Transportation Options</h4>';
        
        this.data.transportation.forEach(option => {
            optionsHTML += `
                <div class="transportation-item">
                    <h5>${option.name}</h5>
                    <p>${option.description}</p>
                    ${option.schedule ? `<p><strong>Schedule:</strong> ${option.schedule}</p>` : ''}
                    ${option.contact ? `<p><strong>Contact:</strong> ${option.contact}</p>` : ''}
                </div>
            `;
        });
        
        transportationOptions.innerHTML = optionsHTML;
    },
    
    setupContactForm: function() {
        const messageForm = document.getElementById('messageForm');
        if (!messageForm) return;

        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            if (phone && !this.validatePhoneNumber(phone)) {
                const messageStatus = document.getElementById('messageStatus');
                messageStatus.textContent = 'Please enter a valid phone number.';
                messageStatus.classList.add('error-message');
                return;
            }

            const contactMessage = { name, email, phone, subject, message, date: new Date().toISOString() };
            try {
                let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push(contactMessage);
                localStorage.setItem('contactMessages', JSON.stringify(messages));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }

            const messageStatus = document.getElementById('messageStatus');
            this.resetFormAndMessage(messageForm, messageStatus, `Thank you for your message, ${name}! We will get back to you soon.`);
        });
    },
    
    validatePhoneNumber: function(phone) {
        // Basic phone number validation
        // Accepts formats like (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
        const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneRegex.test(phone);
    }
};

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    NaranSuites.init();
});