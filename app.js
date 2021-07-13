
    // Important html element selectors
    const submitButton = document.querySelector('#dino-compare #btn');
    const mainGrid = document.getElementById('grid');
    
    // Create Dino Constructor
    class Dino {
        constructor(species, height, weight, diet, when, where, facts) {
            this.species = species;
            this.height = height;
            this.weight = weight;
            this.when = when;
            this.where = where;
            this.facts = facts;
            this.diet = diet;
        }

        // Compare Dino to Human Height Method
        compareDinoHeight(humanHeight) {
            let difference = this.height - humanHeight;
            let newFact = `${this.species} were ${Math.abs(difference)} inches ${difference>=0 ? 'higher' : 'smaller'} than you`;
            return newFact;
        }

        // Compare Dino to Human Weight Method
        compareDinoWeight(humanWeight) {
            let difference = this.weight - humanWeight;
            let newFact = `${this.species} were ${Math.abs(difference)} pounds ${difference>=0 ? 'heavier' : 'lighter'} than you`;
            return newFact;
        }

        // Compare Dino to Human Diet Method
        compareDinoDiet(humanDiet) {
            let sameDiet = this.diet.toLowerCase() == humanDiet;
            let newFact = '';
            if (sameDiet) {
                newFact = `${this.species} and you had the same diet. You both had a ${humanDiet} diet.`
            } else {
                newFact = `${this.species} and you had a completely different diet. ${this.species} preferred to be ${this.diet} while you prefer the ${humanDiet} diet.`
            }
            return newFact;
        }

        getProfilePic() {
            return 'images' + this.species.toLowerCase() + ".png";
        }

        addToFacts() {
         // don't forget to check if pigeon or maybe human
        }

        buildTile() {
            const displayHumanTile = dino.species.toLowerCase() == 'human';
            let mainImage = '<img src="' + this.getProfilePic() +'" />';
            let h3Title = '<h3>'+ (displayHumanTile ? dino.name : dino.species) + '</h3>';
            let heightPara = '<p>Height:' + dino.height + '</p>';
            let weightPara = '<p>Weight:' + dino.weight + '</p>';
            let dietPara = '<p>Diet:' + dino.diet + '</p>';
            return '<div class="grid-item">'+ mainImage + h3Title + heightPara + weightPara + dietPara + (!displayHumanTile ? '<div><p>' + dino.when + '</p><p>' + dino.where + '</p><p>' + dino.facts[Math.floor(Math.random() * dino.facts.length)] + '</p></div>' : '') + '</div>';
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
            // Add 3 more facts to each js object if not pigeon
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
    
    // Generate ready html grid tiles from dino objects
    function getHtml() {
        let htmlContent = '';
        dinosaurs.forEach(dino => {
            htmlContent += dino.buildTile();
        });
        return htmlContent;
    }
        
    // Remove form from screen
    function hideForm() {
        document.getElementById('dino-compare').style.display = 'none';
    }

// On button click, prepare and display infographic
submitButton.onclick = function() {

    // Create Human Object and use IIFE to get the human data from the form
    let human = (function() {
        let humanObj = {};
        humanObj.name = document.getElementById('name').value;
        humanObj.height = document.getElementById('feet').value*12+document.getElementById('inches').value;
        humanObj.weight = document.getElementById('weight').value;
        humanObj.diet = document.getElementById('diet').value.toLowerCase();;
        humanObj.species = 'Human';
        return humanObj;
    })();
    // Get the prepared array with javascript objects including human object and more facts inside each object
    getDinoObjectsFromJSON(human);

    // Add tiles to DOM
    mainGrid.innerHTML = getHtml();
    
    

    // hideForm();
};