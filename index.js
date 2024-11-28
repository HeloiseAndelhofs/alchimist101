//variables
//inputs de ul "choix_ingredients"
//tableau ingredients vide
//tableau resultat vide

const ingredients_inputs = document.querySelectorAll("#choix_ingredients input");
console.log(ingredients_inputs);
let ingredientsChoisis = [];
let resultPotion = [];

//tableau d'objets, potions créées

const potions = [
    {
      name: "Potion de Vol",
      effect: "Permet de voler pendant 10 minutes.",
      ingredients: ["Plumes de Phénix", "Liquide bleu inconnu", "Moustaches de chat"]
    },
    {
      name: "Potion de Force",
      effect: "Augmente la force physique temporairement.",
      ingredients: ["Diamant", "Liquide vert inconnu", "Ailes de chauve-souris"]
    },
    {
      name: "Potion de Guérison",
      effect: "Soigne les blessures et restaure l'énergie.",
      ingredients: ["Pétale de fleur", "Corne de licorne", "Liquide orange inconnu"]
    },
    {
      name: "Potion d'Invisibilité",
      effect: "Rend invisible pendant 5 minutes.",
      ingredients: ["Moustaches de chat", "Ailes de chauve-souris", "Liquide vert inconnu"]
    },
    {
      name: "Potion de Sagesse",
      effect: "Accroît temporairement l'intelligence.",
      ingredients: ["Plumes de Phénix", "Pétale de fleur", "Diamant"]
    },
    {
      name: "Potion de Transformation",
      effect: "Permet de se transformer en dragon.",
      ingredients: ["Corne de licorne", "Liquide bleu inconnu", "Plumes de Phénix"]
    }
  ];


//fonctions


//cree un nouveau tableau à chaque fois qu'un changement est effectué dans l'ul
//le changement est supporté dans le addEventListener
function update_ingredients() {
    ingredientsChoisis = Array.from(ingredients_inputs)
        .filter(ingredient => ingredient.checked)
        .map(ingredient => ingredient.value)
    
    console.log(ingredientsChoisis);
        
        return ingredientsChoisis
}


//regarde si un changement est fait dans chaques elements de l'ul, si changement ==> fonctions update_ingredients
ingredients_inputs.forEach(input => {
    input.addEventListener("change", update_ingredients)
})

// console.log(ingredients);

function brassage_en_cours() {
    console.log("Ingrédients choisis " + ingredientsChoisis);
    
    // resultPotion = potions.find(potion => potion.ingredients.includes(ingredientsChoisis))

    // potions.forEach(potion => {
    //     potion.ingredients
    // });

    console.log("Potion " + resultPotion);
    
    return resultPotion
}

document.getElementById("brassage").addEventListener("click", brassage_en_cours)
