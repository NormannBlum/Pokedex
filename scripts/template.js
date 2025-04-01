function generateTypeIcons(types) {
  let typeIconsHTML = "";
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` <div class="type-info">
            <img class="type-icon" src="./assets/icons/${types[i]}.png">
            <span class="type-name">${types[i]}</span>
          </div> `;
  }
  return typeIconsHTML;
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
      </div>`;
}

function generateOverlayTypeIcons(types) {
  let typeIconsHTML = "";
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` <div class="overlay-type-info">
            <img class="overlay-type-icon" src="./assets/icons/${types[i]}.png">
          </div> `;
  }
  return typeIconsHTML;
}
