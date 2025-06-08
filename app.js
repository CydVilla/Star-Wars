const DOMAIN = "https://swapi.tech/api/people/";
const GIPHY =
  "https://api.giphy.com/v1/gifs/search?api_key=y7u0OVy2BP4j7Mz5Fbbs8PnHej5XE3aH&q=";

// DOM Elements
const duel = document.querySelector("#duel");
const character1 = document.querySelector("#character1");
const character2 = document.querySelector("#character2");
const winningMessage = document.querySelector("#winningMessage");
const header = document.querySelector("#header");
const replayContainer = document.querySelector("#replayContainer");
const replayButton = document.querySelector("#replay");
const themeToggle = document.querySelector("#themeToggle");
const soundToggle = document.querySelector("#soundToggle");
const player1Select = document.querySelector("#player1Select");
const player2Select = document.querySelector("#player2Select");
const loadingSpinner = document.querySelector(".loading-spinner");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const randomizeBtn = document.getElementById("randomize");

// Audio elements
const laserSound = new Audio("laser.mp3");
laserSound.volume = 0.15; // Lower volume
const themeMusic = new Audio("Star Wars Main Theme Remake (MIDI).mp3");
themeMusic.loop = true;

// Battle arena background images
const battleArena = ["Death-Star.jpeg", "mustafar.png", "tatooine.jpeg"];

// Game state
let scores = { player1: 0, player2: 0 };
let soundEnabled = true;
let themeEnabled = true;
let availableCharacters = [];
let lastLaserTime = 0;
let battleInProgress = false;

// Theme management
function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  themeToggle.querySelector(".theme-icon").textContent = newTheme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", newTheme);
}

// Sound management
function toggleSound() {
  soundEnabled = !soundEnabled;
  soundToggle.querySelector(".sound-icon").textContent = soundEnabled ? "🔊" : "🔇";
  localStorage.setItem("soundEnabled", soundEnabled);
  if (!soundEnabled) {
    themeMusic.pause();
    laserSound.pause();
  } else {
    // Only play theme music if a battle is active (i.e., character containers are not empty)
    if (character1.children.length > 0 && character2.children.length > 0) {
      themeMusic.play().catch(() => {});
    }
  }
}

function playSound(sound) {
  if (soundEnabled) {
    // Add cooldown for laser sound
    if (sound === laserSound) {
      const now = Date.now();
      if (now - lastLaserTime < 500) return;
      lastLaserTime = now;
    }
    sound.currentTime = 0;
    sound.play().catch(error => console.log("Audio playback failed:", error));
  }
}

// Character selection
async function loadCharacters() {
  try {
    loadingSpinner.classList.remove("hidden");
    const response = await axios.get(`${DOMAIN}`);
    const totalPages = Math.ceil(response.data.count / 10);
    const characters = [];

    for (let page = 1; page <= totalPages; page++) {
      const pageResponse = await axios.get(`${DOMAIN}?page=${page}`);
      characters.push(...pageResponse.data.results);
    }

    availableCharacters = characters;
    populateCharacterSelects();
    loadingSpinner.classList.add("hidden");
  } catch (error) {
    console.error("Error loading characters:", error);
    loadingSpinner.classList.add("hidden");
  }
}

function populateCharacterSelects() {
  const options = availableCharacters.map(char => 
    `<option value="${char.url}">${char.name}</option>`
  ).join("");

  player1Select.innerHTML = "<option value=''>Select Character</option>" + options;
  player2Select.innerHTML = "<option value=''>Select Character</option>" + options;
}

/**
 * Updates the hit points and health bar of a character, and triggers animations.
 * @param {object} character - The character object.
 */
function updateHitPoints(character) {
  if (character.node && character.healthBar) {
    // Update hit points text (ensure not negative)
    character.node.innerHTML = character.hp > 0 ? character.hp : 0;
    // Update health bar width based on remaining HP
    const percentage = Math.max((character.hp / character.maxHp) * 100, 0);
    character.healthBar.style.width = `${percentage}%`;
    // Add attack animation to hit points element
    character.node.classList.add("attacked");
    // Add flash to the container
    if (character.container) {
      character.container.classList.add("flash");
      setTimeout(() => {
        character.container.classList.remove("flash");
      }, 200);
    }
    setTimeout(() => {
      character.node.classList.remove("attacked");
    }, 300);
  }
}

/**
 * Displays a temporary damage popup showing the damage dealt.
 * @param {object} character - The character object.
 * @param {number} damage - Damage value.
 */
function showDamage(character, damage) {
  const popup = document.createElement("div");
  popup.classList.add("damage-popup");
  popup.textContent = `-${damage}`;
  // Ensure container is positioned relatively
  character.container.style.position = "relative";
  character.container.appendChild(popup);
  setTimeout(() => {
    if (character.container.contains(popup)) {
      character.container.removeChild(popup);
    }
  }, 800);
}

/**
 * Simulate a battle between two characters.
 * Each attack is delayed by 300ms.
 * The match ends when one character's HP reaches 0.
 */
