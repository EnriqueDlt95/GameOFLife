export function createRandomMatrix(colums = 50, rows = 50) {
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
  matrix.forEach((row, iRow) => {
    nextMatrix.push([]);
    row.forEach((colum, iColum) => {
      let cell = colum;
      const neighbours = getNeighbors(iRow, iColum, matrix);
      const neighboursAlive = getCellsAlive(neighbours);
      //cell is alive
      if (isAlive(cell)) {
        // cell die over population or isolation
        if (neighboursAlive > 3 || neighboursAlive < 2) {
          nextMatrix[iRow].push(0);
        } else {
          // cells stay alive if there is 2 or 3 neighbours Cells alive
          nextMatrix[iRow].push(cell);
        }
      }
      // cell is dead
      if (!isAlive(cell)) {
        if (neighboursAlive === 3) {
          // the cell is born if it has 3 neighbours Alive
          nextMatrix[iRow].push(1);
        } else {
          nextMatrix[iRow].push(cell); // if not it stays dead
        }
      }
    });
  });

  return nextMatrix;
}

function isAlive(cell) {
  return cell ? true : false;
}

function getNeighbors(iRow, iColum, matrix) {
  let neighboursValueList = [];
  const neighborsMap = new Object([
    [iRow - 1, iColum + 1],
    [iRow - 1, iColum],
    [iRow - 1, iColum - 1],
    [iRow, iColum + 1],
    [iRow, iColum - 1],
    [iRow + 1, iColum + 1],
    [iRow + 1, iColum],
    [iRow + 1, iColum - 1],
  ]);

  for (const [row, colum] of neighborsMap) {
    if (row >= 0 && row < 50 && colum >= 0 && colum < 50) {
      // console.log(row + " " + colum);
      neighboursValueList.push(matrix[row][colum]);
    }
  }
  // console.log(neighborsMap);
  return neighboursValueList;
}

function getCellsAlive(neighbours) {
  const cellsAlive = neighbours.reduce((accumulator, currentCell) => {
    if (currentCell === 1) {
      return accumulator + 1;
    } else return accumulator;
  }, 0);

  return cellsAlive;
}

// const matrix = createRandomMatrix();
// console.log(getNeighbors(0, 0, matrix));
// console.log(getCellsAlive(getNeighbors(0, 0, matrix)));


