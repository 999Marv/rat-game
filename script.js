// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// rat head
let ratX = blockSize * 5;
let ratY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let ratImg;

//counter
let counter = document.getElementById('counter');
let score = document.getElementById('score');
let gameName = document.getElementById('name');
let textHolder = document.getElementById('text-holding');

//food
let foodX;
let foodY;

//game over
let gameOver = false;

window.onload = () => {
  board = document.getElementById('board');
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext('2d');
  placeFood();
  document.addEventListener('keyup', changeDirection);
  setInterval(update, 1000 / 10);
};

const update = () => {
  if (gameOver) return;

  context.fillStyle = 'black';
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = 'yellow';
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (ratX === foodX && ratY === foodY) {
    counter.textContent++;
    placeFood();
  }

  ratX += velocityX * blockSize;
  ratY += velocityY * blockSize;
  ratImg = new Image();
  ratImg.src = './rat.png';
  ratImg.onload = () => {
    context.drawImage(ratImg, ratX, ratY, blockSize, blockSize);
  };
  // context.fillStyle = 'gray';
  // ratX += velocityX * blockSize;
  // ratY += velocityY * blockSize;
  // context.fillRect(ratX, ratY, blockSize, blockSize);

  //game over condition

  //out of bounds
  if (
    ratX < 0 ||
    ratX > cols * blockSize - 1 ||
    ratY < 0 ||
    ratY > cols * blockSize - 1
  ) {
    gameOver = true;
    gameName.remove();
    score.remove();
    counter.remove();
    let gameEnd = document.createElement('h1');
    gameEnd.textContent = 'You lost';
    gameEnd.style.color = 'red';
    textHolder.append(gameEnd);
  }
};

changeDirection = (e) => {
  if (e.code === 'ArrowUp' && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === 'ArrowRight' && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.code === 'ArrowLeft' && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === 'ArrowDown' && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
};

const placeFood = () => {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
};
