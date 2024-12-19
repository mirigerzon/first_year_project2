let letterArray = ['<span><span>', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
let numArray = ['<span><span>', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let submarinesArray = [2, 3, 3, 4, 4];
var matrix = new Array(10);
for (var i = 0; i < 10; i++) {
  matrix[i] = new Array(10);
}
var matrixComputer = new Array(10);
for (var i = 0; i < 10; i++) {
  matrixComputer[i] = new Array(10);
}
let countPlayer = 0;
let countComputer = 0;
let currentRows = 0;
let currentCols = 0;
let boolCurrentX = false;
const correctAudio = document.getElementById('correctAudio');
const nonCorrectAudio = document.getElementById('nonCorrectAudio');
let countSubmarines = 0;
const popupOverlay = document.querySelector(".popup-overlay");
const popupContainer = document.querySelector(".popup-container");
const closePopupButton = document.getElementById("close-popup");


window.onload = function () {
  addSquare("yourSquares");
  addSquare("computerSquares");
  let mute = document.getElementById('mute');
  mute.addEventListener("click", muteSound)

  let findUserData = JSON.parse(localStorage.getItem(`curentUser`));
  let name = findUserData.name;
  if (name === null) {
    alert("אינך מחובר אנא התחבר")
  }

  let span = document.getElementById("nameBoard");
  span.textContent = name;

  let connected = document.getElementById("notConnected");
  if (JSON.parse(localStorage.getItem(`curentUser`)) === null) {
    connected.classList.remove("connected");
  }
  else
    connected.classList.add("connected");
}

function muteSound() {
  correctAudio.muted = !correctAudio.muted;
  nonCorrectAudio.muted = !nonCorrectAudio.muted;
  if (mute.src.match("../image/muteIcon.png"))
    mute.src = "../image/sound.png";
  else
    mute.src = "../image/muteIcon.png";
}

function addSquare(squares) {
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (j == 0) {
        var letter = document.createElement("div");
        letter.classList.add("letter");
        document.getElementById(squares).appendChild(letter);
        document.getElementById(squares).innerHTML += numArray[i];
      }
      else if (i == 0) {
        var letter = document.createElement("div");
        letter.classList.add("letter");
        document.getElementById(squares).appendChild(letter);
        document.getElementById(squares).innerHTML += letterArray[j];
      }
      else {
        var square = document.createElement("div");
        square.classList.add("square");
        document.getElementById(squares).appendChild(square);
        square.setAttribute("data-row", j - 1);
        square.setAttribute("data-col", i - 1);
        square.setAttribute("choose", false);

      }
    }
  }
}

function computerChoice() {
  computerRows = Math.floor(Math.random() * 10);
  computerCol = Math.floor(Math.random() * 10);
  shipDirection = Math.floor(Math.random() * 2)
  console.log(computerRows);
  console.log(computerCol);
  return [computerRows, computerCol, shipDirection]
}

function checkEmptyCells(rowCell, colCell) {
  for (let j = -1; j < 2; j++) {
    for (let i = -1; i < 2; i++) {
      if (rowCell + j > -1 && rowCell + j < 10 && colCell + i > -1 && colCell + i < 10)
        if (matrix[rowCell + j][colCell + i])
          return false;
    }
  }
  return true;
}

function upCells(rowCells, colCells, size) {
  let downSize = 0;
  let topSize = 0;
  for (let i = 0; i < size; i++) {
    if (rowCells - i > -1) {
      if (!checkEmptyCells(rowCells - i, colCells))
        return false;
    }
  }
  for (let i = 0; i < size; i++) {
    if (rowCells - i >= 0) {
      matrix[rowCells - i][colCells] = true;
      topSize = rowCells - i;
    }
    else {
      downCells(rowCells, colCells, i);
      downSize = rowCells + i;
    }
  }
  if (!downSize)
    downSize = rowCells;
  for (let i = colCells - 1; i <= colCells + 1; i++) {
    for (let j = topSize - 1; j <= downSize + 1; j++) {
      if (j > -1 && j < 10 && i < 10 && i > -1 && !matrix[j][i]) {
        matrix[j][i] = false;
      }
    }
  }
  return true;
}

function downCells(rowCells, colCells, size) {
  for (let j = 0; j <= size; j++) {
    matrix[rowCells + j][colCells] = true;
  }
}

function rightCells(rowCells, colCells, size) {
  let downSize = 0;
  let topSize = 0;
  for (let i = 0; i < size; i++) {
    if (colCells - i > -1) {
      if (!checkEmptyCells(rowCells, colCells - i))
        return false;
    }
  }
  for (let i = 0; i < size; i++) {
    if (colCells - i >= 0) {
      matrix[rowCells][colCells - i] = true;
      topSize = colCells - i;
    }
    else {
      leftCells(rowCells, colCells, i);
      downSize = colCells + i;
    }
  }
  if (!downSize)
    downSize = colCells;
  for (let i = rowCells - 1; i <= rowCells + 1; i++) {
    for (let j = topSize - 1; j <= downSize + 1; j++) {
      if (j > -1 && j < 10 && i < 10 && i > -1 && !matrix[i][j]) {
        matrix[i][j] = false;
      }
    }
  }
  return true;
}

