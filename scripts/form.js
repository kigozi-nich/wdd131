// Form page specific JavaScript

// Function to populate product dropdown
function populateProductDropdown() {
    const productSelect = document.getElementById('product');
    
    if (productSelect) {
        // Populate the dropdown with product options
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

// Initialize the form page
document.addEventListener('DOMContentLoaded', function() {
    // Populate product dropdown
    populateProductDropdown();
    
    // You could add form validation or other form-specific functionality here
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Optional: Add custom validation if needed
            console.log('Form submitted');
        });
    }
});