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
    potion.ingredients.sort().toString() === ingredientsChoisis.sort().toString());
  
         // Vérifie également que les longueurs correspondent
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
    <iframe src="https://giphy.com/embed/vr3kkMijqm5hxwrfJ1" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/love-potion-vr3kkMijqm5hxwrfJ1"></a></p>
    `;
  }

  //si les ingredients sont dans storagePotions, affiche l'effet random qui y a été associé
  if (isFind(storagePotions)){
      const ingredientsMatch = isFind(storagePotions)
      
      return resultatDiv.innerHTML = `
      <h3> Vous avez recréé une de vos invention !</h3>
      <p>${ingredientsMatch.effet}</p>
      <iframe src="https://giphy.com/embed/vr3kkMijqm5hxwrfJ1" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/love-potion-vr3kkMijqm5hxwrfJ1"></a></p>`
      
  //potion inconnue, donne un effet aléatoire et ajoute les ingrédient + l'effet dans storagePotions
  } else {
    const randomEffect = effetsAleatoires[Math.floor(Math.random() * effetsAleatoires.length)];
    storagePotions.push({"ingredients" : ingredientsChoisis, "effet" : randomEffect});
    resultatDiv.innerHTML = `
    <h3> Vous avez créer une potion inconnue ! Les effets ont l'air intéressant... </h3>
    <p>${randomEffect}</p>
    <iframe src="https://giphy.com/embed/vr3kkMijqm5hxwrfJ1" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/love-potion-vr3kkMijqm5hxwrfJ1"></a></p>`
  }
}


//efface les cases cochées et les ingredients apres le brassage
function empty_potions() {
  ingredientsChoisis = [];
  Array.from(inputs).forEach(input => {
    if (input.type === "checkbox") {
      input.checked = false
    }
  })
}

document.getElementById("brassage").addEventListener("click", () => {
  resultatDiv.style.visibility = `hidden`;

  update_ingredients(); // Mettre à jour les ingrédients

  // if (ingredientsChoisis.length < 3) {
  //   resultatDiv.innerHTML = `<p>⚠️ Il faut au moins 3 ingrédients pour créer une potion !</p>`;
  //   resultatDiv.style.visibility = `visible`;
  //   return; // Stoppe l'exécution ici si on n'a pas assez d'ingrédients
  // }

  setTimeout(() => {
    brassage_en_cours(); 

    resultatDiv.style.visibility = `visible`;

    empty_potions(); // On efface SEULEMENT après brassage !
  }, 5000);
});



//bulles dans le background lors du brassage 
function generateBubbles() {
  const bubbleContainer = document.createElement("div");
  bubbleContainer.id = "bubble-container";
  document.body.appendChild(bubbleContainer);

  const bubbleCount = 30; // Nombre de bulles à générer

  for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      
      // Taille aléatoire
      const size = Math.random() * 60 + 30; // Entre 10px et 60px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Position aléatoire
      bubble.style.left = `${Math.random() * 100}vw`; // Entre 0% et 100% de la largeur

      // Délai aléatoire pour décaler les animations
      bubble.style.animationDelay = `${Math.random() * 2}s`;

      // Durée aléatoire pour varier les vitesses
      bubble.style.animationDuration = `${Math.random() * 3 + 2}s`; // Entre 2s et 5s

      // Couleurs aléatoires
      bubble.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;

      // Ajout d'un léger effet lumineux
      bubble.style.boxShadow = `0 0 10px ${bubble.style.background}`;


      bubbleContainer.appendChild(bubble);
  }

  setTimeout(() => {
    bubbleContainer.classList.add("fade-out")
  }, 4500)
  // Supprimer les bulles après 5 secondes (durée de l'animation + marge)
  setTimeout(() => {
    document.body.removeChild(bubbleContainer);
  }, 5000);
}

function lets_brew() {
  const drew_gif_container = document.createElement("div");
  drew_gif_container.id = "drew_gif";
  document.getElementById("resultatSection").appendChild(drew_gif_container)

  drew_gif_container.innerHTML = `
  <iframe src="https://giphy.com/embed/aaP3ZqBLqph2UvjvvV" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/magic-cooking-mixing-aaP3ZqBLqph2UvjvvV"></a></p>
  `
  setTimeout(() => {
    document.getElementById("resultatSection").removeChild(drew_gif_container);
  }, 5000);
}

// Activer les bulles pendant le brassage
document.getElementById("brassage").addEventListener("click", () => {
  lets_brew()
  generateBubbles();
});
