const DOMAIN = "https://swapi.dev/api/people/";
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

// Battle arena background images
const battleArena = ["Death-Star.jpeg", "mustafar.png", "tatooine.jpeg"];

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
    exchanges++;
    if (char2.hp <= 0) break;
    
    await delay(600);
    // Character 2 attacks Character 1
    const attack2 = char2.attack();
    char1.hp -= attack2;
    updateHitPoints(char1);
    showDamage(char1, attack2);
    exchanges++;
  }

  // Display final victory message with exchanges count
  const victory = document.createElement("p");
  if (char1.hp <= 0 && char2.hp <= 0) {
    victory.innerHTML = `It's a draw! (${exchanges} exchanges)`;
  } else if (char1.hp <= 0) {
    victory.innerHTML = `${char2.name} defeated ${char1.name} in ${exchanges} exchanges!`;
  } else {
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
    const response = await axios.get(`${DOMAIN + randomCharNumber()}`);
    return gif(response.data.name).then(({ name, data }) => attributes(name, data));
  } catch (error) {
    console.error(error);
  }
};

const getCharacter2 = async () => {
  try {
    const response = await axios.get(`${DOMAIN + randomCharNumber()}`);
    return gif(response.data.name).then(({ name, data }) => attributes(name, data));
  } catch (error) {
    console.error(error);
  }
};

function startBattle() {
  // Hide replay button and clear previous messages
  replayContainer.classList.add("hidden");
  winningMessage.innerHTML = "";
  character1.innerHTML = "";
  character2.innerHTML = "";
  
  // Set a random background image for header
  const arenaImg = battleArena[Math.floor(Math.random() * battleArena.length)];
  header.style.backgroundImage = `url(images/${arenaImg})`;
  
  // Fetch two random characters
  Promise.all([getCharacter(), getCharacter2()])
    .then((characters) => {
      characters.forEach((character, index) => {
        const characterImage = character.images?.[0]?.embed_url || "images/Default.png";
        const gifElement = document.createElement("iframe");
        gifElement.src = characterImage;
        gifElement.setAttribute("allowFullScreen", "");

        const hitPoints = document.createElement("span");
        hitPoints.classList.add("hitPoints");
        hitPoints.innerHTML = character.hp;

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("wookie");
        nameDiv.innerHTML = character.name;

        // Create health bar elements
        const healthBarContainer = document.createElement("div");
        healthBarContainer.classList.add("health-bar");
        const healthFill = document.createElement("div");
        healthFill.classList.add("health-fill");
        healthFill.style.width = "100%";
        healthBarContainer.appendChild(healthFill);

        // Create container for the character block
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("character-container");
        containerDiv.appendChild(gifElement);
        containerDiv.appendChild(hitPoints);
        containerDiv.appendChild(nameDiv);
        containerDiv.appendChild(healthBarContainer);

        // Save container and element references for later updates
        character.container = containerDiv;
        character.node = hitPoints;
        character.healthBar = healthFill;

        if (index === 0) {
          character1.appendChild(containerDiv);
        } else {
          character2.appendChild(containerDiv);
        }
      });
      return characters;
    })
    .then((characters) => {
      battle(characters[0], characters[1]);
    });
}

// Attach event listeners to start/replay battle
duel.addEventListener("click", startBattle);
replayButton.addEventListener("click", startBattle);