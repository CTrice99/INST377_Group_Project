// Add breed to favorites
function addFavorite(breed) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the breed is already in favorites
    if (favorites.some(fav => fav.id === breed.id)) {
        alert(`${breed.name} is already in your favorites!`);
        return;
    }

    // Add breed to favorites
    const breedImage = document.getElementById('breed-image').src;

    favorites.push({
        id: breed.id,
        name: breed.name,
        image: breedImage,  // Store the image URL correctly
        temperament: breed.temperament,
    });

    // Save favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${breed.name} has been added to your favorites!`);
}

// Load favorites from localStorage and display them
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const container = document.getElementById('favorites-container');

    // If no favorites, display a message
    if (favorites.length === 0) {
        container.innerHTML = `<p>You haven't added any favorite breeds yet! Go back and add some!</p>`;
        return;
    }

    // Render the favorites HTML
    const favoritesHtml = favorites.map(fav => {
        return `
            <div class="favorite-item" id="favorite-${fav.id}">
                <img src="${fav.image}" alt="${fav.name}" class="favorite-image" style="max-width:150px; max-height:150px;" />
                <div class="favorite-details">
                    <a href="results.html?breed=${encodeURIComponent(fav.name)}" class="favorite-name">
                        <h3>${fav.name}</h3>
                    </a>
                    <p><strong>Temperament:</strong> ${fav.temperament || 'No temperament available'}</p>
                    <button class="remove-btn" onclick="confirmRemoveFavorite('${fav.id}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    // Display the HTML for all favorites
    container.innerHTML = favoritesHtml;
}

// Confirm removal of a favorite breed
function confirmRemoveFavorite(breedId) {
    // Show confirmation pop-up
    const confirmed = confirm("Are you sure you want to remove this breed from your favorites?");
    if (confirmed) {
        removeFavorite(breedId);  // Call removeFavorite if confirmed
    }
}

// Remove a favorite breed from localStorage and the DOM
function removeFavorite(breedId) {
    // Get the favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filter out the selected breed by ID
    favorites = favorites.filter(fav => fav.id !== breedId);

    // Update localStorage with the new list of favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Remove the breed from the DOM immediately
    const breedElement = document.getElementById(`favorite-${breedId}`);
    if (breedElement) {
        breedElement.remove(); // Remove the breed from the page immediately
    }

    // Debugging: Check the updated list in localStorage
    console.log('Updated favorites:', favorites);
}

// Ensure fresh data on page load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('favorites-container');
    
    // Clear the container to make sure it reloads correctly
    container.innerHTML = ''; // Clear any existing content

    // Load the updated favorites list from localStorage
    loadFavorites();
});
