/**
 * @type HTMLCanvasElement
 */
import { createRandomMatrix } from "./patterns.js";

// getting our HTML elements:
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const set = document.getElementById("set");
const parent = document.getElementById("main");

//Getting the context from our canvas
const drawingContext = canvas.getContext("2d");

//setting the amount of pixils per side in our canvas
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

set.addEventListener("click", (e) => {
  const inputNumberOfCells = document.getElementById("inputNumber");
  console.log(set);
  console.log(inputNumberOfCells);
  if (inputNumberOfCells.value === "") {
    alert(`plese insert a number`);
  } else {
    pixelSideCount = inputNumberOfCells.value;
    refresh();
  }
});

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
  matrix.forEach((colum, iColum) => {
    colum.forEach((row, iRow) => {
      if (row) {
        colorInput.value = aliveCell;
      } else {
        colorInput.value = deathCell;
      }
      fillPixel(iColum, iRow);
    });
  });
}

const matrix = createRandomMatrix(pixelSideCount, pixelSideCount);
paintMatrixCells(matrix);

canvas.addEventListener("mousedown", handleCanvasMouseDown);
paintMatrixCells(matrix);

toggleGuide.addEventListener("change", handleToggleGuideChange);
