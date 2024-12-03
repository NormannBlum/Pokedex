let loadedPokemonCount = 1;
let pokemonListGlobal = [];
const loadMoreButton = document.getElementById("load-more-button");

async function fetchPokemonData(startIndex, limit) {
  let pokemonList = []; // Initialisiere ein leeres Array, um die Pokémon-Daten zu speichern

  for (let i = startIndex; i < startIndex + limit; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let pokemonData = await response.json(); // Konvertiere die API-Antwort in ein JSON-Objekt

    let pokemonTypes = []; // Extrahiere alle Typen des Pokémon
    for (let j = 0; j < pokemonData.types.length; j++) {
      pokemonTypes.push(pokemonData.types[j].type.name);
    }

    // Hinzufügen eines Pokémon-Objekts mit Informationen (Name, Typen, Bild, ID) zum Array
    pokemonList.push({
      name: pokemonData.name,
      types: pokemonTypes,
      image: pokemonData.sprites.other["official-artwork"].front_default,
      id: pokemonData.id,
    });
  }

  return pokemonList; // Gibt die Liste der Pokémon-Daten zurück
}

async function renderPokemonCards(startIndex, limit) {
  let pokemonList = await fetchPokemonData(startIndex, limit); // Ruft die Daten der Pokémon ab
  for (let i = 0; i < pokemonList.length; i++) {
    pokemonListGlobal.push(pokemonList[i]);
  } // Aktualisiere die globale Pokemon-Liste
  let contentElement = document.getElementById("content"); // Hole das HTML-Element ID "content"
  let cardsHTML = contentElement.innerHTML; // Speichert die bestehenden Karten und fügt neue hinzu

  for (let i = 0; i < pokemonList.length; i++) {
    cardsHTML += generatePokemonCardTemplate(
      pokemonList[i],
      loadedPokemonCount + i
    );
  }

  contentElement.innerHTML = cardsHTML; // Fügt den HTML-Code in das "content"-Element ein

  for (let i = loadedPokemonCount; i < loadedPokemonCount + limit; i++) {
    let card = document.getElementById(`pokemon-card-${i}`);
    if (card) {
      card.onclick = function () {
        openOverlay(i);
      };
    }
  }

  loadedPokemonCount += limit; // Aktualisiere die Anzahl der geladenen Pokemon, um den Startpunkt zu speichern
}

function loadMorePokemon() {
  renderPokemonCards(loadedPokemonCount, 20); // Lade ab der aktuellen Anzahl von geladenen Pokemon
}

loadMorePokemon(); // Initialer Aufruf, um die ersten Pokemon zu laden

// "Load More"-Button klickbar machen
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
