//Create an async function "initialLoad" that does the following
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

initialLoad();