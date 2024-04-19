// Base URL for the API
const baseURL = 'http://localhost:3000';

// Callbacks
  // Function to handle click on ramen image
function handleClick(ramen) {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};


// Function to add submit event listener to new-ramen form
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = form.querySelector('#new-name').value;
      const restaurant = form.querySelector('#new-restaurant').value;
      const image = form.querySelector('#new-image').value;
      const rating = form.querySelector('#new-rating').value;
      const comment = form.querySelector('#new-comment').value;

      const ramenMenu = document.getElementById('ramen-menu');
      const ramenImage = document.createElement('img');
      ramenImage.src = image;
      ramenImage.alt = name;
      ramenImage.addEventListener('click', () => handleClick({ name, restaurant, image, rating, comment }));
      ramenMenu.appendChild(ramenImage);

      form.reset();
  });
}

// Function to display all ramens
function displayRamens() {
  fetch(`${baseURL}/ramens`)
      .then(response => response.json())
      .then(ramens => {
          const ramenMenu = document.getElementById('ramen-menu');
          ramens.forEach(ramen => {
              const ramenImage = document.createElement('img');
              ramenImage.src = ramen.image;
              ramenImage.alt = ramen.name;
              ramenImage.addEventListener('click', () => handleClick(ramen));
              ramenMenu.appendChild(ramenImage);
          });
      })
      .catch(error => console.error('Error fetching ramens:', error));
};

// Main function to start the program logic
function main() {
  displayRamens();
  addSubmitListener();
}
// Invoke main function after DOM is loaded
document.addEventListener('DOMContentLoaded', main);