function leftCells(rowCells, colCells, size) {
  for (let j = 0; j <= size; j++) {
    matrix[rowCells][colCells + j] = true;
  }
}

function dataChoose() {
  let randPlace = computerChoice();
  for (let i = 0; i <= submarinesArray.length; i++) {
    while (!checkEmptyCells(randPlace[0], randPlace[1])) {
      randPlace = computerChoice(1, 10);
    }

    if (randPlace[2]) {
      while (!upCells(randPlace[0], randPlace[1], submarinesArray[i])) {
        randPlace = computerChoice();
      }
    }
    else if (!randPlace[2]) {
      while (!rightCells(randPlace[0], randPlace[1], submarinesArray[i])) {
        randPlace = computerChoice();
      }
    }
  }
}

function boardClickAction(e) {
  var row = e.target.dataset.row;
  var col = e.target.dataset.col;
  if (matrix[parseInt(row)][parseInt(col)]) {  //the browser found a ship
    var XPlace = (document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`))[1];
    if (XPlace.dataset.choose === "true") {
      boardClickAction();
    }
    XPlace.dataset.choose = "true";
    XPlace.className = "Xsquare";
    correctAudio.play();

    console.log(XPlace);
    ++countPlayer;
    if (countPlayer == 16) {
      openPopup();
    }

  }
  else {                          //the browser didnt find a ship
    var XPlace = (document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`))[1];
    if (XPlace.dataset.choose === "true") {
      boardClickAction();
    }
    XPlace.className = "roundSquare";
    console.log(XPlace);
    XPlace.dataset.choose = "true";
    nonCorrectAudio.play();

  }
  console.log(parseInt(row));
  console.log(parseInt(col));
  setTimeout(computerTurn, 0.2 * 1000);
}

function playerTurn() {
  document.getElementById('frame').classList.add('displayButton');
  var boardClick = document.getElementById("computerSquares");
  boardClick.addEventListener("click", boardClickAction);
}

function computerTurn(Rows, Cols) {
  let randChoose = computerChoice();
  if (matrixComputer[parseInt(randChoose[1])][parseInt(randChoose[0])]) {
    var XPlace = (document.querySelectorAll(`[data-row="${randChoose[0]}"][data-col="${randChoose[1]}"]`))[0];
    if (XPlace.dataset.choose === "true") {
      computerTurn();
    }
    XPlace.dataset.choose = "true";
    XPlace.className = "Xsquare";
    console.log(XPlace);
    ++countComputer;
    if (countComputer == 16) {
      openPopup();
    }
  }
  else {
    var XPlace = (document.querySelectorAll(`[data-row="${randChoose[0]}"][data-col="${randChoose[1]}"]`))[0];
    if (XPlace.dataset.choose === "true") {
      computerTurn();
    }
    XPlace.className = "roundSquare";
    console.log(XPlace);
  }
  playerTurn();
}

function handleDragAndDrop() {
  //dragged
  const submarines = document.querySelectorAll(".submarine");
  submarines.forEach(submarine => {
    submarine.addEventListener('dragstart', handleDrag);
  });
  //where dropped
  document.getElementById('yourSquares').addEventListener('dragover', handleDragOver);
  document.getElementById('yourSquares').addEventListener('drop', handleDrop);
}

function handleDrag(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.setData('formatText', e.target.dataset.len);

  console.log(e.target.id);
  console.log(e.target.dataset.len);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");

  e.target.appendChild(document.getElementById(data));
  console.log(e.target.dataset)
  for (let i = 0; i < e.dataTransfer.getData('formatText'); i++) {
    let myRow = JSON.parse(e.target.dataset.col);
    let myCol = JSON.parse(e.target.dataset.row);
    matrixComputer[myRow + i][myCol] = true;
    console.log(matrixComputer);
  }
  countSubmarines++;
  if (countSubmarines === 5) {
    document.getElementById('frame').classList.remove('displayButton');
    let start = document.getElementById('frame');
    start.addEventListener("click", playerTurn);
  }
}

function openPopup() {
  let findUserData = JSON.parse(localStorage.getItem(`curentUser`));
  let name = findUserData.email;

  let findUserPoint = JSON.parse(localStorage.getItem(name));
  newPoints = findUserPoint.points;
  newPoints += 10;

  let userData = JSON.parse(localStorage.getItem(name));
  userData.points = newPoints;
  localStorage.setItem(name, JSON.stringify(userData));

  popupOverlay.style.display = "flex";
  setTimeout(() => {
    popupContainer.style.opacity = "1";
    popupContainer.style.transform = "scale(1)";
  }, 100);
}

function closePopup() {
  popupContainer.style.opacity = "0";
  popupContainer.style.transform = "scale(0.8)";
  setTimeout(() => {
    popupOverlay.style.display = "none";
  }, 300);
}

closePopupButton.addEventListener("click", closePopup);

handleDragAndDrop();

dataChoose();