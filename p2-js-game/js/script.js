//variables for the map
let sizeOfBlock = 25;
let row = 20;
let col = 30;

let map = document.querySelector('#map');
map.height = row * sizeOfBlock;
map.width = col * sizeOfBlock;
let context = map.getContext('2d'); //draw empty map

//x and y variable coordinates of the food
let foodXCoor;
let foodYCoor;

let foodImage = new Image();
foodImage.src = '../assets/images/chicken.png';

//variables of the snake head / start box
let snakeXCoor = sizeOfBlock * 5;
let snakeYCoor = sizeOfBlock * 5;

let snakeHead = new Image();
snakeHead.src = '../assets/images/snake_head.png';


//coordinates for moving the snake
let moveXCoor = 0;
let moveYCoor = 0;

let snakeFrame = [];

let gameLost = false; //default variable for detecting if game is lost

//background
let mapBackground = new Image();
mapBackground.src = '../assets/images/map_bg_2.jpg';

//score variables
let scoreNumber = document.querySelector('.score-number');
let previousScore = 0;

//difficulty variables
let easyBtn = document.querySelector('.easy');
let mediumBtn = document.querySelector('.medium');
let hardBtn = document.querySelector('.hard');


//set easy as default difficulty
createFood();
document.addEventListener('keyup', changePath);
// createMap(); //call map
setInterval(createMap, 1000/5); //second parameter is in milliseconds

//set difficulty to medium
mediumBtn.addEventListener('click', () => {
    setInterval(createMap, 1000/6);
});

//set difficulty to hard
hardBtn.addEventListener('click', () => {
    setInterval(createMap, 1000/8);
});

function createMap() {

    if(gameLost) {
        return;
    }

    context.drawImage(mapBackground, 0, 0, map.width,map.height);
    
    // draw the random food in the map
    context.drawImage(foodImage,foodXCoor, foodYCoor, sizeOfBlock, sizeOfBlock);

    if (snakeXCoor == foodXCoor && snakeYCoor == foodYCoor) {
        snakeFrame.push([foodXCoor, foodYCoor]);
        createFood();
        
        // add score
        previousScore += 10;
        scoreNumber.textContent = previousScore;
    }

    for ( let count = snakeFrame.length - 1; count > 0; count--) {
        snakeFrame[count] = snakeFrame[count - 1];
    }

    if (snakeFrame.length) {
        snakeFrame[0] = [snakeXCoor, snakeYCoor];
    }

    
    snakeXCoor += moveXCoor * sizeOfBlock;
    snakeYCoor += moveYCoor * sizeOfBlock;
    context.drawImage(snakeHead, snakeXCoor, snakeYCoor, sizeOfBlock, sizeOfBlock);
    context.fillStyle = 'green';    

    for (let count = 0; count < snakeFrame.length; count++) {
        context.fillRect(snakeFrame[count][0], snakeFrame[count][1], sizeOfBlock, sizeOfBlock);
    }

    //detection for collision
    if (snakeXCoor < 0 || snakeXCoor > col * sizeOfBlock || snakeYCoor < 0 || snakeYCoor > row * sizeOfBlock) {
    gameLost = true;
    alert('You Died!');
    }

    for (let count = 0; count < snakeFrame.length; count++) {
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
        moveYCoor = -1;
    }

    if (event.code == 'ArrowDown' && moveYCoor != -1) {
        moveXCoor = 0;
        moveYCoor = 1;
    }
}

function createFood() {
    //(0-1) * col --> (0 - 19.9999) --> (0-19) * 25
    foodXCoor = Math.floor(Math.random() * col) * sizeOfBlock;
    foodYCoor = Math.floor(Math.random() * row) * sizeOfBlock;
}

//controls and miscellaneous
let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');

startBtn.addEventListener('click', () => {
    
});

restartBtn.addEventListener('click', () => {
    snakeXCoor = sizeOfBlock * 5;
    snakeYCoor = sizeOfBlock * 5;

    moveXCoor = 0;
    moveYCoor = 0;

    snakeFrame = [];

    gameLost = false;

    scoreNumber = document.querySelector('.score-number');
    previousScore = 0;
});

