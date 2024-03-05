const apiKey = '91fba15f828371be49e664a480b46cd8';
const appId = '5748bd3a';
const endpoint = 'https://api.edamam.com/api/food-database/v2/parser';
const MAX_RESULTS = 7;

const searchInput = document.getElementById('foodInput');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query !== '') {
        fetch(`${endpoint}?app_id=${appId}&app_key=${apiKey}&ingr=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayResults(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        console.log('Please enter a search query');
    }
});

clearButton.addEventListener('click', () => {
    clearResults();
});

function displayResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (data.hints && data.hints.length > 0) {
        const resultList = document.createElement('ul');
        const numResultsToDisplay = Math.min(MAX_RESULTS, data.hints.length);

        for (let i = 0; i < numResultsToDisplay; i++) {
            const hint = data.hints[i];
            const listItem = document.createElement('li');

            // Create a button for each item
            const selectButton = document.createElement('button');
            selectButton.innerHTML = `<strong>${hint.food.label}</strong><br><br><span style="font-size: smaller;">Calories: ${Math.round(hint.food.nutrients.ENERC_KCAL)}</span><br><span style="font-size: smaller;">Protein: ${Math.round(hint.food.nutrients.PROCNT)}g</span>`;
            selectButton.addEventListener('click', () => {
                addToTotalCalories(hint.food.nutrients.ENERC_KCAL, hint.food.nutrients.PROCNT);
            });

            // Add the class to the button for styling
            selectButton.classList.add('special-button');

            // Check if the text is long and add a specific class
            if (selectButton.textContent.length > 20) {
                selectButton.classList.add('long-text');
            }

            listItem.appendChild(selectButton);
            resultList.appendChild(listItem);
        }

        resultsContainer.appendChild(resultList);
    } else {
        resultsContainer.textContent = 'No results found.';
    }
}


// Function to add selected item to the list
function addSelectedItem(name, protein, calories) {
    const selectedItemsList = document.getElementById('selectedItemsList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${name}</strong> | Protein: ${Math.round(protein)}g | Calories: ${Math.round(calories)}kcal`;
    selectedItemsList.appendChild(listItem);
}

// Modify the 'addToTotalCalories' function to also add the selected item
function addToTotalCalories(ENERC_KCAL, PROCNT, name) {
    Math.round(PROCNT);
    totalCalories += ENERC_KCAL;
    totalProtein += PROCNT;

    // Call the function to add the selected item to the list
    addSelectedItem(name, PROCNT, ENERC_KCAL);

    updateTotalCaloriesDisplay();
}

//new code


let totalCalories = 0; // Initialize the total calories variable
let totalProtein = 0;

function addToTotalCalories(ENERC_KCAL, PROCNT) {
    Math.round(PROCNT)
    totalCalories += ENERC_KCAL;
    totalProtein +=  PROCNT;
    console.log(totalProtein)
    
    updateTotalCaloriesDisplay();
}

function updateTotalCaloriesDisplay() {
    const totalCaloriesDisplay = document.getElementById('totalCalories');
    const totalProteinDisplay = document.getElementById('totalProtein');
    totalCaloriesDisplay.textContent = `Total Calories: ${Math.round(totalCalories)}kcal`;
    totalProteinDisplay.textContent = `Total Protein: ${Math.round(totalProtein)}g`;
}

function clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
}

// Add a click event listener for the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
    resetTotalCalories();
});

// Function to reset the total calories
function resetTotalCalories() {
    totalCalories = 0;
    totalProtein = 0;
    updateTotalCaloriesDisplay();
}

// Function to update the total calories display
function updateTotalCaloriesDisplay() {
    const totalCaloriesDisplay = document.getElementById('totalCalories');
    totalCaloriesDisplay.textContent = `Total Calories: ${Math.round(totalCalories)}kcal`;

    const totalProteinDisplay = document.getElementById('totalProtein');
    totalProteinDisplay.textContent = `Total Protein: ${Math.round(totalProtein)}g`;
}

