// Important html element selectors
const submitButton = document.querySelector('#dino-compare #btn');
const mainGrid = document.getElementById('grid');
const mainForm = document.getElementById('dino-compare');
const newInfoButton = document.getElementById('new-infographic');
const formName = document.getElementById('name');
const formFeet = document.getElementById('feet');
const formInches = document.getElementById('inches');
const formWeight = document.getElementById('weight');
const formDiet = document.getElementById('diet');

// An array to hold javascript dinosaur objects
const dinosaurs = [];
// A variable to hold a human object
let human = '';

// Dino Class Constructor
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
    compareDinoHeight() {
        let difference = this.height - human.height;
        let newFact = `${this.species} were ${Math.abs(difference)} inches ${difference>=0 ? 'higher' : 'smaller'} than you`;
        return newFact;
    }

    // Compare Dino to Human Weight Method
    compareDinoWeight() {
        let difference = this.weight - human.weight;
        let newFact = `${this.species} were ${Math.abs(difference)} pounds ${difference>=0 ? 'heavier' : 'lighter'} than you`;
        return newFact;
    }

    // Compare Dino to Human Diet Method
    compareDinoDiet() {
        let sameDiet = this.diet.toLowerCase() == human.diet;
        let newFact = '';
        if (sameDiet) {
            newFact = `${this.species} and you had the same diet. You both had a ${human.diet} diet.`
        } else {
            newFact = `${this.species} and you had a completely different diet. ${this.species} preferred to be ${this.diet} while you prefer the ${human.diet} diet.`
        }
        return newFact;
    }

    // Get profile pic URLs
    getProfilePic() {
        return 'images/' + this.species.toLowerCase() + ".png";
    }

    // Add 3 more facts to dinos if not pigeon species
    addToFacts() {
        if (this.species.toLowerCase() != "pigeon") {
            this.facts.push(this.compareDinoHeight(), this.compareDinoWeight(),this.compareDinoDiet());
        }
    }

    // Choose a random fact if not human
    randomFact() {
        if (this.species.toLowerCase() != "human") {
            return this.facts[Math.floor(Math.random() * this.facts.length)];
        }
    }

    // Build a tile
    buildTile() {
        const displayHumanTile = this.species.toLowerCase() == 'human';
        let mainImage = '<img src="' + this.getProfilePic() +'" />';
        let h3Title = '<h3>'+ (displayHumanTile ? this.name : this.species) + '</h3>';
        return '<div class="grid-item">'+ h3Title + mainImage + (!displayHumanTile ? '<div><p>' + this.randomFact() + '</p></div>' : '') + '</div>';
    }
}

// Human Constructor Class
class Human extends Dino {
    constructor(name, height, weight, diet, species) {
        super(species, height, weight, diet);
        this.name = name;
    }
}

// Get dino.json file contents and save them to an array of objects
(async function createDinoObjects() {
    const jsonResponse = await fetch('./dino.json'); 
    const dinoDataFromJson = await jsonResponse.json(); 
    // Creating javascript objects out of fetched json objects
    dinoDataFromJson.Dinos.forEach((dino) => {
        // Saving an object to the global dinosaurs variable
        dinosaurs.push(new Dino(dino.species, dino.height, dino.weight, dino.diet, dino.when, dino.where, dino.facts)); 
    });
})();

// Shuffle array objects and push human
function randomizeArray() {
    const pigeonObj = dinosaurs.pop();
    dinosaurs.sort(() => Math.random() - 0.5);
    dinosaurs.push(pigeonObj);
    dinosaurs.splice(4,0,human);
}

// Generate ready html grid tiles from dino objects
function getHtml() {
    let htmlContent = '';
    randomizeArray();
    dinosaurs.forEach(dino => {
        (dino.species.toLowerCase() != "human") ? dino.addToFacts() : '';
        htmlContent += dino.buildTile();
    });
    return htmlContent;
}
    
// Remove form from screen
function hideForm() {
    mainForm.style.display = 'none';
    newInfoButton.style.display = 'block';
}

// Form validation
function formValidate() {
    if( formName.value == "" ) {
        alert( "Please provide your name!" );
        formName.focus() ;
        return false;
    }
    if((formFeet.value == "") || (formFeet.value < 0)) {
        alert( "Feet value should not be empty or negative number!");
        formFeet.focus() ;
        return false;
    }
    if((formWeight.value == "") || (formWeight.value < 0)) {
        alert( "Weight value should not be empty or negative number");
        formWeight.focus();
        return false;
    }
    return( true );
}

// On button click, prepare and display infographic
submitButton.onclick = function() {
    if (formValidate()) {
        // Use IIFE to get the human data from the form
        human = (function() {
            const name = formName.value;
            const height = formFeet.value*12+formInches.value;
            const weight = formWeight.value;
            const diet = formDiet.value.toLowerCase();
            const species = 'Human';
            return new Human(name, height, weight, diet, species);
        })();
        // Add human object into dinosaurs array

        // Add tiles to DOM
        mainGrid.innerHTML = getHtml();
        
        // Hide the form and display generate a new infographic button
        hideForm();
    }
};

// on generate a new infograpich button click, reload the page
newInfoButton.onclick = function() {
    location.reload();
}
