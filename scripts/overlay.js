let currentIndex = 0;

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
  let abilities = "";
  for (let i = 0; i < data.abilities.length; i++) {
    if (i > 0) {
      abilities += ", ";
    }
    abilities += data.abilities[i].ability.name;
  }
  document.getElementById("overlay-pokemon-abilities").innerHTML = abilities;
}

async function openOverlay(index) {
  currentIndex = index - 1;
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  await fetchAndSetPokemonDetails(pokemonData.id);
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

function prevImage() {
  if (currentIndex - 1 < 0) {
    currentIndex = pokemonListGlobal.length - 1;
  } else {
    currentIndex = currentIndex - 1;
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

function nextImage() {
  if (currentIndex + 1 >= pokemonListGlobal.length) {
    currentIndex = 0;
  } else {
    currentIndex = currentIndex + 1;
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  setBasicOverlayInfo(pokemonData);
  fetchAndSetPokemonDetails(pokemonData.id);
}

overlay.onclick = function () {
  closeOverlay();
};
