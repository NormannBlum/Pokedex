async function fetchPokemonData() {
  let pokemonList = [];

  for (let i = 1; i <= 20; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let pokemon = await response.json();
    pokemonList.push({
      name: pokemon.name,
      type: pokemon.types[0].type.name,
      image: pokemon.sprites.front_default,
      id: pokemon.id,
    });
  }

  renderPokemonCards(pokemonList);
}

function renderPokemonCards(pokemonList) {
  let contentElement = document.getElementById("content");
  let cardsHTML = "";

  for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];

    cardsHTML += `
          <div class="pokemon-card ${pokemon.type}">
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>Type: ${pokemon.type}</p>
          </div>
        `;
  }

  contentElement.innerHTML = cardsHTML;
}
