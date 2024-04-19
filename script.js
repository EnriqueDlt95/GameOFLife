/**
 * @type HTMLCanvasElement
 */
import { createRandomMatrix, createNextMatrix } from "./patterns.js";

// getting our HTML elements:
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const parent = document.getElementById("main");

//Getting the context from our canvas
const drawingContext = canvas.getContext("2d");

//setting the amount of pixels per side in our canvas
var pixelSideCount = 50;

// calculate the length of each pixel
const pixelLength = canvas.width / pixelSideCount;

// set default color of our pixels
colorInput.value = "#009578";
let deathCell = "#ffffff";
let aliveCell = "#009578";
//Initialize the canvas background

drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// variable to store out IntervalID

let nIntervalId;

//set up guide

// function setGuide(cellLength){
{
  guide.style.width = `${canvas.style.width}px `;
  guide.style.height = `${canvas.style.height}px `;
  guide.style.gridTemplateColumns = `repeat(${pixelSideCount}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${pixelSideCount}, 1fr)`;

  [...Array(pixelSideCount ** 2)].forEach(() => {
    guide.insertAdjacentHTML("beforeend", `<div></div>`);
  });
}

// }

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? null : "none";
}

// fill Pixel
function fillPixel(x, y) {
  const startX = x * pixelLength;
  const startY = y * pixelLength;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, pixelLength, pixelLength);
}

// function refresh(){
//     drawingContext.fillStyle = "#ffffff" ;
//     drawingContext.fillRect(0,0, canvas.width, canvas.height);

//set up guide

// function setGuide(cellLength){
//     guide.style.width = `${canvas.style.width}px `;
//     guide.style.height = `${canvas.style.height}px `;
//     guide.style.gridTemplateColumns = `repeat(${pixelSideCount}, 1fr)`;
//     guide.style.gridTemplateRows = `repeat(${pixelSideCount}, 1fr)`;

//     [...Array(pixelSideCount ** 2)].forEach(() => {
//     guide.insertAdjacentHTML('beforeend', `<div></div>`)
// });
// }

// function handleCanvasMouseDown(e) {
//     if(e.button !== 0){
//         return ;
//     }

//     const canvasBoundingRect = canvas.getBoundingClientRect();

//     const x = e.clientX - canvasBoundingRect.left;
//     const y = e.clientY - canvasBoundingRect.top;;
//     const cellX = Math.floor(x / pixelLength);
//     const cellY = Math.floor(y / pixelLength);

//     fillPixel(cellX,cellY);
//     matrix[cellX][cellY] = 1;
// }

function paintMatrixCells(matrix) {
  matrix.forEach((row, iRow) => {
    row.forEach((colum, iColum) => {
      if (colum) {
        colorInput.value = aliveCell;
      } else {
        colorInput.value = deathCell;
      }
      fillPixel(iColum, iRow);
    });
  });
}

let matrix = createRandomMatrix(pixelSideCount, pixelSideCount);
paintMatrixCells(matrix);

function playGameofLife() {
  let newMatrix = createNextMatrix(matrix);
  paintMatrixCells(newMatrix);
  matrix = [...newMatrix];
  console.log("play");
  return matrix;
}

function startGame() {
  //check if an inteval has already been set up
  if (!nIntervalId) {
    nIntervalId = setInterval(playGameofLife, 500);
  }
}

function pauseGame() {
  clearInterval(nIntervalId);
  console.log("pause");
  // release our intervalID from the variable
  nIntervalId = null;
}

play.addEventListener("click", startGame);
pause.addEventListener("click", pauseGame);
toggleGuide.addEventListener("change", handleToggleGuideChange);

// canvas.addEventListener("mousedown", handleCanvasMouseDown);
// const nextMatrix = createNextMatrix(matrix);
// console.log(matrix);
// console.log(nextMatrix);
