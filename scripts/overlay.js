let currentIndex = 0;
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");

function openOverlay(index) {
  currentIndex = index - 1; // Korrigiere den Index, um auf den richtigen Wert zuzugreifen
  const pokemonData = pokemonListGlobal[currentIndex];
  overlayImg.src = pokemonData.image;
    overlay.style.display = "flex";
  document.body.style.overflow = 'hidden'; // Deaktiviere das Scrollen im Hintergrund
}

function closeOverlay() {
  overlay.style.display = "none";
  document.body.style.overflow = 'auto'; // Reaktiviere das Scrollen im Hintergrund
}

function nextImage() {
  if (currentIndex + 1 >= pokemonListGlobal.length) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  overlayImg.src = pokemonData.image;
  updateImageCounter();
}

function prevImage() {
  if (currentIndex - 1 < 0) {
    currentIndex = pokemonListGlobal.length - 1;
  } else {
    currentIndex -= 1;
  }
  const pokemonData = pokemonListGlobal[currentIndex];
  overlayImg.src = pokemonData.image;
  updateImageCounter();
}

overlay.onclick = function () {
  closeOverlay();
};