export function startCountTimer() {
  const timerDisplay = document.querySelector(".js-timer");
  let time = 0;

  setInterval(() => {
    time++;
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
