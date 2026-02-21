const editor = document.getElementById('editor');
const bar = document.getElementById('stamina-bar');
const emoji = document.getElementById('plant-emoji');
let stamina = 100;
let isStarted = false;

// 1. Faire baisser la vie toutes les secondes
const gameLoop = setInterval(() => {
    if (!isStarted) return;

    stamina -= 1.5; // La vitesse à laquelle ça baisse
    if (stamina < 0) stamina = 0;

    updateUI();

    if (stamina === 0) {
        document.body.classList.add('dead-mode');
        // Optionnel : Alerte ou Reset
    }
}, 1000);

// 2. Remonter la vie quand on tape
editor.addEventListener('input', () => {
    if (!isStarted) isStarted = true;
    
    stamina += 4; // Bonus de vie par caractère tapé
    if (stamina > 100) stamina = 100;
    
    updateUI();
});

// 3. Mettre à jour le visuel
function updateUI() {
    bar.style.width = stamina + "%";
    
    // Changer l'emoji selon la stamina
    if (stamina > 70) emoji.innerText = "🌳";
    else if (stamina > 30) emoji.innerText = "🌿";
    else if (stamina > 0) emoji.innerText = "🌱";
    else emoji.innerText = "🍂";

    // Effet visuel de "fatigue"
    emoji.style.opacity = (stamina / 100) + 0.2;
}