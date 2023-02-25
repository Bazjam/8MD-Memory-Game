const cards = document.querySelectorAll(".card");
const startGameBtn = document.querySelector("[data-start-btn]");
const resetBtn = document.querySelector("[data-reset-btn]");
const win = document.querySelector("[data-winner-text]");
const memoryGameUnhide = document.querySelector("[data-memory-game-all-cards]");

let counter: number = 0;
let hasFlippedCard = false;
let lockBoard = false;

let firstCard: {
  dataset: { memo: void };
  removeEventListener: (arg0: string, arg1: () => void) => void;
  classList: { remove: (arg0: string) => void };
};

let secondCard: {
  dataset: { memo: void };
  removeEventListener: (arg0: string, arg1: () => void) => void;
  classList: { remove: (arg0: string) => void };
};

startGameBtn.addEventListener("click", function () {
  this.classList.add("hide");
  memoryGameUnhide.classList.remove("hide");
});

cards.forEach((card) => card.addEventListener("click", flipCard));

//Flipping cards
function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  checkForMatch();
}

//Compare card    ===    card
function checkForMatch() {
  let cardsAreEqual = false;

  if (firstCard.dataset.memo === secondCard.dataset.memo) {
    cardsAreEqual = true;
  } else {
    cardsAreEqual = false;
  }

  if (cardsAreEqual === true) {
    counter++;
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  window.location.reload();
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  if (counter === 6) {
    win.innerHTML = `You Win !!!`;
    resetBtn.classList.remove("hide");
  }
}

(function initializeGame() {
  cards.forEach((card: HTMLElement) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = String(randomPos);
  });
})();
