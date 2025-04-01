function searchPokemon() {
  let searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  let hintElement = document.getElementById("search-hint");
  let loadMoreButton = document.getElementById("load-more-button");
  if (!hintElement || !loadMoreButton) return;

  if (searchTerm.length < 3) {
    displayPokemonCards(pokemonListGlobal);
    hintElement.style.display = "block";
    loadMoreButton.style.display = "block";
    return;
  }

  hintElement.style.display = "none";

  let filtered = pokemonListGlobal.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  displayPokemonCards(filtered);

  loadMoreButton.style.display = "none";
}

function displayPokemonCards(pokemonArray) {
  let contentElement = document.getElementById("content");
  contentElement.innerHTML = "";

  for (let i = 0; i < pokemonArray.length; i++) {
    contentElement.innerHTML += generatePokemonCardTemplate(
      pokemonArray[i],
      pokemonArray[i].id
    );
  }
}
