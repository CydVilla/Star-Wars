const DOMAIN = 'https://swapi.dev/api/people/';
const GIPHY = 'https://api.giphy.com/v1/gifs/search?api_key=y7u0OVy2BP4j7Mz5Fbbs8PnHej5XE3aH&q='
const duel = document.querySelector('#duel')
const character1 = document.querySelector('#character1')
// functionExpression syntax: variable = functionName, functionName = anonymous function
const randomCharNumber = () => {
return Math.ceil(Math.random() * 83)
}
console.log(randomCharNumber())
const gif = async (name) => {
  try {
    // console.log(name)
    // const response = await axios.get(`${GIPHY + 'chewbacca'}`)
    // console.log(`${GIPHY + 'chewbacca'}`)
    return name
  } catch (error) {
    console.error(error);
  }
}
const getCharacter = async () => {
  try {
    const response = await axios.get(`${DOMAIN + randomCharNumber()}`).then(
      data => {
        // console.log(data)
        return gif(data.data.name)
      })
      .then(name => {
        return attributes(name)
      })
    console.log(response)
    return response
  } catch (error) {
    console.error(error);
  }
}
const getCharacter2 = async () => {
  try {
    const response = await axios.get(`${DOMAIN + randomCharNumber()}`);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}
const attributes = (name) => {
  return {
    name,
    hp: 100,
    attack: () => {
      let randomAttack = Math.ceil(Math.random() * 3)
      if (randomAttack > 0) {
        console.log('heavy attack', randomAttack())
      }
    }
  }
}
duel.addEventListener('click', () => {
  let char1 = getCharacter()
  char1.then(data => console.log(data))
})


// append design, create elements, create background images, after character creation add HP number..., One button for a random attack, end game script, flexbox, 