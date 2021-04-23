const DOMAIN = "https://swapi.dev/api/people/";
const GIPHY =
  "https://api.giphy.com/v1/gifs/search?api_key=y7u0OVy2BP4j7Mz5Fbbs8PnHej5XE3aH&q=";
// Targeting HTML on the DOM
const duel = document.querySelector("#duel");
const character1 = document.querySelector("#character1");
const character2 = document.querySelector("#character2");
const battleArena = ["Death-Star.jpeg", "mustafar.png", "tatooine.jpeg"];
const winningMessage = document.querySelector("#winningMessage")
/**
 * This function simulates the battle between the two characters
 * 
 * @param {object} character1 that represents player 1
 * @param {object} character2 that represents player 2
 */
const battle = (character1, character2) => {
  if (winningMessage.firstChild) {
    winningMessage.removeChild(winningMessage.firstChild)
  }
  // Game battle
  while (character1.hp > 0 && character2.hp > 0) {
    character1.hp -= character2.attack();
    character1.node.innerHTML = character1.hp
    character2.hp -= character1.attack();
    character2.node.innerHTML = character2.hp
  }
    if (character1.hp === 0) {
    let victory = document.createElement('p')
    victory.innerHTML = `${character2.name + ' defeated ' + character1.name + '!'}`
    winningMessage.appendChild(victory)
  } else {
    let victory = document.createElement('p')
    victory.innerHTML = `${character1.name + ' defeated ' + character2.name + '!'}`
    winningMessage.appendChild(victory)
  } 
};
/**
 * Function determines the winner
 * 
 * @param {object} character1 
 * @param {object} character2 
 */
const winner = (character1, character2) => {
  battle(character1, character2);
};
const randomCharNumber = () => {
  return Math.ceil(Math.random() * 83);
};
const gif = async (name) => {
  try {
    const response = await axios.get(`${GIPHY + name}`)
    return { name, data: response.data.data };
  } catch (error) {
    console.error(error);
  }
};
const getCharacter = async () => {
  try {
    const response = await axios
      .get(`${DOMAIN + randomCharNumber()}`)
      .then((data) => {
        return gif(data.data.name);
      })
      .then(({ name, data  }) => {
        return attributes(name, data);
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};
const getCharacter2 = async () => {
  try {
    const response = await axios
      .get(`${DOMAIN + randomCharNumber()}`)
      .then((data) => {
        return gif(data.data.name);
      })
      .then(({ name, data }) => {
        return attributes(name, data);
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};
const attributes = (name, data) => {
  return {
    name,
    hp: 100,
    attack: () => {
      let randomAttack = Math.ceil(Math.random() * 3);
      if (randomAttack > 0) {
        return randomAttack;
      }
    },
    images: data
  };
};
duel.addEventListener("click", () => {
  while (character1.firstChild) {
    character1.removeChild(character1.firstChild);
  }
  while (character2.firstChild) {
    character2.removeChild(character2.firstChild);
  }
  let header = document.querySelector("#header");
  let battleArenaImage =
    battleArena[Math.ceil(Math.random() * battleArena.length - 1)];
  header.style.backgroundImage = `url(images/${battleArenaImage})`;
  Promise.all([getCharacter(), getCharacter2()])
    .then((values) => {
      values.forEach((character, index) => {
        let characterImage = character.images[0].embed_url?character.images[0].embed_url:'images/Default.png'
        if (index == "0") {
          let name = document.createElement("div");
          let gif = document.createElement('iframe')
          gif.src = characterImage
          character1.appendChild(gif)
          name.classList.add('wookie')
          let hitPoints = document.createElement("span");
          hitPoints.classList.add('hitPoints')
          hitPoints.innerHTML = character.hp;
          character1.appendChild(hitPoints);
          name.innerHTML = character.name;
          character1.appendChild(name);
          character.node = hitPoints
        } else {
          let name = document.createElement("div");
          let gif = document.createElement('iframe')
          gif.src = characterImage
          character2.appendChild(gif)
          name.classList.add('wookie')
          let hitPoints = document.createElement("span");
          hitPoints.classList.add('hitPoints')
          hitPoints.innerHTML = character.hp;
          character2.appendChild(hitPoints);
          name.innerHTML = character.name;
          character2.appendChild(name);
          character.node = hitPoints
        }
      });
      return values;
    })
    .then((characters) => {
      winner(characters[0], characters[1]);
    });
});