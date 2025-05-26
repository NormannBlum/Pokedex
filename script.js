/**
 * Tracks the total number of Pokémon that have been loaded and displayed.
 * It's initialized to 1 because Pokémon API IDs start from 1.
 * This counter is used as the starting index for fetching subsequent batches.
 * @type {number}
 */
let loadedPokemonCount = 1;

/**
 * A global array that accumulates all fetched Pokémon data objects.
 * This list is used for rendering and filtering operations, serving as the
 * client-side source of truth once Pokémon are loaded.
 * @type {Array<object>}
 */
let pokemonListGlobal = [];

/**
 * A reference to the "Load More" button DOM element.
 * @type {HTMLButtonElement}
 */
const loadMoreButton = document.getElementById("load-more-button");

/**
 * Fetches data for a batch of Pokémon from the PokeAPI within a specified range.
 * This function orchestrates multiple individual fetches by repeatedly calling `WorkspaceSinglePokemonData`.
 *
 * @async
 * @param {number} startIndex - The Pokédex ID to start fetching from.
 * @param {number} limit - The number of Pokémon to fetch in this batch.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of simplified Pokémon data objects.
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
 * Fetches raw data for a single Pokémon by its ID from the PokeAPI and transforms it
 * into a simplified, structured object suitable for this application.
 *
 * @async
 * @param {number} id - The Pokédex ID of the Pokémon to fetch.
 * @returns {Promise<object>} A promise that resolves to a simplified Pokémon object
 * containing name, types, image, and id.
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
 * Fetches and renders a new batch of Pokémon cards into the DOM.
 * It updates the global Pokémon list, generates the HTML for the new cards,
 * appends them to the content container, and updates the loaded Pokémon count.
 *
 * @async
 * @param {number} startIndex - The starting Pokédex ID for fetching the new batch.
 * @param {number} limit - The number of Pokémon to load and render.
 * @returns {Promise<void>} A promise that resolves when the rendering process is complete.
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
 * Handles the "Load More" button click event.
 * It manages the UI state by showing a loading spinner and disabling the button
 * to prevent concurrent fetches. Once the new Pokémon are rendered, it resets the UI.
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
 * Assigns the primary click event handler to the "Load More" button,
 * linking it to the `loadMorePokemon` function.
 */
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
