var grid;

for (let i = 0; i < 81; i++) {
  let id = "cell-" + i.toString();
  document.getElementById(id).addEventListener("keyup", onChange);
}

function onChange(e) {
  let target = e.target;
  if (target.value > 9 || target.value < 1) {
    target.value = "";
  }
}

function init() {
  grid = Array(9);

  for (let i = 0; i < 9; i++) {
    grid[i] = Array(9).fill(0);
  }
}

function resolve() {
  init();
  fetchData();
  solve();
}

function isValidMove(x, y, n) {
  for (let i = 0; i < 9; i++) {
    if (grid[i][x] == n) {
      return false;
    }
    if (grid[y][i] == n) {
      return false;
    }
  }

  let x1 = Math.floor(x / 3) * 3;
  let y1 = Math.floor(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[y1 + i][x1 + j] == n) {
        return false;
      }
    }
  }
  return true;
}

function fetchData() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let id = "cell-" + (i * 9 + j).toString();
      if (document.getElementById(id).value == "") continue;
      grid[i][j] = parseInt(document.getElementById(id).value);
    }
  }
}

function solve() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] == 0) {
        for (let n = 1; n < 10; n++) {
          if (isValidMove(j, i, n)) {
            grid[i][j] = n;
            solve();
            grid[i][j] = 0;
          }
        }
        return;
      }
    }
  }
  fill();
}

function fill() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let id = "cell-" + (i * 9 + j);
      document.getElementById(id).value = grid[i][j];
    }
  }
}
