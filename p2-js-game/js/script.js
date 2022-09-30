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

//coordinate for moving the snake
let moveXCoor = 0;
let moveYCoor = 0;

let snakeFrame = [];

let gameLost = false;

createMap(); //call map

function createMap() {

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
    if(event.code == 'ArrowLeft' && moveYCoor != 1) {
        moveXCoor = -1;
        moveYCoor = 0;
    }

    if(event.code == 'ArrowRight' && moveXCoor != -1) {
        
    }
}

