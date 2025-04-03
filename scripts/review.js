// Review confirmation page specific JavaScript

// Function to handle review counter
function handleReviewCounter() {
    const reviewCountElement = document.getElementById('reviewCount');
    
    if (reviewCountElement) {
        // Get current count from localStorage or initialize to 0
        let reviewCount = localStorage.getItem('reviewCount');
        reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
        
        // Update localStorage with new count
        localStorage.setItem('reviewCount', reviewCount);
        
        // Display the count on the page
        reviewCountElement.textContent = reviewCount;
    }
}

// Display URL parameters (from form submission)
function displayFormData() {
    // This could be expanded to show the user what they submitted
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Form data received:', Object.fromEntries(urlParams));
}

// Initialize the review page
document.addEventListener('DOMContentLoaded', function() {
    // Handle review counter
    handleReviewCounter();
    
    // Optional: Display submitted data
    displayFormData();
});