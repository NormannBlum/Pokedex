/**
 * Generates an HTML string for displaying Pokémon type icons and names,
 * intended for use within a standard Pokémon card.
 * It iterates through an array of type names and creates a div containing
 * both an icon image and a text span for each type.
 *
 * @param {string[]} types - An array of Pokémon type names (e.g., ['fire', 'flying']).
 * @returns {string} An HTML string containing the complete set of type info elements for a card.
 */
function generateTypeIcons(types) {
  let typeIconsHTML = "";
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` 
      <div class="type-info">
        <img class="type-icon" src="./assets/icons/${types[i]}.png">
        <span class="type-name">${types[i]}</span>
      </div> `;
  }
  return typeIconsHTML;
}

/**
 * Generates the complete HTML string for a single Pokémon card.
 * This template structures the card with a header (name, ID), a body (image),
 * and a footer (type icons). It also sets a dynamic background class based on the
 * Pokémon's first type and embeds an onclick event to open the detail overlay.
 *
 * @param {object} pokemonData - The Pokémon data object.
 * @param {string} pokemonData.name - The name of the Pokémon.
 * @param {string[]} pokemonData.types - An array of the Pokémon's types.
 * @param {string} pokemonData.image - The URL for the Pokémon's image.
 * @param {number} pokemonData.id - The Pokédex ID of the Pokémon.
 * @param {number} index - A unique index for the card, used to set the DOM ID and for the `openOverlay` function call.
 * @returns {string} The complete HTML string for a single Pokémon card.
 */
function generatePokemonCardTemplate(pokemonData, index) {
  return `<div class="pokemon-card ${
    pokemonData.types[0]
  }" id="data-${index}" onclick="openOverlay(${index})"> 
      <div class="card-header">
        <span class="pokemon-name">${pokemonData.name}</span>  
        <span class="pokemon-id">#${pokemonData.id}</span>
      </div>

      <div class="card-body"> 
        <img class="pokemon-image" src="${pokemonData.image}"> 
      </div>

      <div class="card-footer">
        ${generateTypeIcons(pokemonData.types)}
      </div>
    </div>`;
}

/**
 * Generates an HTML string for displaying Pokémon type icons, specifically
 * for use within the detailed Pokémon overlay.
 * This version creates a more compact view, typically just showing the icons
 * without their text names.
 *
 * @param {string[]} types - An array of Pokémon type names.
 * @returns {string} An HTML string containing the set of type icon elements for the overlay.
 */
function generateOverlayTypeIcons(types) {
  let typeIconsHTML = "";
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` 
      <div class="overlay-type-info">
        <img class="overlay-type-icon" src="./assets/icons/${types[i]}.png">
      </div> `;
  }
  return typeIconsHTML;
}
