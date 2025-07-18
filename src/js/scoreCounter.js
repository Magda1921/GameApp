export function countScore(gameState) {
  const scoreDisplay = document.querySelector(".js-score");
  const score = gameState.pairsFound * (100 / gameState.time);

  scoreDisplay.textContent = `Your score: ${Math.round(score)}`;
}
