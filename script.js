// "async function" ruft die Daten der Pokemons von der API ab
async function fetchPokemonData() {
  // Initialisierung eines leeren Arrays, das später die Pokémon-Daten speichert.
  let pokemonList = [];

  // Schleife um die ersten 20 Pokémon zu durchlaufen
  for (let i = 1; i < 50; i++) {
    // Abrufen der Daten eines Pokémon von der PokeAPI anhand seiner ID.
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    // Konvertieren der API-Antwort in ein JSON-Objekt.
    let pokemon = await response.json();
    // Hinzufügen eines Pokémon-Objekts mit Informationen (Name, Typ, Bild, ID) zum Array.
    pokemonList.push({
      name: pokemon.name,
      type: pokemon.types[0].type.name,
      image: pokemon.sprites.front_default,
      id: pokemon.id,
    });
  }

  // Sobald die Daten geladen sind, werden die Pokemon Daten dargestellt.
  renderPokemonCards(pokemonList);
}

// Funktion zur Darstellung der PokemonDaten auf der Webseite.
function renderPokemonCards(pokemonList) {
  // Hole das HTML-Element ID "content", wo die Karten eingefügt werden sollen.
  let contentElement = document.getElementById("content");
  // Initialisierung eines leeren Strings, der später die HTML-Karten enthält.
  let cardsHTML = "";

  // Schleife die durch die Liste der Pokémon iteriert.
  for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i]; // Das aktuelle Pokémon.

    // Fügt HTML-Code für eine Pokémon-Karte zum cardsHTML-String hinzu.
    cardsHTML += `
          <div class="pokemon-card ${pokemon.type}"> 
            <h2>${pokemon.name} (#${pokemon.id})</h2> 
            <img src="${pokemon.image}">
            <p>Type: ${pokemon.type}</p> 
          </div>
        `;
  }

  // Fügt den generierten HTML-Code in das "content"-Element ein.
  contentElement.innerHTML = cardsHTML;
}
