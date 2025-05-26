/**
 * Filters the globally available Pokémon list based on user input from a search field.
 * This function handles the entire search logic, including:
 * - Reading and normalizing the search term.
 * - Filtering the `pokemonListGlobal` array for names that include the search term.
 * - Handling the UI logic for showing/hiding a search hint and the "Load More" button.
 * - Resetting the view to the full list if the search term is too short (less than 3 characters).
 * - Calling `displayPokemonCards` to render the appropriate list (filtered or full).
 */
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

/**
 * Renders an array of Pokémon objects as individual cards into the main content area.
 * This function first clears any existing content from the container element (`#content`),
 * then iterates through the provided array, generating and appending the HTML for each Pokémon card.
 *
 * @param {object[]} pokemonArray - An array of Pokémon data objects to be displayed. Each object
 * is expected to have at least an 'id' and other properties required by `generatePokemonCardTemplate`.
 */
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
