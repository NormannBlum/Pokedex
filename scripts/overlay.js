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
  // Set Pokémon image in overlay
  overlayImg.src = pokemonData.image;

  // Display Pokémon ID with a "#" prefix
  document.getElementById(
    "overlay-pokemon-id"
  ).innerHTML = `#${pokemonData.id}`;

  // Display Pokémon name
  document.getElementById("overlay-pokemon-name").innerHTML = pokemonData.name;

  // Generate and insert type icons into the overlay
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
  // Fetch detailed Pokémon data from the API
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  // Display Pokémon height in meters (converted from decimeters)
  document.getElementById("overlay-pokemon-height").innerHTML = `${
    data.height / 10
  } m`;

  // Display Pokémon weight in kilograms (converted from hectograms)
  document.getElementById("overlay-pokemon-weight").innerHTML = `${
    data.weight / 10
  } kg`;

  // Display base experience value
  document.getElementById("overlay-pokemon-base-exp").innerHTML =
    data.base_experience;

  // Format and display Pokémon abilities as a comma-separated list
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
  // Convert to 0-based index and save it
  currentIndex = index - 1;

  // Get basic Pokémon data from the global list
  const pokemonData = pokemonListGlobal[currentIndex];

  // Display basic Pokémon info (image, name, types, etc.)
  setBasicOverlayInfo(pokemonData);

  // Fetch and display additional data like height and abilities
  await fetchAndSetPokemonDetails(pokemonData.id);

  // Show the overlay and prevent background scrolling
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Pokémon overlay and resets body scroll behavior.
 */
function closeOverlay() {
  // Hide the overlay
  overlay.style.display = "none";

  // Allow page scrolling again
  document.body.style.overflow = "auto";
}

/**
 * Navigates to the previous Pokémon in the list and updates the overlay.
 */
function prevImage() {
  // Calculate index of the previous Pokémon, wrapping around if needed
  currentIndex =
    (currentIndex - 1 + pokemonListGlobal.length) % pokemonListGlobal.length;

  // Get and display the previous Pokémon
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

/**
 * Navigates to the next Pokémon in the list and updates the overlay.
 */
function nextImage() {
  // Calculate index of the next Pokémon, wrapping around if needed
  currentIndex = (currentIndex + 1) % pokemonListGlobal.length;

  // Get and display the next Pokémon
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
