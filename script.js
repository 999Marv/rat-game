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

let ratBody = [];

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
    ratBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = ratBody.length - 1; i > 0; i--) {
    ratBody[i] = ratBody[i - 1];
  }

  if (ratBody.length) {
    ratBody[0] = [ratX, ratY];
  }

  context.fillStyle = 'gray';
  ratX += velocityX * blockSize;
  ratY += velocityY * blockSize;
  context.fillRect(ratX, ratY, blockSize, blockSize);

  for (let segment of ratBody) {
    context.fillRect(segment[0], segment[1], blockSize, blockSize);
  }

  //game over condition

  //out of bounds
  if (
    ratX < 0 ||
    ratX > cols * blockSize - 1 ||
    ratY < 0 ||
    ratY > cols * blockSize - 1
  ) {
    gameOver = true;
    alert('Out of Bounds');
  }

  //eat itself
  for (let i = 0; i < ratBody.length; i++) {
    if (ratX === ratBody[i][0] && ratY === ratBody[i][1]) {
      gameOver = true;
      alert('You ate yourself??');
    }
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
