/**
 * Index of the currently displayed Pokémon in the global list.
 * @type {number}
 */
let currentIndex = 0;

/**
 * DOM element representing the overlay container.
 * @type {HTMLElement}
 */
const overlay = document.getElementById("overlay");

/**
 * DOM element representing the Pokémon image inside the overlay.
 * @type {HTMLImageElement}
 */
const overlayImg = document.getElementById("overlay-img");

/**
 * Sets the basic Pokémon information (image, name, ID, types) in the overlay.
 *
 * @param {Object} pokemonData - The basic data of the Pokémon.
 * @param {string} pokemonData.image - URL to the Pokémon's image.
 * @param {number} pokemonData.id - The Pokémon's ID.
 * @param {string} pokemonData.name - The Pokémon's name.
 * @param {string[]} pokemonData.types - Array of Pokémon type names.
 */
function setBasicOverlayInfo(pokemonData) {
  overlayImg.src = pokemonData.image;
  document.getElementById(
    "overlay-pokemon-id"
  ).innerHTML = `#${pokemonData.id}`;
  document.getElementById("overlay-pokemon-name").innerHTML = pokemonData.name;
  const typeIconsContainer = document.getElementById("overlay-type-icons");
  typeIconsContainer.innerHTML = generateOverlayTypeIcons(pokemonData.types);
}

/**
 * Fetches additional Pokémon details (height, weight, base experience, abilities)
 * from the API and sets them in the overlay.
 *
 * @param {number} id - The ID of the Pokémon to fetch details for.
 * @returns {Promise<void>}
 */
async function fetchAndSetPokemonDetails(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  document.getElementById("overlay-pokemon-height").innerHTML = `${
    data.height / 10
  } m`;
  document.getElementById("overlay-pokemon-weight").innerHTML = `${
    data.weight / 10
  } kg`;
  document.getElementById("overlay-pokemon-base-exp").innerHTML =
    data.base_experience;

  let abilities = "";
  for (let i = 0; i < data.abilities.length; i++) {
    if (i > 0) abilities += ", ";
    abilities += data.abilities[i].ability.name;
  }
  document.getElementById("overlay-pokemon-abilities").innerHTML = abilities;
}

/**
 * Opens the overlay for a selected Pokémon by index and loads its data.
 *
 * @param {number} index - 1-based index of the Pokémon in the global list.
 * @returns {Promise<void>}
 */
async function openOverlay(index) {
  currentIndex = index - 1;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  await fetchAndSetPokemonDetails(pokemonData.id);
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Pokémon overlay and resets body scroll behavior.
 */
function closeOverlay() {
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

/**
 * Navigates to the previous Pokémon in the list and updates the overlay.
 */
function prevImage() {
  currentIndex =
    (currentIndex - 1 + pokemonListGlobal.length) % pokemonListGlobal.length;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

/**
 * Navigates to the next Pokémon in the list and updates the overlay.
 */
function nextImage() {
  currentIndex = (currentIndex + 1) % pokemonListGlobal.length;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

/**
 * Closes the overlay when the background is clicked.
 */
overlay.onclick = function () {
  closeOverlay();
};
