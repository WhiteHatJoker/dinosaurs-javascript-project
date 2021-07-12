
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
    const dinosaurs = [];
    // Asynchromous function to get dino.json file contents
    async function getDinoObjectsFromJSON(human) {
        const jsonResponse = await fetch('./dino.json'); 
        const dinoDataFromJson = await jsonResponse.json(); 
        createDinoObj(dinoDataFromJson, human);
    }
    // Creating javascript objects out of fetched json objects
    function createDinoObj(dinos, human){
        dinos.Dinos.forEach((dino) => {
            let newDino = new Dino(dino.species, dino.height, dino.weight, dino.diet, dino.when, dino.where, dino.facts);
            // Add 3 more facts to each js object if not pigeon species
            if (dino.species != "Pigeon") {
                newDino.facts.push(newDino.compareDinoHeight(human.height));
                newDino.facts.push(newDino.compareDinoWeight(human.weight));
                newDino.facts.push(newDino.compareDinoDiet(human.diet));
            }
            // Saving an object to the global dinosaurs variable
            dinosaurs.push(newDino); 
        })
        // Add human object into dinosaurs array
        dinosaurs.splice(4,0,human);
    }
    
    // Generate a tile for one Dino object in Array
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
const btn = document.querySelector('#dino-compare #btn');
btn.addEventListener('click', async (e) => {
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
    // Get the prepared array with javascript objects including human object and more facts inside each object
    getDinoObjectsFromJSON(human);

    // Add tiles to DOM
    dinosaurs.forEach(createGridItems);
    document.getElementById('grid').innerHTML = htmlContent;
    // hideForm();
  });