let counter:number = 0;
//All cards
const cards = document.querySelectorAll(".card"); //get all cards by class
const resetBtn = document.querySelector("[data-reset-btn]");
const win = document.querySelector("[data-winner-text]")

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

cards.forEach((card) => card.addEventListener("click", flipCard));

//Flipping cards
function flipCard() {

  if (lockBoard) return; // funkcija posle etogo ne vipolnjaetsja
  if (this === firstCard) return; // esli eto pervaja kartocka to daljshe ne idesh pri nazatiji ona perevoracivatsja ne budet

  this.classList.add("flip"); // dobovljaju klas dlja perevertivanija kartocki

  if (!hasFlippedCard) {
    hasFlippedCard = true;  //etot kod vipolnjaetsaj toljko 1 raz esli perevernutaja 
    firstCard = this;

    return;
  }
  secondCard = this; // This eto vtaraja kartacka

  checkForMatch();  //zapuskaem funkciju
}

//Compare card    ===    card
function checkForMatch() {

let cardsAreEqual = false;

if (firstCard.dataset.memo === secondCard.dataset.memo){ //Sravnivaem 2 otkritiji kartocki
    cardsAreEqual = true;  // esli u nix odinakovie data-memo="vue" === data-memo="vue" to zapuskaem funkciju disableCards()
}else{
    cardsAreEqual = false; // esli razniji data-memo="vue" !==  data-memo="ember" to zapusti funkciju unflipCards();
}

if (cardsAreEqual === true) {
    counter++; 
    console.log(counter);
    
    disableCards();
}else{
    unflipCards();
}

}
// Esli karti odinakovi eta funkcija snimaet event "click" ctobi na nejo neljzaj bilo nazatj
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard(); // vozvrashaet vse nastroiki v nacaljnij statut 
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
secondCard = null; // null oznacaet zto vnejo necego ne soxraneno
if (counter === 6){
    win.innerHTML = `You Win !!!`;
    
}
}

(function initializeGame() {
  cards.forEach((card: HTMLElement) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = String(randomPos);
  });
})();

// document.classList.contains('flip');
