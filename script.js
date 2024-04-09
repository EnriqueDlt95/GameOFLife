
/**
 * @type HTMLCanvasElement
 */


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


    drawingContext.fillStyle = "#ffffff" ;
    drawingContext.fillRect(0,0, canvas.width, canvas.height);



//set up guide
    
// function setGuide(cellLength){
    guide.style.width = `${canvas.style.width}px `;
    guide.style.height = `${canvas.style.height}px `;
    guide.style.gridTemplateColumns = `repeat(${pixelSideCount}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${pixelSideCount}, 1fr)`;

    [...Array(pixelSideCount ** 2)].forEach(() => {
    guide.insertAdjacentHTML('beforeend', `<div></div>`)
});

// }


// function handleToggleGuideChange() {
//     guide.style.display = toggleGuide.checked ? null : "none";
// }

// fill Pixel
function fillPixel(x,y){
    const startX = x * pixelLength;
    const startY = y * pixelLength;

    drawingContext.fillStyle = colorInput.value;
    drawingContext.fillRect(startX, startY, pixelLength,pixelLength);
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




set.addEventListener("click", e => {
    const inputNumberOfCells = document.getElementById("inputNumber");
    console.log(set);
    console.log(inputNumberOfCells);
    if(inputNumberOfCells.value === ''){
        alert(`plese insert a number`);
        
    }else{
        pixelSideCount = inputNumberOfCells.value;
        refresh();
    }
});
// toggleGuide.addEventListener("change", handleToggleGuideChange);


function createRandomMatrix(colums, rows){
    const matrix = [];

    for(let i = 0; i < colums; i++){
        matrix.push([]);
        for(let j = 0; j< rows; j++){
            matrix[i].push(getRandomNumber() ? 1 : 0);
        }
    }

    return matrix;
}

function getRandomNumber(){
    return Math.floor(Math.random() * 100) % 2 === 0;
}

const matrix = createRandomMatrix(pixelSideCount, pixelSideCount);

function paintMatrixCells(matrix){
    matrix.forEach((colum, iColum) => {
        colum.forEach((row, iRow) => {
            if(row){
                colorInput.value = aliveCell;
            }else{
                colorInput.value = deathCell;
            }
            fillPixel(iColum,iRow);
        });
    });

}

paintMatrixCells(matrix);