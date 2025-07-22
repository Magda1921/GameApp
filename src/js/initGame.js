import { playGame } from "./playGame.js";
import { startCountTimer } from "./timer.js";
import { constructToggleSections } from "./helpers/toggleSections.js";

export function initGame(images, difficulty, startSection) {
  const gameSection = document.querySelector(".js-game");
  const toggleSections = constructToggleSections(
    "start--hidden",
    "game--hidden",
    startSection,
    gameSection
  );
  toggleSections();

  const imagePairs = prepareImagePairs(difficulty, images);
  const grid = document.querySelector(".js-game-content");
  const playerName = document.querySelector(".js-player-name").value;

  renderGrid(grid, imagePairs);
  startCountTimer();
  playGame(grid, imagePairs.length / 2, startSection, gameSection, playerName);
}

function prepareImagePairs(numPairs, images) {
  const selectedImages = images.slice(0, numPairs);
  const pairs = [...selectedImages, ...selectedImages];
  return shuffleArray(pairs);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderGrid(grid, imagePairs) {
  grid.innerHTML = "";
  imagePairs.forEach((image) => {
    const card = createCard(image);
    grid.appendChild(card);
  });
}

function createCard(image) {
  const card = document.createElement("div");
  card.className = "card game__card";

  const img = document.createElement("img");
  img.src = image.urls.small;
  img.dataset.id = image.id;
  img.alt = image.alt_description || "Cat image";
  img.classList.add("game__image");

  card.appendChild(img);
  return card;
}
