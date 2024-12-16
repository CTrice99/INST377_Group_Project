// * Test for About Us * 
// Here, we test the About_Us_JS.js file that handles the search functionality and page redirection. This part of the test checks whether the correct URL is generated when a breed name is typed into the input field and the button is clicked.

// Import necessary libraries for testing
// import { fireEvent, render } from '@testing-library/dom';
// import '@testing-library/jest-dom'; 

// // Import JavaScript files to test
// import './About_Us_JS.js';

// // Test 1: About Us JS Tests
// describe('About Us page JS', () => {
//   let breedInput;
//   let searchButton;

//   beforeEach(() => {
//     // Set up a simple DOM to test the JavaScript for About Us page
//     document.body.innerHTML = `
//       <div class="search-bar">
//         <input type="text" id="breed-input" placeholder="Search Up Dog Breeds or Categories!" />
//         <button id="search-button">&#128269;</button>
//       </div>
//     `;
    
//     breedInput = document.getElementById('breed-input');
//     searchButton = document.getElementById('search-button');
//   });

//   test('redirects to the correct URL with breed name when search button is clicked', () => {
//     breedInput.value = 'golden retriever';
//     delete window.location;
//     window.location = { href: '' };
//     fireEvent.click(searchButton);
//     expect(window.location.href).toBe('Results.html?breed=golden%20retriever');
//   });
// });













// * Test for Breeds List *
// This test checks whether the breed list is populated after fetching data from the Dog API

import { fireEvent, render } from '@testing-library/dom';
import '@testing-library/jest-dom'; 

// Import the JavaScript file to test
import './Breeds_List.js';

// Test 1: Breeds List JS Tests
describe('Breeds List page JS', () => {
  let breedListContainer;

  beforeEach(() => {
    // Set up a simple DOM to test the JavaScript for Breeds List page
    document.body.innerHTML = `
      <h1>Available Dog Breeds</h1>
      <div id="breed-list" class="breed-list"></div>
    `;
    breedListContainer = document.getElementById('breed-list');
  });

  test('populates breed list after fetching data from the Dog API', async () => {
    // Mock the fetch function to simulate  API response
    const mockBreedData = [
      { name: 'Labrador Retriever' },
      { name: 'German Shepherd' },
      { name: 'Golden Retriever' }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockBreedData)
      })
    );
    await fetchBreedList();

    // Check that the breed list contains the correct items
    expect(breedListContainer.children.length).toBe(3); 
    expect(breedListContainer.children[0].textContent).toBe('Labrador Retriever');
    expect(breedListContainer.children[1].textContent).toBe('German Shepherd');
    expect(breedListContainer.children[2].textContent).toBe('Golden Retriever');
  });
});






// * Test for Favorites *
// Checks if the breed's name and image URL are saved correctly in localStorage

import '@testing-library/jest-dom'; 
import './Favorites-JS.js'; 

describe('Favorites JS functionality', () => {
  let breed;

  beforeEach(() => {
    // Set up a simple DOM for testing
    document.body.innerHTML = `
      <img id="breed-image" src="https://example.com/dog.jpg" />
    `;
    
    breed = { id: 1, name: 'Golden Retriever', temperament: 'Friendly' };
    
    // Reset localStorage before each test
    localStorage.clear();
  });

  test('should save breed name and image URL to localStorage', () => {
    // Call the function
    addFavorite(breed);

    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites[0].name).toBe('Golden Retriever');
    expect(favorites[0].image).toBe('https://example.com/dog.jpg');
  });
});



// * Test for Home *
    // Checks if the slider has been populated with 20 images

import '@testing-library/jest-dom';
import './Home-JS.js';

describe('Home JS functionality', () => {
  let carouselContainer;

  beforeEach(() => {
    // Set up a simple DOM for testing
    document.body.innerHTML = `
      <div data-simple-slider class="simple-slider"></div>
    `;
    
    carouselContainer = document.querySelector('[data-simple-slider]');
    
    // Mock function to return a random dog image
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'https://example.com/dog.jpg' }),
      })
    );
  });

  test('should populate the slider with 20 images', async () => {
    // Call function
    await populateSlider();

    // Check if the slider has been populated with 20 images
    const images = carouselContainer.querySelectorAll('img');
    expect(images.length).toBe(20);
  });
});
