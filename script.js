let noOfBomb = 10;
let dimension = 9;
let score = 0;
// let totalScore = 0;
let timerId;
let board;
const bomb = "💣";
const smileEmoji = "😊";
const sadEmoji = "🥴";

const adjacentBombs = (row, col) => {
  var i, j, num_of_bombs;
  num_of_bombs = 0;

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      if (board[row + i] && board[row + i][col + j]) {
        num_of_bombs++;
      }
    }
  }
  return num_of_bombs;
};

const createBoard = () => {
  board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};

const placeBomb = () => {
  for (let i = 0; i < noOfBomb; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col]) i--;
    else board[row][col] = true;
  }
};

// console.log(...arr);

const createGrid = () => {
  let gameContainer = document.getElementById("gameContainer");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.id = `${i}${j}`;
      cell.classList.add("gameGrid");
      cell.setAttribute("onclick", "handleClick(this)");
      if (board[i][j]) cell.classList.add("bombPlaced");
      else board[i][j] = false;
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
};

const handleClick = (el) => {
  if (el.classList.contains("selected")) return;
  el.classList.add("selected");
  var elId = el.id;
  let flag = board[elId[0]][elId[1]];
  if (flag === true) {
    document.getElementById("totalScore").innerHTML = score;
    document.getElementById("gameOverContainer").classList.remove("hide");
    clearInterval(timerId);
    el.classList.add("red");
    gameOver();
  }

  if (flag === false) {
    score++;
    el.classList.add("green");
    let adjMine = adjacentBombs(Number(elId[0]), Number(elId[1]));
    document.getElementById(elId).innerHTML = adjMine;
  }
  if (score === 71) {
    win();
  }
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
};
const win = () => {
  alert("you win");
};
const gameOver = () => {
  let cell = document.getElementsByClassName("gameGrid");
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      cell[`${i}${j}`].setAttribute("onclick", "");
      if (cell[`${i}${j}`].classList.contains("bombPlaced")) {
        cell[`${i}${j}`].classList.add("red");
        cell[`${i}${j}`].textContent = bomb;
      }
    }
  }
  document.getElementById("smileEmoji").textContent = sadEmoji;
  return;
};

const startNewGame = () => {
  score = 0;
  createBoard();
  placeBomb();
  document.getElementById("gameContainer").innerHTML = "";
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
  document.getElementById("smileEmoji").innerHTML = smileEmoji;
  startTimer();
  createGrid();
  document.getElementById("gameOverContainer").classList.add("hide");
};

const exit = () => {
  window.location.reload();
};

const startTimer = () => {
  let minute = 0;
  let second = 0;
  timerId = setInterval(() => {
    second++;

    document.getElementById("second").innerHTML = ("00" + second).substr(-2);
    document.getElementById("minute").innerHTML = ("00" + minute).substr(-2);
    if (second === 59) {
      second = 0;
      minute++;
    }
  }, 1000);
};
const startGame = () => {
  document.getElementById("pregame").classList.add("hide");
  document.getElementById("container").classList.remove("hide");
  createBoard();
  placeBomb();
  createGrid();
  startTimer();
};
