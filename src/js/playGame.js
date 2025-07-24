import { countScore } from "./scoreCounter";
import { stopCountTimer } from "./timer";
import { constructToggleSections } from "./helpers/toggleSections.js";

export function playGame(gameConfig) {
  const gameState = {
    cards: gameConfig.grid.children,
    flippedCards: [],
    lockBoard: false,
    pairsFound: 0,
    time: 0,
  };

  Array.from(gameState.cards).forEach((card) => {
    handleCardClick(card, gameState, gameConfig.playerName);
  });

  const toggleSections = constructToggleSections(
    "game--hidden",
    "start--hidden",
    gameConfiggameSection,
    gameConfig.startSection
  );
  handleEndGame();
}

function handleCardClick(card, gameState, playerName) {
  card.addEventListener("click", () =>
    onCardClick(card, gameState, playerName)
  );
}

function onCardClick(card, gameState, playerName) {
  if (shouldIgnoreClick(card, gameState)) return;

  flipCard(card, gameState);
  if (gameState.flippedCards.length === 2) {
    handleMatchCheck(gameState, playerName);
  }
}

function shouldIgnoreClick(card, gameState) {
  return (
    gameState.lockBoard || card.children[0].classList.contains("img--flipped")
  );
}

function handleMatchCheck(gameState, playerName) {
  const [first, second] = gameState.flippedCards;
  const isMatch = checkForMatch(first, second);

  if (isMatch) {
    resetFlippedCards(gameState);
    addFoundPair(gameState, playerName);
  } else {
    handleMismatch(first, second, gameState);
  }
}

function handleMismatch(first, second, gameState) {
  gameState.lockBoard = true;
  setTimeout(() => {
    unflipCard(first);
    unflipCard(second);
    resetFlippedCards(gameState);
    gameState.lockBoard = false;
  }, 1000);
}

function unflipCard(card) {
  card.children[0].classList.remove("img--flipped");
}

function resetFlippedCards(gameState) {
  gameState.flippedCards = [];
}

function checkForMatch(firstCard, secondCard) {
  return firstCard.children[0].dataset.id === secondCard.children[0].dataset.id;
}
function flipCard(card, gameState) {
  card.children[0].classList.add("img--flipped");
  gameState.flippedCards.push(card);
}
function addFoundPair(gameState, playerName) {
  gameState.pairsFound++;
  if (gameState.pairsFound === gameState.cards.length / 2) {
    stopCountTimer(gameState);
    countScore(gameState, playerName);
    const dialog = document.querySelector(".js-game-end");
    dialog.showModal();
  }
}
function handleEndGame() {
  const endButton = document.querySelector(".js-end-button");
  endButton.addEventListener("click", () => {
    finishGame();
  });
}
function finishGame() {
  toggleSections();
}
