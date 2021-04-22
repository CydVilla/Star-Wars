const DOMAIN = "https://swapi.dev/api/people/";
const GIPHY =
  "https://api.giphy.com/v1/gifs/search?api_key=y7u0OVy2BP4j7Mz5Fbbs8PnHej5XE3aH&q=";
const duel = document.querySelector("#duel");
const character1 = document.querySelector("#character1");
const character2 = document.querySelector("#character2");
const battleArena = ["Death-Star.jpeg", "mustafar.png", "tatooine.jpeg"];
const winningMessage = document.querySelector("#winningMessage")
const battle = (character1, character2) => {
  if (winningMessage.firstChild) {
    winningMessage.removeChild(winningMessage.firstChild)
  }
  console.log("battle", character1.hp);
  while (character1.hp > 0 && character2.hp > 0) {
    character1.hp -= character2.attack();
    character1.node.innerHTML = character1.hp
    character2.hp -= character1.attack();
    character2.node.innerHTML = character2.hp
  }
  console.log(typeof character1.hp, typeof character2.hp);
  if (character1.hp === 0) {
    console.log(character2.name + " is the victor!");
    let victory = document.createElement('p')
    victory.innerHTML = `${character2.name + ' defeated ' + character1.name + '!'}`
    winningMessage.appendChild(victory)
  } else {
    console.log(character1.name + " is the victor!");
    let victory = document.createElement('p')
    victory.innerHTML = `${character1.name + ' defeated ' + character2.name + '!'}`
    winningMessage.appendChild(victory)
  } 
};
const winner = (character1, character2) => {
  battle(character1, character2);
};
// functionExpression syntax: variable = functionName, functionName = anonymous function
const randomCharNumber = () => {
  return Math.ceil(Math.random() * 83);
};
console.log(randomCharNumber());
const gif = async (name) => {
  try {
    // console.log(name)
    const response = await axios.get(`${GIPHY + name}`)
    // console.log(`${GIPHY + 'chewbacca'}`)
    console.log(response)
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
        // console.log(data)
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
        // console.log(data)
        return gif(data.data.name);
      })
      .then(({ name, data }) => {
        return attributes(name, data);
      });
    return response;
    // console.log(response);
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
  let body = document.querySelector("body");
  let battleArenaImage =
    battleArena[Math.ceil(Math.random() * battleArena.length - 1)];
  body.style.backgroundImage = `url(images/${battleArenaImage})`;
  // let char1 = getCharacter()
  // char1.then(data => console.log(data))
  Promise.all([getCharacter(), getCharacter2()])
    .then((values) => {
      values.forEach((character, index) => {
        console.log(character);
        let randomIndex = Math.floor(Math.random() * character.images.length)
        let characterImage = character.images[0].embed_url
        console.log(characterImage)
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
      console.log(characters);
      winner(characters[0], characters[1]);
    });
});

// append design, create elements, create background images, after character creation add HP number..., One button for a random attack, end game script, flexbox,
// store the name of the images in an array as a const file at the top
// ex: 'fileName.ext' store inside css img folder
// inside of the button, randomly generate a number to generate one of the images
// target body and add background-url that has image path
// Optimized for non-monitor display
