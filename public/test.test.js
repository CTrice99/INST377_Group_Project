import { fireEvent, render } from '@testing-library/dom';
import '@testing-library/jest-dom'; 
import { fetchBreedList } from './Breeds_List.js'; 
import { addFavorite } from './Favorites-JS.js'; 
import './About_Us_JS.js'; 

// Test for About Us page JS
describe('About Us page JS', () => {
  let breedInput;
  let searchButton;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="search-bar">
        <input type="text" id="breed-input" placeholder="Search Up Dog Breeds or Categories!" />
        <button id="search-button">&#128269;</button>
      </div>
    `;
    
    breedInput = document.getElementById('breed-input');
    searchButton = document.getElementById('search-button');
  });

  afterEach(() => {
    delete window.location; 
  });

  test('redirects to the correct URL with breed name when search button is clicked', () => {
    breedInput.value = 'golden retriever';
    window.location = { href: '' }; 
    
    fireEvent.click(searchButton);
    expect(window.location.href).toBe('Results.html?breed=golden%20retriever');
  });
});




// Test for Breeds List JS
describe('Breeds List page JS', () => {
  let breedListContainer;

  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Available Dog Breeds</h1>
      <div id="breed-list" class="breed-list"></div>
    `;
    breedListContainer = document.getElementById('breed-list');
  });

  test('populates breed list after fetching data from the Dog API', async () => {
    // Mock function to simulate  API response
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

    expect(breedListContainer.children.length).toBe(3); 
    expect(breedListContainer.children[0].textContent).toBe('Labrador Retriever');
    expect(breedListContainer.children[1].textContent).toBe('German Shepherd');
    expect(breedListContainer.children[2].textContent).toBe('Golden Retriever');
  });
});



// Test for Favorites JS functionality
describe('Favorites JS functionality', () => {
  let breed;

  beforeEach(() => {
    document.body.innerHTML = `
      <img id="breed-image" src="https://example.com/dog.jpg" />
    `;
    
    breed = { id: 1, name: 'Golden Retriever', temperament: 'Friendly' };
    
    localStorage.clear();
  });

  test('should save breed name and image URL to localStorage', () => {
    addFavorite(breed); 

    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites[0].name).toBe('Golden Retriever');
    expect(favorites[0].image).toBe('https://example.com/dog.jpg');
  });
});
