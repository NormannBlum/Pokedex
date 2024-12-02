// "async function" ruft die Daten der Pokémons von der API ab
async function fetchPokemonData(startIndex, limit) {
  // Initialisiere ein leeres Array, um die Pokémon-Daten zu speichern
  let pokemonList = [];

  for (let i = startIndex; i < startIndex + limit; i++) {
    // Abrufen der Daten eines Pokémon von der PokeAPI anhand seiner ID
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

    // Konvertiere die API-Antwort in ein JSON-Objekt
    let pokemonData = await response.json();

    // Extrahiere alle Typen des Pokémon
    let pokemonTypes = [];
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

  // Gibt die Liste der Pokémon-Daten zurück
  return pokemonList;
}

// Funktion zur Darstellung der Pokémon-Daten auf der Webseite
async function renderPokemonCards(startIndex, limit) {
  // Ruft die Daten der Pokémon ab
  let pokemonList = await fetchPokemonData(startIndex, limit);

  // Hole das HTML-Element ID "content", wo die Karten eingefügt werden sollen
  let contentElement = document.getElementById("content");

  // Speichert die bestehenden Karten und fügt die neuen hinzu
  let cardsHTML = contentElement.innerHTML;

  // Schleife durch die Liste der Pokémon, um jede Karte zu erstellen
  for (let i = 0; i < pokemonList.length; i++) {
    let pokemonData = pokemonList[i]; // Das aktuelle Pokémon

    // Typen-Icons und Typnamen erstellen
    let typeIconsHTML = "";
    for (let j = 0; j < pokemonData.types.length; j++) {
      typeIconsHTML += `
        <div class="type-info">
          <img class="type-icon" src="./assets/icons/${pokemonData.types[j]}.png">
          <span class="type-name">${pokemonData.types[j]}</span>
        </div>
      `;
    }

    // HTML-Struktur für eine einzelne Pokémon-Karte
    cardsHTML += `
      <div class="pokemon-card ${pokemonData.types[0]}"> 
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
      </div>
    `;
  }

  // Fügt den generierten HTML-Code in das "content"-Element ein
  contentElement.innerHTML = cardsHTML;
}

// Anzahl der geladenen Pokemon initialisieren
let loadedPokemonCount = 0;

// Lädt weitere Pokemon und aktualisiert den Zähler
function loadMorePokemon() {
  renderPokemonCards(loadedPokemonCount + 1, 20); // Starte ab dem nächsten Pokémon
  loadedPokemonCount += 20; // Aktualisiere die Anzahl der geladenen Pokémon
}

loadMorePokemon();

let loadMoreButton = document.getElementById("load-more-button");

// "Load More"-Button klickbar machen
loadMoreButton.onclick = function () {
  loadMorePokemon();
};
