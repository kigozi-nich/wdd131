// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Added 3 more temples
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/slc-temple-lds-1257233-wallpaper.jpg"
    },
    {
        templeName: "Nairobi Kenya",
        location: "Nairobi, Kenya",
        dedicated: "2023, June, 18",
        area: 8500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nairobi-kenya/400x250/2023-02-14-nairobi-kenya-temple-1358331-wallpaper.jpg"
    },
    {
        templeName: "Taipei Taiwan",
        location: "Taipei, Taiwan",
        dedicated: "1984, November, 17",
        area: 9945,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/taipei-taiwan/400x250/taipei-taiwan-temple-exterior-1075394-wallpaper.jpg"
    }
];

// Function to display temple cards
function displayTemples(templeList) {
    const templeCardsContainer = document.getElementById('templeCards');
    templeCardsContainer.innerHTML = ''; // Clear existing content
    
    templeList.forEach(temple => {
        // Parse the dedication date
        const dedicationParts = temple.dedicated.split(', ');
        const year = parseInt(dedicationParts[0]);
        
        // Create temple card
        const templeCard = document.createElement('div');
        templeCard.className = 'temple-card';
        
        // Temple content
        templeCard.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            <div class="temple-info">
                <h3 class="temple-name">${temple.templeName}</h3>
                <p class="temple-location">${temple.location}</p>
                <p class="temple-dedicated">Dedicated: ${temple.dedicated}</p>
                <p class="temple-area">Area: ${temple.area.toLocaleString()} square feet</p>
            </div>
        `;
        
        templeCardsContainer.appendChild(templeCard);
    });
}

// Filter temples based on criteria
function filterTemples(filterType) {
    let filteredTemples = [];
    
    switch(filterType) {
        case 'old':
            // Temples built before 1900
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(', ')[0]);
                return year < 1900;
            });
            break;
        case 'new':
            // Temples built after 2000
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(', ')[0]);
                return year > 2000;
            });
            break;
        case 'large':
            // Temples larger than 90,000 square feet
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case 'small':
            // Temples smaller than 10,000 square feet
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        default: // 'home' or any other case
            // Display all temples
            filteredTemples = temples;
    }
    
    // Update the active class on the navigation
    updateActiveFilter(filterType);
    
    // Display the filtered temples
    displayTemples(filteredTemples);
}

// Update the active filter in the navigation
function updateActiveFilter(filterType) {
    // Remove active class from all links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the selected filter
    document.getElementById(`${filterType}-filter`).classList.add('active');
}

// Event listeners for filter buttons
document.getElementById('home-filter').addEventListener('click', function(e) {
    e.preventDefault();
    filterTemples('home');
});

document.getElementById('old-filter').addEventListener('click', function(e) {
    e.preventDefault();
    filterTemples('old');
});

document.getElementById('new-filter').addEventListener('click', function(e) {
    e.preventDefault();
    filterTemples('new');
});

document.getElementById('large-filter').addEventListener('click', function(e) {
    e.preventDefault();
    filterTemples('large');
});

document.getElementById('small-filter').addEventListener('click', function(e) {
    e.preventDefault();
    filterTemples('small');
});

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

// Initialize the page with all temples (home view)
window.addEventListener('load', function() {
    filterTemples('home');
});