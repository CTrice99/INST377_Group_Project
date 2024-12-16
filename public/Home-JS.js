// fetch random dog image
async function randomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
}

// populate the slider
async function populateSlider() {
    const carouselContainer = document.querySelector('[data-simple-slider]');
    let imageHtml = '';

    // fetch 20 random dog images
    for (let i = 0; i < 20; i++) {
        const imageUrl = await randomDogImage();
        imageHtml += `<div><img src="${imageUrl}" alt="Dog Image" style="width:100%; height:auto;" /></div>`;
    }

    carouselContainer.innerHTML = imageHtml;

    // initialize the simple slider
    simpleslider.getSlider({
        container: carouselContainer,
        autoPlay: true,
        transitionTime: 1.5,
        delay: 3,
    });
}

// handle search bar functionality
function setupSearchBar() {
    const searchForm = document.getElementById('search-form');

    // add submit event listener to the form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const query = document.getElementById('search-input').value.trim();

        if (query) {
            // redirect to the results.html page with the breed query
            window.location.href = `Results.html?breed=${encodeURIComponent(query)}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateSlider();
    setupSearchBar();
});