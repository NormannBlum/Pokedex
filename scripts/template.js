function generateTypeIcons(types) {
  let typeIconsHTML = ""; // Typen-Icons und Typnamen erstellen
  for (let i = 0; i < types.length; i++) {
    typeIconsHTML += ` <div class="type-info">
          <img class="type-icon" src="./assets/icons/${types[i]}.png">
          <span class="type-name">${types[i]}</span>
        </div> `;}
  return typeIconsHTML;
} // Gibt den HTML-Code für die Typen-Icons zurück

function generatePokemonCardTemplate(pokemonData) {
  const typeIconsHTML = generateTypeIcons(pokemonData.types);
  return `<div class="pokemon-card ${pokemonData.types[0]}"> 
        <div class="card-header">
          <span class="pokemon-name">${pokemonData.name}</span>  
          <span class="pokemon-id">#${pokemonData.id}</span>
        </div>
        <div class="card-body"> 
          <img class="pokemon-image" src="${pokemonData.image}" alt="${pokemonData.name}"> 
        </div>
        <div class="card-footer">
          ${typeIconsHTML}
        </div>
      </div> `;
} // Gibt den HTML-Code für die Pokémon-Karte zurück
