// import * as Carousel from "./carousel.mjs";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_AZxU2Ob52eWfjYudw0dHJLfjd9IWmTaUxFMYat5MNV2skaBlKhQOHqueCbsCxm4b";

// axios("https://api.thecatapi.com/v1/images/search").then(x =>{
//     console.log(x);
// })
// .catch((err)=>{
//     console.log(err);
// });

// fetch("https://api.thecatapi.com/v1/images/search")
//   .then((x) => {
//     console.log(x);
//     x.json().then((j) => {
//       console.log(j);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

async function myFunction() {
    let apiData = await axios(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    );
    console.log(apiData.data);
  }
  myFunction().then((x) => {
    console.log(x);
  });

  async function myFunction2() {
    let apiData = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    );
    let jsonData = await apiData.json();
    console.log(jsonData);
  }
  myFunction2().then((x) => {
    console.log(x);
  });
  async function myFunction3() {
    let apiData = await axios(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`
    );
    console.log(apiData.data);
  }
  myFunction3().then((x) => {
    console.log(x);
  });
  async function myFunction4() {
    let apiData = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`
    );
    let jsonData = await apiData.json();
    console.log(jsonData);
  }
  myFunction4().then((x) => {
    console.log(x);
  });




/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const breeds = await response.json();
  
      const breedSelect = document.getElementById('breedSelect');
  
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading breeds:', error);
    }
  }
  
  // Call initialLoad function immediately
  initialLoad();
  
  console.log("Script loaded");
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
document.addEventListener("DOMContentLoaded", async (event) => {
    // Function to clear and repopulate carousel
    async function updateCarousel(selectedBreedId) {
      const carousel = document.getElementById('carouselExampleControls'); // Updated ID
      const infoDump = document.getElementById('infoDump');
  
      if (!carousel || !infoDump) {
        console.error("Carousel or infoDump element not found.");
        return;
      }
  
      // Clear carousel and infoDump
      carousel.querySelector('.carousel-inner').innerHTML = ''; // Clear inner carousel content
      infoDump.innerHTML = ''; // Clear infoDump content
  
      try {
        // Fetch information on the selected breed
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${selectedBreedId}&limit=5`);
        const breedImages = await response.json();
  
        // Create carousel elements
        const carouselInner = carousel.querySelector('.carousel-inner');
        breedImages.forEach(imageData => {
          const img = document.createElement('img');
          img.src = imageData.url;
          img.alt = 'Cat Image';
          img.classList.add('d-block', 'w-100'); // Bootstrap classes
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          carouselItem.appendChild(img);
          carouselInner.appendChild(carouselItem);
        });
  
        // Activate first carousel item
        carouselInner.firstChild.classList.add('active');
  
        // Fetch breed information
        const breedInfoResponse = await fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`);
        const breedData = await breedInfoResponse.json();
  
        // Create informational section in infoDump
        const infoHeader = document.createElement('h2');
        infoHeader.textContent = breedData.name;
        infoDump.appendChild(infoHeader);
  
        const infoList = document.createElement('ul');
        infoList.innerHTML = `
          <li><strong>Origin:</strong> ${breedData.origin}</li>
          <li><strong>Description:</strong> ${breedData.description}</li>
          <li><strong>Temperament:</strong> ${breedData.temperament}</li>
          <li><strong>Life span:</strong> ${breedData.life_span}</li>
          <li><strong>Adaptability:</strong> ${breedData.adaptability}</li>
          <li><strong>Affection level:</strong> ${breedData.affection_level}</li>
          <li><strong>Child friendly:</strong> ${breedData.child_friendly}</li>
          <li><strong>Dog friendly:</strong> ${breedData.dog_friendly}</li>
          <li><strong>Energy level:</strong> ${breedData.energy_level}</li>
          <li><strong>Grooming:</strong> ${breedData.grooming}</li>
          <li><strong>Health issues:</strong> ${breedData.health_issues}</li>
          <li><strong>Intelligence:</strong> ${breedData.intelligence}</li>
          <li><strong>Shedding level:</strong> ${breedData.shedding_level}</li>
          <li><strong>Social needs:</strong> ${breedData.social_needs}</li>
          <li><strong>Vocalisation:</strong> ${breedData.vocalisation}</li>
        `;
        infoDump.appendChild(infoList);
  
      } catch (error) {
        console.error('Error loading breed information:', error);
      }
    }
  
    // Call initialLoad function immediately
    async function initialLoad() {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        const breeds = await response.json();
  
        const breedSelect = document.getElementById('breedSelect');
  
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.textContent = breed.name;
          breedSelect.appendChild(option);
        });
  
        // Create initial carousel
        if (breeds.length > 0) {
          const initialBreedId = breeds[0].id;
          await updateCarousel(initialBreedId);
        }
  
      } catch (error) {
        console.error('Error loading breeds:', error);
      }
    }
  
    // Event handler for breedSelect
    const breedSelect = document.getElementById('breedSelect');
    breedSelect.addEventListener('change', async (event) => {
      const selectedBreedId = event.target.value;
      await updateCarousel(selectedBreedId);
    });
  
    // Call initialLoad function immediately
    initialLoad();
  });
  
  
