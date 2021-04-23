# Project Overview

## Project Name

Star Wars GIPHY Battle 

## Project Description

This project will pit two Star Wars characters against each other in an epic battle. 

## API and Data Sample

I will be utilizing the Star Wars API "SWAPI."

```
"count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "name": "Leia Organa",
            "height": "150",
            "mass": "49",
            "hair_color": "brown",
            "skin_color": "light",
            "eye_color": "brown",
            "birth_year": "19BBY",
            "gender": "female",
	    
 ```


## Wireframes

https://wireframe.cc/pro/pp/ed9e19e5f433452

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  

#### MVP 

- Find an API with ample data
- Create a button that extract's data from the API randomly
- Add a site background image related to Star Wars
- Use Star Wars esque font
- Use axios to make an API call
- Utilize flexbox 

#### PostMVP  
- Add music
- Add gifs and other animations to the site
- Add random background images

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|April 16-18| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|April 19| Project Approval | Incomplete
|April 20| Core Application Structure (HTML, CSS, etc.) | Incomplete
|April 20| Pseudocode / actual code | Incomplete
|April 21| Initial Clickable Model  | Incomplete
|April 22| MVP | Incomplete
|April 23| Presentations | Incomplete

## Priority Matrix

https://lucid.app/lucidchart/invitations/accept/inv_4b34903c-06a7-450f-8ffd-4965c415f915?viewport_loc=-90%2C-7%2C1579%2C753%2C0_0

## Timeframes

| Component | Priority | Estimated Time | Time Invested ||
| --- | :---: |  :---: | :---: | :---: |
| Adding body content | H | 5hrs| 3hrs |  |
| Applying background images | H | 3hrs| 2hrs |  |
| Working with API | H | 5hrs| 5hrs |  |
| Formatting the site | H | 6hrs| 4hrs |  |
| Applying user feedback content | H | 2hrs| 1hrs |  |
| Incoorperating flexbox | H | 3hrs| 2hrs ||
| Heavy CSS/JS styling | L | 6hrs| 8hrs |  |
| Adding Gif content | L | 10hrs| 11hrs |  |
| Total |  | 40hrs| 36hrs |  


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// 
}
``` Promise.all([getCharacter(), getCharacter2()])
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

    This code is essentially saying to use my "Default.PNG" in a situtation that GIPHY cannot provide a GIF from index[0], instead of having an unattractive 404, my combatants will get to use the default should one not be availible to me. 

## Change Log
 - Orignally, my project was going to determine what Star Wars character you are, upon further reflections, it changed into a combat simualator, because that is way cooler. 
 - I planned to include a more dynamic HP bar that visibly showed life depleting, it was scrapped for time.
 - A tie fighter flying across the screen was scrapped for time.
 - Loading animations were scrapped for time. 
