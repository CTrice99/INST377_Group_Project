

let breedList = []; // List of all available dog breeds

// Fetch all breeds from The Dog API
async function fetchAllBreeds() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const data = await response.json();
    breedList = data.map(breed => ({
        id: breed.id,
        name: breed.name.toLowerCase(),
        temperament: breed.temperament,
        life_span: breed.life_span,
        height: breed.height.metric,
        weight: breed.weight.metric,
    }));
}

// Find the closest matching breeds
function findSimilarBreeds(query) {
    query = query.toLowerCase();
    const results = breedList
        .map(breed => ({
            breed,
            similarity: calculateSimilarity(query, breed.name),
        }))
        .sort((a, b) => b.similarity - a.similarity); // Sort by similarity score

    return results;
}

// Basic similarity scoring (counts matching characters in sequence)
function calculateSimilarity(query, target) {
    let matches = 0;
    const length = Math.min(query.length, target.length);

    for (let i = 0; i < length; i++) {
        if (query[i] === target[i]) {
            matches++;
        } else {
            break;
        }
    }

    return matches / target.length;
}

// Display breed details
function displayExactMatch(breed) {
    const breedInfo = `
        <p><strong>Name:</strong> ${breed.name}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Life Span:</strong> ${breed.life_span}</p>
        <p><strong>Height:</strong> ${breed.height} cm</p>
        <p><strong>Weight:</strong> ${breed.weight} kg</p>
    `;
    document.getElementById('breed-info').innerHTML = breedInfo;

    // Fetch breed image
    fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}`)
        .then(response => response.json())
        .then(imageData => {
            if (imageData.length > 0) {
                document.getElementById('breed-image').src = imageData[0].url;
            } else {
                document.getElementById('breed-image').alt = 'Image not available';
            }
        })
        .catch(error => {
            console.error('Error fetching breed image:', error);
            document.getElementById('breed-image').alt = 'Image not available';
        });
}

// Display similar breeds
function displaySimilarBreeds(similarBreeds, exactBreed) {
    const container = document.getElementById('similar-breeds');
    const similarItems = similarBreeds
        .filter(item => item.breed.name !== exactBreed.name) // Exclude exact match
        .slice(0, 5) // Limit to top 5 results
        .map(item => `
            <div>
                <a href="results.html?breed=${encodeURIComponent(item.breed.name)}">
                    <p><strong>${item.breed.name}</strong></p>
                </a>
                <p>${item.breed.temperament || 'No temperament available'}</p>
            </div>
        `)
        .join('');

    container.innerHTML = similarItems || `<p>No similar breeds found.</p>`;
}

// Add to Favorites functionality
function addFavorite(breed) {
    // Get existing favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the breed is already in favorites
    if (favorites.some(fav => fav.id === breed.id)) {
        alert(`${breed.name} is already in your favorites!`);
        return;
    }

    // Add the current breed to favorites
    favorites.push({
        id: breed.id,
        name: breed.name,
        image: document.getElementById('breed-image').src, // Add image URL
        temperament: breed.temperament,
    });

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    //Show an alert indicating success
    alert(`${breed.name} has been added to your favorites!`);
}

// Handle page load
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const breedName = params.get('breed');

    // Fetch breed list before searching
    await fetchAllBreeds();

    if (breedName) {
        const similarBreeds = findSimilarBreeds(breedName);
        if (similarBreeds.length > 0) {
            const exactBreed = similarBreeds[0].breed; // Best match
            displayExactMatch(exactBreed);
            displaySimilarBreeds(similarBreeds, exactBreed);
        } else {
            document.getElementById('breed-info').innerHTML = `<p>No matching breed found for "${breedName}".</p>`;
            document.getElementById('similar-breeds').innerHTML = `<p>No similar breeds found.</p>`;
        }
    } else {
        document.getElementById('breed-info').innerHTML = `<p>No breed specified. Please go back and try again.</p>`;
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const breedName = params.get('breed');

    await fetchAllBreeds();

    if (breedName) {
        const similarBreeds = findSimilarBreeds(breedName);
        if (similarBreeds.length > 0) {
            const exactBreed = similarBreeds[0].breed;
            displayExactMatch(exactBreed);

            console.log("Exact breed for Add to Favorites:", exactBreed);

            const addFavoriteButton = document.getElementById('add-favorite-button');
            if (addFavoriteButton) {
                console.log("Button found. Attaching event listener.");
                addFavoriteButton.addEventListener('click', () => addFavorite(exactBreed));
            } else {
                console.error("Add to Favorites button not found.");
            }
        } else {
            document.getElementById('breed-info').innerHTML = `<p>No matching breed found for "${breedName}".</p>`;
            document.getElementById('similar-breeds').innerHTML = `<p>No similar breeds found.</p>`;
        }
    } else {
        document.getElementById('breed-info').innerHTML = `<p>No breed specified. Please go back and try again.</p>`;
    }
});

