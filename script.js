const cellsContainer = document.querySelector(".cells-container");
const resultContainer = document.querySelector(".result-container");
const formContainer = document.querySelector(".form-container");
const startBtn = document.querySelector("#start");
const cells = document.querySelectorAll(".cells");
const resultMsg = document.querySelector(".result-msg");
const playAgainBtn = document.querySelector(".play-again-btn");
const resetBtn = document.querySelector(".reset-btn");

function gameFunctionality() {
let play = true;
let playerOneTurn = true;
let playerTwoTurn = false;
let totalCell = 9;

let payerXPattern = [];
let payerOPattern = [];

let playerXInput;
let playerOInput;

let playerX;
let playerO;

let winningCombination = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 6, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function playGame(e) {
  if (e.target.textContent === "" && play === true && totalCell > 0) {
    const cellIndex = Array.from(cells).indexOf(e.target);

    if (playerOneTurn === true) {
      e.target.textContent = "X";
      e.target.classList.add("player-one");
      playerOneTurn = false;
      playerTwoTurn = true;
      totalCell--;
      payerXPattern.push(cellIndex);
      checkWin();
    } else {
      e.target.textContent = "O";
      e.target.classList.add("player-two");
      playerOneTurn = true;
      playerTwoTurn = false;
      totalCell--;
      payerOPattern.push(cellIndex);
      checkWin();
    }
    return;
  }
}

function startGame(e) {
  e.preventDefault();
  playerXInput = document.querySelector("#player-one");
  playerOInput = document.querySelector("#player-two");

  playerX = playerXInput.value.trim();
  playerO = playerOInput.value.trim();

  formContainer.classList.add("hidden");
}

function checkWin() {
  for (let i = 0; i < winningCombination.length; i++) {
    const winningPatter = winningCombination[i];

    if (winningPatter.every((index) => payerXPattern.includes(index))) {
      resultMsg.textContent = `${playerX} defeated ${playerO}!`;
      play = false;
      resultContainer.classList.add("visible");
      return;
    }
    if (winningPatter.every((index) => payerOPattern.includes(index))) {
      resultMsg.textContent = `${playerO} defeated ${playerX}!`;
      play = false;
      resultContainer.classList.add("visible");
      return;
    }
  }

  if (play === true && totalCell === 0) {
    resultMsg.textContent = "It's a draw!";
    resultContainer.classList.add("visible");

    return;
  }
}



function resetBoard() {
  
  play = true;
  playerOneTurn = true;
  playerTwoTurn = false;
  totalCell = 9;
  payerXPattern = [];
  payerOPattern = [];
  resultMsg.textContent = "";

  resultContainer.classList.remove("visible");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-one");
    cell.classList.remove("player-two");
  });
}

function resetDisplay() {

  resetBoard()
  playerXInput.value = "";
  playerOInput.value = "";
  formContainer.classList.remove("hidden");
}



function playAgainDisplay () {

  resetBoard()

}


return ({startGame, playGame, playAgainDisplay, resetDisplay})


}

const gameFunctions = gameFunctionality() 






startBtn.addEventListener("click", gameFunctions.startGame);

cells.forEach((cell) => {
  cell.addEventListener("click", gameFunctions.playGame);
});

playAgainBtn.addEventListener("click", gameFunctions.playAgainDisplay)

resetBtn.addEventListener("click", gameFunctions.resetDisplay);
