//variables for the map
let sizeOfBlock = 25;
let row = 20;
let col = 20;

let map = document.querySelector('#map');
map.height = row * sizeOfBlock;
map.width = col * sizeOfBlock;
let context = map.getContext('2d'); //draw empty map

//x and y variable coordinates of the food
let foodXCoor;
let foodYCoor;

//variables of the snake head / start box
let snakeXCoor = sizeOfBlock * 5;
let snakeYCoor = sizeOfBlock * 5;

//coordinates for moving the snake
let moveXCoor = 0;
let moveYCoor = 0;

let snakeFrame = [];

let gameLost = false;


createFood();
document.addEventListener('keyup', changePath);
createMap(); //call map
setInterval(createMap, 1000/100);

function createMap() {
    if(gameLost) {
        return;
    }
    
    context.fillStyle = 'rgb(0,0,0, 0.3)';
    context.fillRect(0, 0, map.width, map.height);

    context.fillStyle = 'red';
    context.fillRect(0, 0, foodXCoor, foodYCoor);

    if (snakeXCoor == foodXCoor && snakeYCoor == foodYCoor) {
        snakeFrame.push([foodXCoor, foodYCoor]);
    }
    for ( let count = snakeFrame.length - 1; count > 0; count--) {
        snakeFrame[count] = snakeFrame[count - 1];
    }
    if (snakeFrame.length) {
        snakeFrame[0] = [snakeXCoor, snakeYCoor];
    }

    context.fillStyle = 'green';
    snakeXCoor = moveXCoor * sizeOfBlock;
    snakeYCoor = moveYCoor * sizeOfBlock;
    context.fillRect(snakeXCoor, snakeYCoor, sizeOfBlock, sizeOfBlock);
    for (let count = 0; i < snakeFrame.length; i++) {
        context.fillRect(snakeFrame[count][0], snakeFrame[count][1], sizeOfBlock, sizeOfBlock);
    }

    //detection for collision
    if (snakeXCoor < 0 || snakeXCoor > col * sizeOfBlock || snakeYCoor < 0 || snakeYCoor > col * sizeOfBlock) {
    gameLost = true;
    alert('You Died!');
    }

    for (let count = 0; i < snakeFrame.length; count++) {
        if (snakeXCoor == snakeFrame[count][0] && snakeYCoor == snakeFrame[count][1]) {
            gameLost = true;
            alert('You Died!');
        }
    }
}

function changePath(event) {
    if (event.code == 'ArrowLeft' && moveXCoor != 1) {
        moveXCoor = -1;
        moveYCoor = 0;
    }

    if (event.code == 'ArrowRight' && moveXCoor != -1) {
        moveXCoor = 1;
        moveYCoor = 0;
    }

    if (event.code == 'ArrowUp' && moveYCoor != 1) {
        moveXCoor = 0;
        moveYCoor = 1;
    }

    if (event.code == 'ArrowDown' && moveYCoor != -1) {
        moveXCoor = 0;
        moveYCoor = -1;
    }
}

function createFood() {
    //(0-1) * col --> (0 - 19.9999) --> (0-19) * 25
    foodXCoor = Math.floor(Math.random() * col) * sizeOfBlock;
    foodYCoor = Math.floor(Math.random() * row) * sizeOfBlock;
}

