export function countScore() {
  const scoreDisplay = document.querySelector(".js-score");
  let score = 0;

  setInterval(() => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }, 1000);
}
