function generateTypeIcons(types) {
  let typeIconsHTML = ""; // Typen-Icons und Typnamen erstellen
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` <div class="type-info">
            <img class="type-icon" src="./assets/icons/${types[i]}.png">
            <span class="type-name">${types[i]}</span>
          </div> `;
  }
  return typeIconsHTML; // Gibt den HTML-Code für die Pokemon Typen Icons zurück
}

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
      </div>`; // Generiert den HTML-Code für eine Pokemon Karte
}

function generateOverlayTypeIcons(types) {
  let typeIconsHTML = ""; // Typen-Icons nur für das Overlay erstellen, ohne Namen
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` <div class="overlay-type-info">
            <img class="overlay-type-icon" src="./assets/icons/${types[i]}.png">
          </div> `;
  }
  return typeIconsHTML; // Gibt den HTML-Code für die Pokemon Typen Icons im Overlay zurück
}
