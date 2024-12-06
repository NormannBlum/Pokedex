function searchPokemon() {
  let searchTerm = document.getElementById("search-input").value.toLowerCase().trim();

  let hintElement = document.getElementById("search-hint");
  let loadMoreButton = document.getElementById("load-more-button");
  if (!hintElement || !loadMoreButton) return;

  // Wenn weniger als 3 Zeichen eingegeben werden, zeige alle Pokemon an und den Hinweis.
  if (searchTerm.length < 3) {
    displayPokemonCards(pokemonListGlobal);
    hintElement.style.display = "block"; // Hinweis anzeigen
    loadMoreButton.style.display = "block"; // Load More Button anzeigen
    return;
  }

  // Verstecke den Hinweis, wenn genug Zeichen eingegeben wurden
  hintElement.style.display = "none";

  // Filtere die globalen Pokemon nach dem Suchbegriff
  let filtered = pokemonListGlobal.filter((pokemon) => pokemon.name.includes(searchTerm));

  // Zeige nur gefilterte Ergebnisse
  displayPokemonCards(filtered);

  // Verstecke den Load More Button während der Filterung
  loadMoreButton.style.display = "none";
}

function displayPokemonCards(pokemonArray) {
  let contentElement = document.getElementById("content");
  contentElement.innerHTML = "";

  for (let i = 0; i < pokemonArray.length; i++) {
    contentElement.innerHTML += generatePokemonCardTemplate(pokemonArray[i], pokemonArray[i].id);
  }
}
