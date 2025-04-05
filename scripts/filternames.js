/**
 * Filters the global Pokémon list based on user input in the search field.
 * Displays matching Pokémon cards or resets to full list if input is too short.
 * Also handles hint visibility and toggles the "Load more" button.
 */
function searchPokemon() {
  // Get the value from the search input, convert it to lowercase and trim whitespace
  let searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  // Get DOM elements for the search hint and the "Load More" button
  let hintElement = document.getElementById("search-hint");
  let loadMoreButton = document.getElementById("load-more-button");

  // If either element is not found, exit the function early
  if (!hintElement || !loadMoreButton) return;

  // If the search term is shorter than 3 characters, reset the view
  if (searchTerm.length < 3) {
    displayPokemonCards(pokemonListGlobal); // Show all Pokémon cards
    hintElement.style.display = "block"; // Show the hint message
    loadMoreButton.style.display = "block"; // Show the "Load More" button
    return;
  }

  // Hide the hint if the search term is valid
  hintElement.style.display = "none";

  // Filter the global Pokémon list by name matching the search term
  let filtered = pokemonListGlobal.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  // Display only the filtered Pokémon
  displayPokemonCards(filtered);

  // Hide the "Load More" button during filtered search
  loadMoreButton.style.display = "none";
}

/**
 * Renders an array of Pokémon objects as cards into the content container.
 *
 * @param {Object[]} pokemonArray - Array of Pokémon data to render.
 */
function displayPokemonCards(pokemonArray) {
  let contentElement = document.getElementById("content");

  // Clear the content container before rendering new cards
  contentElement.innerHTML = "";

  // Loop through the array and append a card for each Pokémon
  for (let i = 0; i < pokemonArray.length; i++) {
    contentElement.innerHTML += generatePokemonCardTemplate(
      pokemonArray[i],
      pokemonArray[i].id
    );
  }
}
