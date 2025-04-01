let loadedPokemonCount = 1;
let pokemonListGlobal = [];
const loadMoreButton = document.getElementById("load-more-button");

async function fetchPokemonData(startIndex, limit) {
  let pokemonList = [];
  for (let i = startIndex; i < startIndex + limit; i++) {
    let pokemon = await fetchSinglePokemonData(i);
    pokemonList.push(pokemon);
  }
  return pokemonList;
}

async function fetchSinglePokemonData(id) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let pokemonData = await response.json();
  let pokemonTypes = [];
  for (let j = 0; j < pokemonData.types.length; j++) {
    pokemonTypes.push(pokemonData.types[j].type.name);
  }
  return {
    name: pokemonData.name,
    types: pokemonTypes,
    image: pokemonData.sprites.other["official-artwork"].front_default,
    id: pokemonData.id,
  };
}

async function renderPokemonCards(startIndex, limit) {
  let pokemonList = await fetchPokemonData(startIndex, limit);
  for (let i = 0; i < pokemonList.length; i++) {
    pokemonListGlobal.push(pokemonList[i]);
  }
  let contentElement = document.getElementById("content");
  let cardsHTML = contentElement.innerHTML;
  for (let i = 0; i < pokemonList.length; i++) {
    cardsHTML += generatePokemonCardTemplate(
      pokemonList[i],
      loadedPokemonCount + i
    );
  }
  contentElement.innerHTML = cardsHTML;
  loadedPokemonCount += limit;
}

function loadMorePokemon() {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  loadMoreButton.disabled = true;

  renderPokemonCards(loadedPokemonCount, 20).then(() => {
    spinner.style.display = "none";
    loadMoreButton.disabled = false;
  });
}

loadMoreButton.onclick = function () {
  loadMorePokemon();
};
