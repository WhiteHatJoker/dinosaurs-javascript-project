
    // Create Dino Constructor
    function Dino(species, height, weight, diet, when, where, facts) {
        this.species = species;
        this.height = height;
        this.weight = weight;
        this.when = when;
        this.where = where;
        this.facts = facts;
        this.diet = diet;


        // Compare Dino to Human Height Method
        this.compareDinoHeight = function(humanHeight) {
            let difference = this.height - humanHeight;
            let newFact = `${this.species} were ${Math.abs(difference)} inches ${difference>=0 ? 'higher' : 'smaller'} than you`;
            return newFact;
        }

        // Compare Dino to Human Weight Method
        this.compareDinoWeight = function(humanWeight) {
            let difference = this.weight - humanWeight;
            let newFact = `${this.species} were ${Math.abs(difference)} pounds ${difference>=0 ? 'heavier' : 'lighter'} than you`;
            return newFact;
        }

        // Compare Dino to Human Diet Method
        this.compareDinoDiet = function(humanDiet) {
            let sameDiet = this.diet == humanDiet;
            let newFact = '';
            if (sameDiet) {
                newFact = `${this.species} and you had the same diet. You both had a ${humanDiet} diet.`
            } else {
                newFact = `${this.species} and you had a completely different diet. ${this.species} preferred to be ${this.diet} while you prefer the ${humanDiet} diet.`
            }
            return newFact;
        }

    }

    // An array to hold javascript dinosaur objects
    let dinosaurs = [];
    // Push to the above array Dino js Objects from fetched json file
    function getDinos(humanHeight, humanWeight, humanDiet) {
        fetch('./dino.json')
        .then(res => res.json())
        .then(data => {
            data.Dinos.forEach(dino => {
               let newDino = new Dino(dino.species, dino.height, dino.weight, dino.diet, dino.when, dino.where, dino.facts);
                // Add 3 more facts to each js object
               newDino.facts.push(newDino.compareDinoHeight(humanHeight));
               newDino.facts.push(newDino.compareDinoWeight(humanWeight));
               newDino.facts.push(newDino.compareDinoDiet(humanDiet));
               dinosaurs.push(newDino);
            });
        })
        .catch(err => console.error(err));
    }

    // Generate Tiles for each Dino in Array
    let htmlContent = '';
    function createGridItems(dino) {
        const displayHumanTile = dino.species == 'Homo Sapiens';
        let h3Title = '<h3>'+ (displayHumanTile ? dino.name : dino.species) + '</h3>';
        let heightPara = '<p>Height:' + dino.height + '</p>';
        let weightPara = '<p>Weight:' + dino.weight + '</p>';
        let dietPara = '<p>Diet:' + dino.diet + '</p>';
        htmlContent = htmlContent + '<div class="grid-item">'+ h3Title + heightPara + weightPara + dietPara + (!displayHumanTile ? '<div><p>' + dino.when + '</p><p>' + dino.where + '</p><p>' + dino.facts[Math.floor(Math.random() * dino.facts.length)] + '</p></div>' : '') + '</div>';
    }
        
    // Remove form from screen
    function hideForm() {
        document.getElementById('dino-compare').style.display = 'none';
    }

// On button click, prepare and display infographic
document.querySelector('#dino-compare #btn').onclick = function() {

    // Create Human Object and use IIFE to get the human data from the form
    let human = (function() {
        let humanObj = {};
        humanObj.name = document.getElementById('name').value;
        humanObj.height = document.getElementById('feet').value*12+document.getElementById('inches').value;
        humanObj.weight = document.getElementById('weight').value;
        humanObj.diet = document.getElementById('diet').value.toLowerCase();;
        humanObj.species = 'Homo Sapiens';
        return humanObj;
    })();
    getDinos(human.height, human.weight, human.diet);
    // Add human object into dinosaurs array
    console.log(dinosaurs);
    // Add tiles to DOM
    dinosaurs.forEach(createGridItems);
    document.getElementById('grid').innerHTML = htmlContent;
    
    

    // hideForm();
};