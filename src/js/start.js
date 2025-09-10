import { fetchImages } from "/src/js/fetchImages.js";
import { initGame } from "/src/js/initGame.js";

export function initStart(element) {
  const startBtn = element;

  const btn = element.querySelector(".js-start-button");
  const input = element.querySelector(".js-player-name");
  const select = element.querySelector(".js-difficulty");

  btn.addEventListener("click", async function (e) {
    e.preventDefault();
    const name = input.value;
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    const difficulty = select.value;
    const imageCountsByDifficulty = {
      easy: 4,
      medium: 8,
      hard: 12,
    };

    const imageCount = imageCountsByDifficulty[difficulty] ?? 4;

    const query = "cats";
    const images = await fetchImages(query, imageCount);
    initGame(images, imageCount, element);
  });
}
