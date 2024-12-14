//variables
//inputs de ul "choix_ingredients"
//tableau ingredients vide
//tableau resultat vide

const ingredients_inputs = document.querySelectorAll("#choix_ingredients input");
let ingredientsChoisis = [];
let resultPotion = [];
let storagePotions = [];
let potionTrouvee
const inputs = document.getElementsByTagName("input")
const resultatDiv = document.getElementById("resultat");


//tableau d'objets, potions répertoriées

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



//tableau d'effets pour les potions non répertoriées
const effetsAleatoires = [
    "Vous obtenez une potion qui change la couleur de vos cheveux.",
    "Votre potion émet une lumière vive pendant 30 secondes.",
    "Une potion explosive qui disparaît dans un nuage de fumée.",
    "Un liquide inoffensif, mais au goût incroyable de fraise.",
    "Une potion qui fait entendre des rires quand elle est renversée.",
    "Une potion qui transforme vos vêtements en costumes de clown.",
    "Un simple liquide qui ne fait rien d'extraordinaire.",
    "Un mélange qui chante une berceuse douce lorsque secoué.",
    "Une potion glaciale qui refroidit instantanément les boissons.",
    "Un élixir étrange qui vous donne des moustaches pendant une heure."
];


  //fonctions


//cree un nouveau tableau à chaque fois qu'un changement est effectué dans l'ul
//le changement est supporté dans le addEventListener
function update_ingredients() {
    ingredientsChoisis = Array.from(ingredients_inputs)
        .filter(ingredient => ingredient.checked)
        .map(ingredient => ingredient.value)
            
        return ingredientsChoisis
}


//regarde si un changement est fait dans chaques elements de l'ul, si changement ==> fonctions update_ingredients
ingredients_inputs.forEach(input => {
    input.addEventListener("change", update_ingredients)
});


//fonction pour vérifier si les ingrédients choisis font partie d'une potion répertoriée ou si les ingrédients on déja été choisi pour faire une potion
function isFind(potionsArray) {
  return potionsArray.find(potion => 
  potion.ingredients.every(ingredient => 
  ingredientsChoisis.includes(ingredient)) && ingredientsChoisis.length === potion.ingredients.length) // Vérifie également que les longueurs correspondent
}


//fonctions pour trouver la potion associée

function brassage_en_cours() {
  // Trouver la potion qui correspond aux ingrédients choisis
  potionTrouvee = isFind(potions)
  

  // Afficher le résultat dans le DOM
  if (potionTrouvee) {
    return resultatDiv.innerHTML = `
    <h3>${potionTrouvee.name}</h3>
    <p>${potionTrouvee.effect}</p>
    `;
  }

  if (isFind(storagePotions)){
      const ingredientsMatch = isFind(storagePotions)
      return resultatDiv.innerHTML = `
      <h3> Vous avez recréé une de vos invention !</h3>
      <p>${ingredientsMatch.effet}</p>`
      
      
  } else {
    const randomEffect = effetsAleatoires[Math.floor(Math.random() * effetsAleatoires.length)]
    storagePotions.push({"ingredients" : ingredientsChoisis, "effet" : randomEffect})
    resultatDiv.innerHTML = `
    <h3> Vous avez créer une potion inconnue ! Les effets ont l'air intéressant... </h3>
    <p>${randomEffect}</p>
    `
  }


  // else {
  //   resultatDiv.innerHTML = `
  //   <h3>Aucune potion trouvée</h3>
  //   <p>Essayez une autre combinaison d'ingrédients.</p>
  //   `;
  // }
}


function empty_potions() {
  ingredientsChoisis = [];
  Array.from(inputs).forEach(input => {
    if (input.type === "checkbox") {
      input.checked = false
    }
  })
}


document.getElementById("brassage").addEventListener("click", () => {
  brassage_en_cours();
  empty_potions();
});



