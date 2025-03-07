// Display the current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Display the last modified date in the footer
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;