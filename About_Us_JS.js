document.getElementById('search-button').addEventListener('click', () => {
    const breedName = document.getElementById('breed-input').value.toLowerCase();
    if (breedName) {
      window.location.href = `Results.html?breed=${breedName}`; 
    }
  });