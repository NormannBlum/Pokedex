let currentIndex = 0; // Speichert die Position des aktuell angezeigten Bildes - Start bei 0

const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");

function setBasicOverlayInfo(pokemonData) {
  overlayImg.src = pokemonData.image;
  document.getElementById(
    "overlay-pokemon-id"
  ).innerHTML = `#${pokemonData.id}`;
  document.getElementById("overlay-pokemon-name").innerHTML = pokemonData.name;
  let typeIconsContainer = document.getElementById("overlay-type-icons");
  typeIconsContainer.innerHTML = generateOverlayTypeIcons(pokemonData.types);
}

async function fetchAndSetPokemonDetails(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  document.getElementById("overlay-pokemon-height").innerHTML = `${
    data.height / 10
  } m`;
  document.getElementById("overlay-pokemon-weight").innerHTML = `${
    data.weight / 10
  } kg`;
  document.getElementById("overlay-pokemon-base-exp").innerHTML =
    data.base_experience;
  let abilities = ""; // Initialisiert leeren String für die Fähigkeiten des Pokemon
  for (let i = 0; i < data.abilities.length; i++) {
    // Iteriert durch alle Fähigkeiten des Pokemon
    if (i > 0) {
      abilities += ", "; // Fügt ein Komma hinzu, wenn es mehr als eine Fähigkeit gibt
    }
    abilities += data.abilities[i].ability.name;
  }
  document.getElementById("overlay-pokemon-abilities").innerHTML = abilities;
}

async function openOverlay(index) {
  currentIndex = index - 1; // Passe Index für das Array an, um auf den richtigen Wert zuzugreifen
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  await fetchAndSetPokemonDetails(pokemonData.id);
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // Deaktiviere das Scrollen im Hintergrund
}

function closeOverlay() {
  overlay.style.display = "none";
  document.body.style.overflow = "auto"; // Reaktiviere das Scrollen im Hintergrund
}

function prevImage() {
  if (currentIndex - 1 < 0) {
    currentIndex = pokemonListGlobal.length - 1; // Zum letzten Bild der Liste springen
  } else {
    currentIndex = currentIndex - 1; // Zum vorherigen Bild gehen
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

function nextImage() {
  if (currentIndex + 1 >= pokemonListGlobal.length) {
    currentIndex = 0; // Zum Anfang der Liste springen
  } else {
    currentIndex = currentIndex + 1; // Zum nächsten Bild gehen
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

overlay.onclick = function () {
  closeOverlay();
};
