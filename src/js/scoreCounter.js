const playerScore = {
  name: "",
  score: 0,
  time: 0,
};

export function countScore(gameState, playerName) {
  const scoreDisplay = document.querySelector(".js-score");
  const score = gameState.pairsFound * (100 / gameState.time);

  scoreDisplay.textContent = `Your score: ${Math.round(score)}`;
  playerScore.score = Math.round(score);
  playerScore.time = gameState.time;
  playerScore.name = playerName || "Anonymous";
  addScoreToLocaleStorage(playerScore);
  createTBody();
}
function addScoreToLocaleStorage(score) {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
}
function createTBody() {
  const tBody = document.querySelector(".js-score-body");
  tBody.innerHTML = "";

  const rawData = localStorage.getItem("scores");
  let scores = JSON.parse(rawData) || [];
  scores.sort((a, b) => b.score - a.score);
  scores.forEach((score) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.time} seconds</td>
      `;
    tBody.appendChild(row);
  });
}
