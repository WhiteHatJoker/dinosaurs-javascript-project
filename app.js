
    // Create Dino Constructor
    function Dino() {
        
    }

    fetch('./dino.json')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.Dinos[0]);
    })
    .catch(err => console.error(err));
 

    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen
    function hideForm() {
        document.getElementById('dino-compare').style.display = 'none';
    }

// On button click, prepare and display infographic

const dinoFormSubmitButton = document.querySelector('#dino-compare #btn');
dinoFormSubmitButton.onclick = function() {
    hideForm();
    console.log('I am here 2');
};