import { countScore } from "./scoreCounter";
import { stopCountTimer } from "./timer";
import { constructToggleSections } from "./helpers/toggleSections.js";

export function playGame(grid, numPairs, startSection, gameSection) {
  const gameState = {
    cards: grid.children,
    flippedCards: [],
    lockBoard: false,
    pairsFound: 0,
    time: 0,
  };

  Array.from(gameState.cards).forEach((card) => {
    handleCardClick(card, gameState);
  });

  const toggleSections = constructToggleSections(
    "game--hidden",
    "start--hidden",
    gameSection,
    startSection
  );
  handleEndGame();
}

function handleCardClick(card, gameState) {
  card.addEventListener("click", () => onCardClick(card, gameState));
}

function onCardClick(card, gameState) {
  if (shouldIgnoreClick(card, gameState)) return;

  flipCard(card, gameState);
  if (gameState.flippedCards.length === 2) {
    handleMatchCheck(gameState);
  }
}

function shouldIgnoreClick(card, gameState) {
  return (
    gameState.lockBoard || card.children[0].classList.contains("img--flipped")
  );
}

function handleMatchCheck(gameState) {
  const [first, second] = gameState.flippedCards;
  const isMatch = checkForMatch(first, second);

  if (isMatch) {
    resetFlippedCards(gameState);
    addFoundPair(gameState);
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
function addFoundPair(gameState) {
  gameState.pairsFound++;
  if (gameState.pairsFound === gameState.cards.length / 2) {
    stopCountTimer(gameState);
    countScore(gameState);
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
