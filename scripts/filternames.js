function searchPokemon() {
  let searchTerm = document.getElementById("search-input").value.toLowerCase().trim();

  if (searchTerm.length < 3) { // Wenn weniger als 3 Zeichen eingegeben werden, zeige alle Pokemon an.
    displayPokemonCards(pokemonListGlobal);
    return;
  }

  let filtered = pokemonListGlobal.filter((pokemon) => // Filtere Pokemon nach Suchbegriff
    pokemon.name.includes(searchTerm)
  );

  displayPokemonCards(filtered); // Zeige nur gefilterte Ergebnisse
}

function displayPokemonCards(pokemonArray) {
  let contentElement = document.getElementById("content");
  contentElement.innerHTML = "";

  for (let i = 0; i < pokemonArray.length; i++) {
    contentElement.innerHTML += generatePokemonCardTemplate(pokemonArray[i], i);
  }
}
