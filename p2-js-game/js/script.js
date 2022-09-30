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
let snakeYCoor;


createMap(); //call map

function createMap() {

    context.fillStyle = 'black';
    context.fillRect(0, 0, map.width, map.height);

    context.fillStyle = 'red';
    context.fillRect(0, 0, foodXCoor, foodYCoor);

    if(snakeXCoor == foodXCoor && snakeYCoor == foodYCoor) {

    }
}







function createMap() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, map.width, map.height)
}