let intervalId;
let time;
export function startCountTimer() {
  const timerDisplay = document.querySelector(".js-timer");
  time = 0;
  intervalId = setInterval(() => {
    time++;
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
export function stopCountTimer(gameState) {
  clearInterval(intervalId);
  gameState.time = time;
}
