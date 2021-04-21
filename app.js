const DOMAIN = "https://swapi.dev/api/people/";
const GIPHY =
  "https://api.giphy.com/v1/gifs/search?api_key=y7u0OVy2BP4j7Mz5Fbbs8PnHej5XE3aH&q=";
const duel = document.querySelector("#duel");
const character1 = document.querySelector("#character1");
const character2 = document.querySelector("#character2");
const battleArena = ["Death-Star.jpeg", "mustafar.png", "tatooine.jpeg"];
const battle = (character1, character2) => {
  console.log("battle", character1.hp);
  while (character1.hp > 0 && character2.hp > 0) {
    character1.hp -= character2.attack();
    character2.hp -= character1.attack();
  }
  console.log(typeof character1.hp, typeof character2.hp);
  if (character1.hp === 0) {
    console.log(character2.name + "is the victor!");
  } else {
    console.log(character1.name + "is the victor!");
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
    // const response = await axios.get(`${GIPHY + 'chewbacca'}`)
    // console.log(`${GIPHY + 'chewbacca'}`)
    return name;
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
      .then((name) => {
        return attributes(name);
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
      .then((name) => {
        return attributes(name);
      });
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};
const attributes = (name) => {
  return {
    name,
    hp: 100,
    attack: () => {
      let randomAttack = Math.ceil(Math.random() * 3);
      if (randomAttack > 0) {
        return randomAttack;
      }
    },
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
        console.log(character.hp);
        if (index == "0") {
          let name = document.createElement("div");
          let hitPoints = document.createElement("span");
          hitPoints.innerHTML = character.hp;
          character1.appendChild(hitPoints);
          name.innerHTML = character.name;
          character1.appendChild(name);
        } else {
          let name = document.createElement("div");
          let hitPoints = document.createElement("span");
          hitPoints.innerHTML = character.hp;
          character2.appendChild(hitPoints);
          name.innerHTML = character.name;
          character2.appendChild(name);
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
