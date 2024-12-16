const dogBreedAPI = "https://dogapi.dog/api/v2";

async function fetchBreeds() {
    const response = await fetch(`${dogBreedAPI}/breeds`);
    const data = await response.json();
    return data.data; // returns the list of all breeds
}

async function fetchBreedInfo(breedId) {
    const response = await fetch(`${dogBreedAPI}/breeds/${breedId}`);
    const data = await response.json();
    return data.data.attributes; // returns specific breed information
}

async function displayBreedDetails(breedName) {
    const breedInfoContainer = document.getElementById("breed-info-container");

    try {
        // fetch all breeds to find the breedId
        const breeds = await fetchBreeds();
        const breed = breeds.find(b => b.attributes.name.toLowerCase() === breedName.toLowerCase());

        if (!breed) {
            breedInfoContainer.innerHTML = `<p>No information found for the breed "${breedName}".</p>`;
            return;
        }

        // fetch detailed info for the breed
        const breedDetails = await fetchBreedInfo(breed.id);

        // extract and display the details
        const name = breedDetails.name;
        const description = breedDetails.description || "No description available.";
        const minLife = breedDetails.life?.min || "N/A";
        const maxLife = breedDetails.life?.max || "N/A";

        breedInfoContainer.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Min Life Span:</strong> ${minLife} years</p>
            <p><strong>Max Life Span:</strong> ${maxLife} years</p>
        `;
    } catch (error) {
        console.error("Error fetching breed details:", error);
        breedInfoContainer.innerHTML = `<p>Failed to load breed information. Please try again later.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const breedName = urlParams.get("breed");

    if (!breedName) {
        const breedInfoContainer = document.getElementById("breed-info-container");
        breedInfoContainer.innerHTML = `<p>No breed specified. Please go back and search for a breed.</p>`;
        return;
    }

    // display the breed details
    displayBreedDetails(breedName);
});