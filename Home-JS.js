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

    // insert images into the slider container
    carouselContainer.innerHTML = imageHtml;

    // initialize the simple slider
    simpleslider.getSlider({
        container: carouselContainer,
        autoPlay: true,
        transitionTime: 1.5, 
        delay: 3 
    });
}

populateSlider();