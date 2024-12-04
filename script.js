let loadedPokemonCount = 1; // Anzahl aktuell geladener Pokemon
let pokemonListGlobal = []; // Speichert alle geladenen Pokemon
const loadMoreButton = document.getElementById("load-more-button");

async function fetchPokemonData(startIndex, limit) {
  let pokemonList = []; // Initialisiere ein leeres Array, um die Pokemon-Daten zu speichern
  for (let i = startIndex; i < startIndex + limit; i++) {
    let pokemon = await fetchSinglePokemonData(i); // Hole die Daten eines einzelnen Pokemon
    pokemonList.push(pokemon);
  }
  return pokemonList; // Gibt die Liste der Pokemon-Daten zurück
}

async function fetchSinglePokemonData(id) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let pokemonData = await response.json(); // Konvertiere die API-Antwort in ein JSON-Objekt
  let pokemonTypes = []; // Extrahiere alle Typen des Pokemon
  for (let j = 0; j < pokemonData.types.length; j++) {
    pokemonTypes.push(pokemonData.types[j].type.name);
  }
  return { // Erstelle ein Pokemon-Objekt mit den relevanten Informationen
    name: pokemonData.name,
    types: pokemonTypes,
    image: pokemonData.sprites.other["official-artwork"].front_default,
    id: pokemonData.id
  };
}

async function renderPokemonCards(startIndex, limit) {
  let pokemonList = await fetchPokemonData(startIndex, limit); // Ruft die Daten der Pokemon ab
  for (let i = 0; i < pokemonList.length; i++) {
    pokemonListGlobal.push(pokemonList[i]);
  } // Aktualisiere die globale Pokemon Liste
  let contentElement = document.getElementById("content");
  let cardsHTML = contentElement.innerHTML; // Speichert die bestehenden Karten
  for (let i = 0; i < pokemonList.length; i++) {
    cardsHTML += generatePokemonCardTemplate(pokemonList[i], loadedPokemonCount + i);
  }
  contentElement.innerHTML = cardsHTML; // Fügt den HTML-Code in das "content"-Element ein
  loadedPokemonCount += limit; // Aktualisiere die Anzahl der geladenen Pokémon
}

function loadMorePokemon() {
  renderPokemonCards(loadedPokemonCount, 20); // Lade ab aktueller Anzahl geladener Pokemon
}

loadMorePokemon();

// "Load More"-Button klickbar machen
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
