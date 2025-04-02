/**
 * Tracks the number of Pokémon currently loaded.
 * Starts at 1 to avoid API errors (Pokémon IDs start from 1).
 * @type {number}
 */
let loadedPokemonCount = 1;

/**
 * Global list storing all loaded Pokémon data.
 * Used for rendering and filtering.
 * @type {Array<Object>}
 */
let pokemonListGlobal = [];

/**
 * Button element used to trigger loading more Pokémon.
 * @type {HTMLButtonElement}
 */
const loadMoreButton = document.getElementById("load-more-button");

/**
 * Fetches a list of Pokémon data from the API based on a given range.
 *
 * @param {number} startIndex - The starting index of the Pokémon to fetch.
 * @param {number} limit - The number of Pokémon to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves to a list of Pokémon objects.
 */
async function fetchPokemonData(startIndex, limit) {
  let pokemonList = [];
  for (let i = startIndex; i < startIndex + limit; i++) {
    let pokemon = await fetchSinglePokemonData(i);
    pokemonList.push(pokemon);
  }
  return pokemonList;
}

/**
 * Fetches a single Pokémon's data from the API by ID.
 *
 * @param {number} id - The Pokémon ID to fetch.
 * @returns {Promise<Object>} A promise that resolves to a simplified Pokémon object.
 */
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

/**
 * Renders Pokémon cards into the DOM based on fetched data.
 * Updates the global list and the inner HTML of the content container.
 *
 * @param {number} startIndex - The starting index for fetching Pokémon.
 * @param {number} limit - The number of Pokémon to load and render.
 * @returns {Promise<void>} A promise that resolves when rendering is complete.
 */
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

/**
 * Loads more Pokémon by triggering the rendering function and showing a loading spinner.
 * Disables the load button during the fetch and re-enables it afterward.
 */
function loadMorePokemon() {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  loadMoreButton.disabled = true;

  renderPokemonCards(loadedPokemonCount, 20).then(() => {
    spinner.style.display = "none";
    loadMoreButton.disabled = false;
  });
}

/**
 * Assigns the click handler to the "Load more" button to trigger Pokémon loading.
 */
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
