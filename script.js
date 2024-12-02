// "async function" ruft die Daten der Pokemons von der API ab
async function fetchPokemonData() {
  // Initialisiere ein leeres Array um die Pokémon-Daten zu speichern
  let pokemonList = [];

  for (let i = 1; i < 20; i++) {
    // Abrufen der Daten eines Pokémon von der PokeAPI anhand seiner ID.
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

    // Konvertiere die API-Antwort in ein JSON-Objekt
    let pokemon = await response.json();

    // Hinzufügen eines Pokemon-Objekts mit Informationen (Name, Typ, Bild, ID) zum Array.
    pokemonList.push({
      name: pokemon.name,
      type: pokemon.types[0].type.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      id: pokemon.id,
    });
  }

  renderPokemonCards(pokemonList);
}

// Funktion zur Darstellung der PokemonDaten auf der Webseite.
function renderPokemonCards(pokemonList) {
  // Hole das HTML-Element ID "content", wo die Karten eingefügt werden sollen
  let contentElement = document.getElementById("content");

  // Initialisierung eines leeren Strings, der später die HTML-Karten enthält.
  let cardsHTML = "";

  // Schleife durch die Liste der Pokemon, um jede Karte zu erstellen
  for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i]; // Das aktuelle Pokemon

    // HTML-Struktur für eine einzelne Pokemon-Karte
    cardsHTML += `
      <div class="pokemon-card ${pokemon.type}"> 
        <div class="card-header"> 
          <span class="pokemon-id">#${pokemon.id}</span>
          <span class="pokemon-name">${pokemon.name}</span> 
        </div>
        <div class="card-body"> 
          <img class="pokemon-image" src="${pokemon.image}"> 
        </div>
        <div class="card-footer"> 
          <img class="type-icon" src="./assets/icons/${pokemon.type}.png">
        </div>
      </div>
    `;
  }

  // Fügt den generierten HTML-Code in das "content"-Element ein.
  contentElement.innerHTML = cardsHTML;
}
