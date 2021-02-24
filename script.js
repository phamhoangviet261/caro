const size = 16;
function Loaded() {
  CPlayer = 0; // Current Player (0 is O,1 is X)
  (l_played = []), (l_win = []);
  var imgp = document.getElementById("imgPlayer");
  //imgp.style.backgroundImage = "url('Images/Opng.png')";

  var table = document.getElementById("table");
  var row = document.getElementsByClassName("row");
  var square = document.getElementsByClassName("square");

  // Create Table
  table.innerHTML = "";
  for (y = 0; y < size; y++) {
    table.innerHTML += '<tr class="row"></tr>';
    for (x = 0; x < size; x++) {
      var div =
        '<div class="square" onClick="gamePlay(' + x + "," + y + ')"></div>';
      row.item(y).innerHTML += '<td class="col">' + div + "</td>";
      square.item(x + y * size).setAttribute("id", (x + y * size).toString());
      square.item(x + y * size).setAttribute("player", "-1");
    }
  }
}
// ----Handle Click
// ----Array Position item
let arrPos = new Array(16);
for (let i = 0; i < 16; i++) {
  arrPos[i] = new Array(16).fill(0);
}
let turnPlay = true; //true = O; false = X
function handleClick(x, y) {
  let clickSound = new Audio("./assets/click.mp3").play();
  //console.clear();
  if (arrPos[y][x] != 0) {
    return;
  }
  let item = document.getElementById(16 * y + x);
  if (turnPlay) {
    arrPos[y][x] = 1;
    item.style.backgroundImage = "url('./assets/O-chess-color.png')";
  } else {
    arrPos[y][x] = 2;
    item.style.backgroundImage = "url('./assets/X-chess-color.png')";
  }
  turnPlay = !turnPlay;
}
//----Check Win
let checkWin = (turn) => {
  //check row
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 12; j++) {
      if (
        arrPos[i][j] == turn &&
        arrPos[i][j + 1] == turn &&
        arrPos[i][j + 2] == turn &&
        arrPos[i][j + 3] == turn &&
        arrPos[i][j + 4] == turn
      ) {
        return true;
      }
    }
  }
  //check column
  for (let j = 0; j < 16; j++) {
    for (let i = 0; i < 12; i++) {
      if (
        arrPos[i][j] == turn &&
        arrPos[i + 1][j] == turn &&
        arrPos[i + 2][j] == turn &&
        arrPos[i + 3][j] == turn &&
        arrPos[i + 4][j] == turn
      ) {
        return true;
      }
    }
  }
  return false;
};
let checkDiagonal = (x, y, turn) => {
  let check = 1;
  if (turn) {
    check = 2;
  }
  if (
    arrPos[y][x] == check &&
    arrPos[y - 1][x - 1] == check &&
    arrPos[y - 2][x - 2] == check &&
    arrPos[y - 3][x - 3] == check &&
    arrPos[y - 4][x - 4] == check
  ) {
    return true;
  }
  if (
    arrPos[y][x] == 1 &&
    arrPos[y + 1][x + 1] == check &&
    arrPos[y + 2][x + 2] == check &&
    arrPos[y + 3][x + 3] == check &&
    arrPos[y + 4][x + 4] == check
  ) {
    return true;
  }
  if (
    arrPos[y][x] == 1 &&
    arrPos[y + 1][x - 1] == check &&
    arrPos[y + 2][x - 2] == check &&
    arrPos[y + 3][x - 3] == check &&
    arrPos[y + 4][x - 4] == check
  ) {
    return true;
  }
  if (
    arrPos[y][x] == 1 &&
    arrPos[y - 1][x + 1] == check &&
    arrPos[y - 2][x + 2] == check &&
    arrPos[y - 3][x + 3] == check &&
    arrPos[y - 4][x + 4] == check
  ) {
    return true;
  }
  return false;
};

let gamePlay = (x, y) => {
  handleClick(x, y);
  if (checkWin(1) || checkWin(2) || checkDiagonal(x, y, turnPlay)) {
    let clickSound = new Audio("./assets/win.mp3").play();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  changeTurn(turnPlay);
};
//----CHange turn counter
let changeTurn = (turn) => {
  let t1 = document.getElementById("player-turn-1");
  let t2 = document.getElementById("player-turn-2");
  if (turnPlay) {
    let text = t1.innerText;
    let tempText = text.slice(5, text.length);
    t1.innerHTML = text.slice(0, 6) + (parseInt(tempText) + 1);
  } else {
    let text = t2.innerText;
    let tempText = text.slice(5, text.length);
    t2.innerHTML = text.slice(0, 6) + (parseInt(tempText) + 1);
  }
};

document.getElementById("btn-newgame").addEventListener("click", () => {
  document.location.reload(true);
});
