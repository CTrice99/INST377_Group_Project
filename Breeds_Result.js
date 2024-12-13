document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const breedName = params.get('breed');
  
    if (breedName) {
      fetchBreedDetails(breedName);
    } else {
      document.getElementById('breed-info').innerHTML = `<p>No breed specified. Please go back and try again.</p>`;
    }
  });
  
  function fetchBreedDetails(breedName) {
    // Fetch breed details from The Dog API
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const breed = data[0];
          const breedInfo = `
            <p><strong>Name:</strong> ${breed.name}</p>
            <p><strong>Temperament:</strong> ${breed.temperament}</p>
            <p><strong>Life Span:</strong> ${breed.life_span}</p>
            <p><strong>Height:</strong> ${breed.height.metric} cm</p>
            <p><strong>Weight:</strong> ${breed.weight.metric} kg</p>
          `;
          document.getElementById('breed-info').innerHTML = breedInfo;
  
          // Fetch breed image from The Dog API
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
        } else {
          document.getElementById('breed-info').innerHTML = `<p>Breed not found. Please try another name.</p>`;
          document.getElementById('breed-image').src = '';
        }
      })
      .catch(error => {
        console.error('Error fetching breed information:', error);
        document.getElementById('breed-info').innerHTML = `<p>Error fetching breed data.</p>`;
      });
  }
  