const battle = async (char1, char2) => {
  winningMessage.innerHTML = "";
  let exchanges = 0;
  // Increase delay to 600ms for a longer exchange duration
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  while (char1.hp > 0 && char2.hp > 0) {
    await delay(600);
    // Character 1 attacks Character 2
    const attack1 = char1.attack();
    char2.hp -= attack1;
    updateHitPoints(char2);
    showDamage(char2, attack1);
    playSound(laserSound);
    exchanges++;
    if (char2.hp <= 0) break;
    
    await delay(600);
    // Character 2 attacks Character 1
    const attack2 = char2.attack();
    char1.hp -= attack2;
    updateHitPoints(char1);
    showDamage(char1, attack2);
    playSound(laserSound);
    exchanges++;
  }

  // Display final victory message with exchanges count
  const victory = document.createElement("p");
  if (char1.hp <= 0 && char2.hp <= 0) {
    victory.innerHTML = `It's a draw! (${exchanges} exchanges)`;
  } else if (char1.hp <= 0) {
    scores.player2++;
    player2Score.textContent = scores.player2;
    victory.innerHTML = `${char2.name} defeated ${char1.name} in ${exchanges} exchanges!`;
  } else {
    scores.player1++;
    player1Score.textContent = scores.player1;
    victory.innerHTML = `${char1.name} defeated ${char2.name} in ${exchanges} exchanges!`;
  }
  winningMessage.appendChild(victory);

  // Reveal replay button
  replayContainer.classList.remove("hidden");
};

/**
 * Returns a random number between 1 and 83.
 */
const randomCharNumber = () => Math.ceil(Math.random() * 83);

/**
 * Retrieves gif data for a character using the Giphy API.
 * @param {string} name - Character name.
 */
const gif = async (name) => {
  try {
    const response = await axios.get(`${GIPHY + name}`);
    return { name, data: response.data.data };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns a character object with attributes.
 * Starting HP is now 50.
 */
const attributes = (name, data) => {
  return {
    name,
    hp: 50,
    maxHp: 50,
    attack: () => Math.floor(Math.random() * 6) + 10, // Damage: 10-15
    images: data,
    container: null, // Will hold the character's container DOM element
    node: null,      // Hit points element
    healthBar: null, // Health bar fill element
  };
};

const getCharacter = async () => {
  try {
    const response = await axios.get(`${DOMAIN}${randomCharNumber()}`);
    const name = response.data.result.properties.name;
    return gif(name).then(({ name, data }) => attributes(name, data));
  } catch (error) {
    console.error(error);
  }
};

const getCharacter2 = async () => {
  try {
    const response = await axios.get(`${DOMAIN}${randomCharNumber()}`);
    const name = response.data.result.properties.name;
    return gif(name).then(({ name, data }) => attributes(name, data));
  } catch (error) {
    console.error(error);
  }
};

async function startBattle() {
  if (battleInProgress) return;
  battleInProgress = true;
  duel.disabled = true;
  replayButton.disabled = true;

  replayContainer.classList.add("hidden");
  winningMessage.innerHTML = "";
  character1.innerHTML = "";
  character2.innerHTML = "";
  
  const arenaImg = battleArena[Math.floor(Math.random() * battleArena.length)];
  header.style.backgroundImage = `url(images/${arenaImg})`;
  
  if (themeEnabled) {
    playSound(themeMusic);
  }

  try {
    loadingSpinner.classList.remove("hidden");
    const [char1, char2] = await Promise.all([
      getCharacter(),
      getCharacter2()
    ]);

    [char1, char2].forEach((character, index) => {
      const characterImage = character.images?.[0]?.embed_url || "images/Default.png";
      const containerDiv = document.createElement("div");
      containerDiv.classList.add("character-container");
      
      containerDiv.innerHTML = `
        <iframe src="${characterImage}" allowFullScreen></iframe>
        <span class="hitPoints">${character.hp}</span>
        <div class="wookie">${character.name}</div>
        <div class="health-bar">
          <div class="health-fill" style="width: 100%"></div>
        </div>
      `;

      // Add slide-in animation classes for mobile
      if (window.innerWidth <= 700) {
        if (index === 0) {
          containerDiv.classList.add("slide-in-left");
        } else {
          containerDiv.classList.add("slide-in-right");
        }
        // Remove the class after animation so it can be re-triggered
        containerDiv.addEventListener('animationend', () => {
          containerDiv.classList.remove("slide-in-left", "slide-in-right");
        }, { once: true });
      }

      character.container = containerDiv;
      character.node = containerDiv.querySelector(".hitPoints");
      character.healthBar = containerDiv.querySelector(".health-fill");

      if (index === 0) {
        character1.appendChild(containerDiv);
      } else {
        character2.appendChild(containerDiv);
      }
    });

    loadingSpinner.classList.add("hidden");
    await battle(char1, char2);
  } catch (error) {
    console.error("Error starting battle:", error);
    loadingSpinner.classList.add("hidden");
  }

  duel.disabled = false;
  replayButton.disabled = false;
  battleInProgress = false;
}

function init() {
  // Load saved preferences
  const savedTheme = localStorage.getItem("theme") || "dark";
  const savedSound = localStorage.getItem("soundEnabled");
  
  document.body.setAttribute("data-theme", savedTheme);
  themeToggle.querySelector(".theme-icon").textContent = savedTheme === "dark" ? "🌙" : "☀️";
  
  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
    soundToggle.querySelector(".sound-icon").textContent = soundEnabled ? "🔊" : "🔇";
  }

  duel.addEventListener("click", startBattle);
  replayButton.addEventListener("click", startBattle);
  themeToggle.addEventListener("click", toggleTheme);
  soundToggle.addEventListener("click", toggleSound);
}

init();