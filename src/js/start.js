import "/src/styles/main.css";

export function initStart(element) {
  const startBtn = element;

  const btn = element.querySelector(".js-start-button");
  const input = element.querySelector(".js-player-name");
  const select = element.querySelector(".js-difficulty");

  btn.addEventListener("click", function () {
    const name = input.value;
    const difficulty = select.value;
  });
}
