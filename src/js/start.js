import "/src/styles/main.css";

import { fetchImages } from "/src/js/imageFetcher.js";

export function initStart(element) {
  const startBtn = element;

  const btn = element.querySelector(".js-start-button");
  const input = element.querySelector(".js-player-name");
  const select = element.querySelector(".js-difficulty");

  btn.addEventListener("click", async function (e) {
    e.preventDefault();
    const name = input.value;
    const difficulty = select.value;

    let imageCount;
    switch (difficulty) {
      case "easy":
        imageCount = 4;
        break;
      case "medium":
        imageCount = 8;
        break;
      case "hard":
        imageCount = 12;
        break;
      default:
        imageCount = 4;
    }

    const query = "cats";
    const images = await fetchImages(query, imageCount);
  });
}
