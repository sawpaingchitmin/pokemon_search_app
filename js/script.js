// Get references to all the HTML elements needed to display Pokémon details
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


// Adding an event listener to the search button for fetching Pokémon data
searchButton.addEventListener("click", (event) => {
  event.preventDefault();  // Prevents the default form submission behavior
  const input = searchInput.value.trim().toLowerCase();  // Cleans the input and converts it to lowercase

  // Fetching data from the Pokémon API using the input value
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`)
    .then((res) => {
      // Checking if the response is valid, if not, throwing an error
      if(!res.ok) {
        throw new Error("Pokémon not found");
      }
      return res.json();  // Parsing the JSON response
    })
    .then((data) => {
      // Updating DOM elements with fetched Pokémon details
      pokemonName.textContent = data.name.toUpperCase();
      pokemonId.textContent = `#${data.id}`;
      weight.textContent = `Weight: ${data.weight}`;
      height.textContent = `Height: ${data.height}`;

      // Clearing previous types and adding the new types of the fetched Pokémon
      types.innerHTML = '';
      data.types.forEach((typeInfo) => {
        const typeElement = document.createElement("div");
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        types.appendChild(typeElement);
      });
      
      // Mapping over the stats array and updating relevant stats in the DOM
      data.stats.forEach((statInfo) => {
        switch (statInfo.stat.name) {
          case 'hp':
            hp.textContent = statInfo.base_stat;
            break;
          case 'attack':
            attack.textContent = statInfo.base_stat;
            break;
          case 'defense':
            defense.textContent = statInfo.base_stat;
            break;
          case 'special-attack':
            specialAttack.textContent = statInfo.base_stat;
            break;
          case 'special-defense':
            specialDefense.textContent = statInfo.base_stat;
            break;
          case 'speed':
            speed.textContent = statInfo.base_stat;
            break;
        }
      });
      
      // Checking if the sprite image element exists, if yes, update it, if not, create it
      const sprite = document.getElementById("sprite");
      if (sprite) {
        sprite.src = data.sprites.front_default;  // Update the image source 
        spriteImage.alt = `${data.name} sprite image`;  // Update the alt attribute dynamically
      }
      else {
        const spriteImage = document.createElement("img");  // Create new image element
        spriteImage.id = "sprite";
        spriteImage.src = data.sprites.front_default;
        spriteImage.alt = `${data.name} sprite image`;  // Set alt attribute when creating
        document.querySelector(".top-container").appendChild(spriteImage);  // Append it to the container
      }
    })
    .catch((error) => {
      alert(error.message)  // Alert the user in case of an error
    });
})