/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
import axios from 'axios';

document.addEventListener("DOMContentLoaded", async (event) => {
  // Set default headers with API key
  axios.defaults.headers.common['x-api-key'] = 'live_AZxU2Ob52eWfjYudw0dHJLfjd9IWmTaUxFMYat5MNV2skaBlKhQOHqueCbsCxm4b'; 

  // Function to clear and repopulate carousel
  async function updateCarousel(selectedBreedId) {
    const carousel = document.getElementById('carouselExampleControls'); 
    const infoDump = document.getElementById('infoDump');

    if (!carousel || !infoDump) {
      console.error("Carousel or infoDump element not found.");
      return;
    }

    // Clear carousel and infoDump
    carousel.querySelector('.carousel-inner').innerHTML = ''; 
    infoDump.innerHTML = ''; 

    try {
      // Fetch information on the selected breed
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${selectedBreedId}&limit=5`);
      const breedImages = response.data;

      // Create carousel elements
      const carouselInner = carousel.querySelector('.carousel-inner');
      breedImages.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData.url;
        img.alt = 'Cat Image';
        img.classList.add('d-block', 'w-100'); 
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });

      // Activate first carousel item
      carouselInner.firstChild.classList.add('active');

      // Fetch breed information
      const breedInfoResponse = await axios.get(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`);
      const breedData = breedInfoResponse.data;

      // Create informational section in infoDump
      const infoHeader = document.createElement('h2');
      infoHeader.textContent = breedData.name;
      infoDump.appendChild(infoHeader);

      const infoList = document.createElement('ul');
      infoList.innerHTML = `
        <li><strong>Origin:</strong> ${breedData.origin}</li>
        <li><strong>Description:</strong> ${breedData.description}</li>
        <li><strong>Temperament:</strong> ${breedData.temperament}</li>
        <li><strong>Life span:</strong> ${breedData.life_span}</li>
        <li><strong>Adaptability:</strong> ${breedData.adaptability}</li>
        <li><strong>Affection level:</strong> ${breedData.affection_level}</li>
        <li><strong>Child friendly:</strong> ${breedData.child_friendly}</li>
        <li><strong>Dog friendly:</strong> ${breedData.dog_friendly}</li>
        <li><strong>Energy level:</strong> ${breedData.energy_level}</li>
        <li><strong>Grooming:</strong> ${breedData.grooming}</li>
        <li><strong>Health issues:</strong> ${breedData.health_issues}</li>
        <li><strong>Intelligence:</strong> ${breedData.intelligence}</li>
        <li><strong>Shedding level:</strong> ${breedData.shedding_level}</li>
        <li><strong>Social needs:</strong> ${breedData.social_needs}</li>
        <li><strong>Vocalisation:</strong> ${breedData.vocalisation}</li>
      `;
      infoDump.appendChild(infoList);

    } catch (error) {
      console.error('Error loading breed information:', error);
    }
  }

  // Call initialLoad function immediately
  async function initialLoad() {
    try {
      
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      const breeds = response.data;

      const breedSelect = document.getElementById('breedSelect');

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      // Create initial carousel
      if (breeds.length > 0) {
        const initialBreedId = breeds[0].id;
        await updateCarousel(initialBreedId);
      }

    } catch (error) {
      console.error('Error loading breeds:', error);
    }
  }

  // Event handler for breedSelect
  const breedSelect = document.getElementById('breedSelect');
  breedSelect.addEventListener('change', async (event) => {
    const selectedBreedId = event.target.value;
    await updateCarousel(selectedBreedId);
  });

  // Call initialLoad function immediately
  initialLoad();
});

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
