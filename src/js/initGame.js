import { playGame } from "./playGame.js";
import { startCountTimer } from "./timer.js";
export function initGame(images, difficulty, startSection) {
  startSection.classList.add("start--hidden");
  const gameSection = document.querySelector(".js-game");
  gameSection.classList.remove("game--hidden");

  const numPairs = difficulty;
  const selectedImages = images.slice(0, numPairs);
  const imagePairs = [...selectedImages, ...selectedImages];

  for (let i = imagePairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
  }

  const grid = document.querySelector(".js-game-content");
  grid.innerHTML = "";

  imagePairs.forEach((imageSrc) => {
    const card = document.createElement("div");
    card.className = "card";

    const imageUrl = imageSrc.urls.small;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.dataset.id = imageSrc.id;
    img.alt = imageSrc.alt_description || "Cat image";

    img.classList.add("game__image");

    card.classList.add("game__card");

    card.appendChild(img);
    grid.appendChild(card);
  });
  startCountTimer();
  playGame(grid, numPairs);
}
