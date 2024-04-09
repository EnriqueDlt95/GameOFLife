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

export{createRandomMatrix, getRandomNumber}