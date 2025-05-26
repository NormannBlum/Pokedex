/**
 * Stores the 0-based index of the currently displayed Pokémon from the `pokemonListGlobal` array.
 * This variable is updated during navigation (next/previous).
 * @type {number}
 */
let currentIndex = 0;

/**
 * A reference to the main overlay container DOM element.
 * This element acts as the parent for all detailed Pokémon views.
 * @type {HTMLElement}
 */
const overlay = document.getElementById("overlay");

/**
 * A reference to the `<img>` DOM element within the overlay,
 * used to display the current Pokémon's image.
 * @type {HTMLImageElement}
 */
const overlayImg = document.getElementById("overlay-img");

/**
 * Populates the overlay with the basic, initially-loaded information of a Pokémon.
 * This includes setting the image, name, ID, and type icons.
 *
 * @param {object} pokemonData - The basic data object for a single Pokémon.
 * @param {string} pokemonData.image - The URL to the Pokémon's primary image.
 * @param {number} pokemonData.id - The Pokédex ID of the Pokémon.
 * @param {string} pokemonData.name - The name of the Pokémon.
 * @param {string[]} pokemonData.types - An array of strings representing the Pokémon's types.
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
 * Asynchronously fetches detailed Pokémon information (like height, weight, abilities)
 * from the PokeAPI for a specific Pokémon ID and updates the corresponding overlay elements.
 *
 * @async
 * @param {number} id - The Pokédex ID of the Pokémon for which to fetch details.
 * @returns {Promise<void>} A promise that resolves when the details have been fetched and set.
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
 * Opens and populates the Pokémon detail overlay.
 * It sets the global `currentIndex`, calls functions to load basic and detailed data,
 * and makes the overlay visible while preventing the background from scrolling.
 *
 * @async
 * @param {number} index - The 1-based index of the selected Pokémon in the `pokemonListGlobal` array.
 * @returns {Promise<void>} A promise that resolves once the overlay is fully open and populated.
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
 * Hides the Pokémon detail overlay and restores the default scrolling behavior
 * on the main page body.
 */
function closeOverlay() {
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

/**
 * Navigates to the previous Pokémon in the `pokemonListGlobal` list.
 * It calculates the new index with wrap-around logic (circular navigation)
 * and updates the overlay with the data of the previous Pokémon.
 */
function prevImage() {
  currentIndex =
    (currentIndex - 1 + pokemonListGlobal.length) % pokemonListGlobal.length;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

/**
 * Navigates to the next Pokémon in the `pokemonListGlobal` list.
 * It calculates the new index with wrap-around logic (circular navigation)
 * and updates the overlay with the data of the next Pokémon.
 */
function nextImage() {
  currentIndex = (currentIndex + 1) % pokemonListGlobal.length;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

/**
 * Assigns a click event listener to the overlay background.
 * Clicking anywhere on the overlay (but outside the content box due to event propagation)
 * will trigger the `closeOverlay` function.
 */
overlay.onclick = function () {
  closeOverlay();
};
