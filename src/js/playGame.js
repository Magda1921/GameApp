export function playGame(grid, numPairs) {
  const gameState = {
    cards: grid.children,
    flippedCards: [],
    lockBoard: false,
  };

  Array.from(gameState.cards).forEach((card) => {
    handleCardClick(card, gameState);
  });
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
