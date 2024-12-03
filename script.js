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
  let contentElement = document.getElementById("content"); // Hole das HTML-Element ID "content"
  let cardsHTML = contentElement.innerHTML; // Speichert die bestehenden Karten und fügt neue hinzu

  for (let i = 0; i < pokemonList.length; i++) {
    let pokemonData = pokemonList[i]; // Das aktuelle Pokémon
    cardsHTML += generatePokemonCardTemplate(pokemonData);
  }

  contentElement.innerHTML = cardsHTML; // Fügt den HTML-Code in das "content"-Element ein

  loadedPokemonCount += limit; // Aktualisiere Anzahl geladener Pokemon um den Startpunkt zu speichern
}

let loadedPokemonCount = 1; // Anzahl der geladenen Pokemon initialisieren

function loadMorePokemon() {
  renderPokemonCards(loadedPokemonCount, 20); // Lade ab der aktuellen Anzahl von geladenen Pokémon
}

loadMorePokemon(); // Initialer Aufruf, um die ersten Pokemon zu laden

let loadMoreButton = document.getElementById("load-more-button");

// "Load More"-Button klickbar machen
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
