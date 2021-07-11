
    // Create Dino Constructor
    function Dino(species, height, weight, diet, when, where, facts) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.when = when;
        this.where = where;
        this.facts = facts;
        this.diet = diet;
    }

    // An array to hold javascript dinosaur objects
    let dinosaurs = [];
    // Push to the above array of Dino Objects from fetched json file
    function getDinos() {
        fetch('./dino.json')
        .then(res => res.json())
        .then(data => {
            data.Dinos.forEach(dino => {
               dinosaurs.push(new Dino(dino.species, dino.height, dino.weight, dino.diet, dino.when, dino.where, dino.facts));
            });
        })
        .catch(err => console.error(err));
    }






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
document.querySelector('#dino-compare #btn').onclick = function() {

    // Create Human Object and use IIFE to get the human data from the form
    let human = (function() {
        let human = {};
        human.name = document.getElementById('name').value;
        human.height = document.getElementById('feet').value;
        human.weight = document.getElementById('weight').value;
        human.diet = document.getElementById('diet').value;
        return human;
    })();
    console.log(human);
    getDinos();
    console.log(dinosaurs);

    hideForm();
};