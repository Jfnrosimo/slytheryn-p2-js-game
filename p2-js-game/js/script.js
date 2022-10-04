//variables for the map
let sizeOfBlock = 50;
let row = 20;
let col = 30;

const map = document.querySelector('#map');
map.height = row * sizeOfBlock;
map.width = col * sizeOfBlock;
const context = map.getContext('2d'); //draw empty map

//x and y variable coordinates of the food
let foodXCoor;
let foodYCoor;

let foodImage = new Image();
foodImage.src = '../assets/images/chicken.png';

//variables of the snake head / start box
let snakeXCoor = sizeOfBlock;
let snakeYCoor = sizeOfBlock;

let snakeHead = new Image();
snakeHead.src = '../assets/images/snake_head.png';

//coordinates for moving the snake
let moveXCoor = 0;
let moveYCoor = 0;

let snakeFrame = []; //this will store the body of snake

let gameLost = false; //default variable for detecting if game is lost

//map background
let mapBackground = new Image();
mapBackground.src = '../assets/images/map_bg_2.jpg';

//score variables
const scoreNumber = document.querySelector('.score-number');
let previousScore = 0;

//difficulty variables
const difficultyDiv = document.querySelector('.difficulty');
const difficultyTitle = document.querySelector('.difficulty-title');
const easyBtn = document.querySelector('.easy');
const moderateBtn = document.querySelector('.moderate');
const hardBtn = document.querySelector('.hard');

// game start elements
const main = document.querySelector('main');
const startSection = document.querySelector('.play-container');


//controls and miscellaneous
const restartBtn = document.querySelector('.restart');

// create variable to set the difficulty button default as easy
let easy;

// sound effects
const addScore = new Audio('../assets/sound-effects/score.mp3');
const win = new Audio('../assets/sound-effects/win.wav');
const lose = new Audio('../assets/sound-effects/lose.wav')

//create game over pop up elements
const gameLostDiv = document.createElement('div');
gameLostDiv.className = 'game-lost';

const gameLostTitle = document.createElement('h3');
gameLostTitle.textContent = 'You Died...';

const startGame = document.querySelector('.start-game');

//create win game pop up elements
const gameWinDiv = document.createElement('div');
gameWinDiv.className = 'game-win';

const gameWinTitle = document.createElement('h3')



//--- Create event listener for easy, moderate and hard button ---//
easyBtn.addEventListener('click', () => {
    easy = setInterval(createMap, 1000/4);
    main.removeChild(startSection);
});

moderateBtn.addEventListener('click', () => {
    easy = setInterval(createMap, 1000/6);
    main.removeChild(startSection);
});

hardBtn.addEventListener('click', () => {
    easy = setInterval(createMap, 1000/8);
    main.removeChild(startSection);
});

createFood(); //create food after choosing difficulty
document.addEventListener('keyup', changePath); //assign arrow key controls

//create event listener for resetting the game
restartBtn.addEventListener('click', () => {
    restart();
    main.insertBefore(startSection, main.children[0]);
});


//------------- This section are all functions ------------//
function createMap() {
    
    if(gameLost) {
        return;
    }

    //draw map background
    context.drawImage(mapBackground, 0, 0, map.width,map.height);
    
    // draw the random food in the map
    context.drawImage(foodImage,foodXCoor, foodYCoor, sizeOfBlock, sizeOfBlock);

    //check if snake head has the same coordinate as food
    if (snakeXCoor == foodXCoor && snakeYCoor == foodYCoor) {
        snakeFrame.push([foodXCoor, foodYCoor]);
        addScore.play(); // add sound effects with collision with food
        createFood();
        
        // add score
        previousScore += 10;
        scoreNumber.textContent = previousScore;
    }

    //create a for loop to advance the snake frame into its next position
    for ( let count = snakeFrame.length - 1; count > 0; count--) {
        snakeFrame[count] = snakeFrame[count - 1];
    }

    //insert the current snake coordinates into the snake's first index
    if (snakeFrame.length) {
        snakeFrame[0] = [snakeXCoor, snakeYCoor];
    }

    snakeXCoor += moveXCoor * sizeOfBlock;
    snakeYCoor += moveYCoor * sizeOfBlock;
    context.drawImage(snakeHead, snakeXCoor, snakeYCoor, sizeOfBlock, sizeOfBlock);
    context.fillStyle = 'lime';    

    for (let count = 0; count < snakeFrame.length; count++) {
        context.fillRect(snakeFrame[count][0], snakeFrame[count][1], sizeOfBlock, sizeOfBlock);
    }

    //detection for collision
    if (snakeXCoor < 0 || snakeXCoor > col * sizeOfBlock || snakeYCoor < 0 || snakeYCoor > row * sizeOfBlock) {
        gameLost = true;
        lose.play(); // play the losing sound effects
        gameLostPopUp(); // show the game lost pop up
        // alert('You died...')
    }

    for (let count = 0; count < snakeFrame.length; count++) {
        if (snakeXCoor == snakeFrame[count][0] && snakeYCoor == snakeFrame[count][1]) {
            gameLost = true;
            lose.play(); // play the losing sound effects
            gameLostPopUp(); // show the game lost pop up
            // alert('You died...')
        }
    }

    if (previousScore == 600) {
        win.play();
        gameWinPopUp();
        restart();
    }
}

//function for event key controls
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

//create an object randomly around the map
function createFood() {
    //(0-1) * col --> (0 - 29.9999) --> (0-19) * 50
    foodXCoor = Math.floor(Math.random() * col) * sizeOfBlock;
    foodYCoor = Math.floor(Math.random() * row) * sizeOfBlock;
}

//restart the game
function restart() {
    snakeXCoor = sizeOfBlock;
    snakeYCoor = sizeOfBlock;

    moveXCoor = 0;
    moveYCoor = 0;

    snakeFrame = [];

    gameLost = false;

    previousScore = 0;
    scoreNumber.textContent = 0;

    clearInterval(easy);

    createMap();
}

//create function that modifies the start game into you died pop up
function gameLostPopUp() {
    main.insertBefore(gameLostDiv, main.children[1]);
    gameLostDiv.appendChild(gameLostTitle);
    difficultyDiv.removeChild(startGame); //remove from game lost pop up
    restartBtn.classList.add('center-restart');

    //after game lost pop up use restart button to go back to start game
    restartBtn.addEventListener('click', () => {
        main.removeChild(gameLostDiv);
        restart();

        startSection.append(difficultyDiv);
        difficultyDiv.insertBefore(startGame, difficultyDiv.children[0]);
        restartBtn.classList.remove('center-restart');
    });
}

//create function that modifies the start game into you win pop up
function gameWinPopUp() {
    main.insertBefore(gameWinDiv, main.children[1]);
    gameWinDiv.appendChild(gameLostTitle);
    gameLostTitle.textContent = 'You Win!!!';

    restartBtn.classList.add('center-restart');

    //after game lost pop up use restart button to go back to start game
    restartBtn.addEventListener('click', () => {
        main.removeChild(gameWinDiv);
        restart();

        startSection.append(difficultyDiv);
        difficultyDiv.insertBefore(startGame, difficultyDiv.children[0]);
        restartBtn.classList.remove('center-restart');
    });
}
