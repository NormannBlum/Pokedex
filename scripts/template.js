/**
 * Generates HTML string for displaying Pokémon type icons inside a card.
 *
 * @param {string[]} types - An array of Pokémon type names (e.g., ['fire', 'flying']).
 * @returns {string} HTML string containing type icon elements.
 */
function generateTypeIcons(types) {
  let typeIconsHTML = "";

  // Loop through each type and generate corresponding icon HTML
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
 * Generates a complete HTML card for a single Pokémon.
 *
 * @param {Object} pokemonData - Pokémon object containing name, types, image, and ID.
 * @param {number} index - Index used to uniquely identify the card and for overlay logic.
 * @returns {string} HTML string for the Pokémon card.
 */
function generatePokemonCardTemplate(pokemonData, index) {
  return `<div class="pokemon-card ${
    pokemonData.types[0]
  }" id="data-${index}" onclick="openOverlay(${index})"> 
      <div class="card-header">
        <!-- Display Pokémon name and ID -->
        <span class="pokemon-name">${pokemonData.name}</span>  
        <span class="pokemon-id">#${pokemonData.id}</span>
      </div>

      <div class="card-body"> 
        <!-- Display Pokémon image -->
        <img class="pokemon-image" src="${pokemonData.image}"> 
      </div>

      <div class="card-footer">
        <!-- Generate and insert type icons -->
        ${generateTypeIcons(pokemonData.types)}
      </div>
    </div>`;
}

/**
 * Generates HTML string for displaying type icons inside the Pokémon detail overlay.
 *
 * @param {string[]} types - An array of Pokémon type names.
 * @returns {string} HTML string of overlay-specific type icons.
 */
function generateOverlayTypeIcons(types) {
  let typeIconsHTML = "";

  // Loop through each type and generate a simpler icon element for the overlay
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` 
      <div class="overlay-type-info">
        <img class="overlay-type-icon" src="./assets/icons/${types[i]}.png">
      </div> `;
  }

  return typeIconsHTML;
}
