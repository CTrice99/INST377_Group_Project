document.addEventListener('DOMContentLoaded', () => {
  fetchBreedList();
});

function fetchBreedList() {
  // Fetch all breeds from The Dog API
  fetch('https://api.thedogapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
      const breedListContainer = document.getElementById('breed-list');
      data.forEach(breed => {
        const breedItem = document.createElement('li');
        breedItem.textContent = breed.name;
        breedItem.style.cursor = 'pointer';
        breedItem.addEventListener('click', () => {
          window.location.href = `Results.html?breed=${breed.name}`;
        });
        breedListContainer.appendChild(breedItem);
        
      });
    })
    .catch(error => {
      console.error('Error fetching breed list:', error);
    });
}
