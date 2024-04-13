export function createRandomMatrix(colums, rows) {
  const matrix = [];

  for (let i = 0; i < colums; i++) {
    matrix.push([]);
    for (let j = 0; j < rows; j++) {
      matrix[i].push(getRandomNumber() ? 1 : 0);
    }
  }

  return matrix;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) % 2 === 0;
}

export function createNextMatrix(matrix) {
  const nextMatrix = [];
  matrix.forEach((colum, iColum) => {
    colum.forEach((row, iRow) => {
      let cell = row;
      if (isAlive(cell)) {
        //cell is alive
      } else {
        // cell is dead
      }
    });
  });
}

function isAlive(cell) {
  return row ? true : false;
}

function getNeighbors(iRow, iColum, matrix) {}
