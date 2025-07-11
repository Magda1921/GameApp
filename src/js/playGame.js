export function playGame(grid, numPairs) {
  const cards = grid.children;
  let flippedCards = [];
  let lockBoard = false;

  Array.from(cards).forEach((card) => {
    card.addEventListener("click", () => {
      if (lockBoard) return;
      if (card.children[0].classList.contains("img--flipped")) return;

      card.children[0].classList.add("img--flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        const isMatch =
          first.children[0].dataset.id === second.children[0].dataset.id;

        if (isMatch) {
          flippedCards = [];
        } else {
          lockBoard = true;
          setTimeout(() => {
            first.children[0].classList.remove("img--flipped");
            second.children[0].classList.remove("img--flipped");
            flippedCards = [];
            lockBoard = false;
          }, 1000);
        }
      }
    });
  });
}
