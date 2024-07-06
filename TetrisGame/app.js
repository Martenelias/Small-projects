const container = document.getElementById("tetris-container");
const nextShape = document.getElementById("nextShape");

for (let i = 0; i < 200; i++) {
  const div = document.createElement("div");
  div.classList.add("tetris-box");
  container.appendChild(div);
};
for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  div.classList.add("tetris-box", "bottom");
  container.appendChild(div);
};

for (let i = 0; i < 16; i++) {
  const div = document.createElement("div");
  div.classList.add("next-shape");
  nextShape.appendChild(div);
};

const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const myGameOver = document.getElementById("myGameOver");
myGameOver.style.display = "none";
let squares = Array.from(document.querySelectorAll(".tetris-box"));
let displaySquares = Array.from(document.querySelectorAll(".next-shape"));
const displayWidth = 4;
let displayIndex = 0;
const width = 10;
let nextRandom = 0;
let timerId;
let score = 0;
const colors = [
  "#ecb5ff",
  "#ffa0ab",
  "#8cffb4",
  "#ff8666",
  "#80c3f5",
  "#c2e77d",
  "#fdf9a1",
];

const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1],
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1]
];

const tTetromino = [
  [1,width,width+1,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width,width+1,width*2+1]
];

const oTetromino = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
];

const iTetromino = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]
];

const nextUpTetrominos = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [displayWidth+1, displayWidth*2+1, displayWidth*2+2, displayWidth*3+2], //zTetromino
  [displayWidth+1, displayWidth*2, displayWidth*2+1, displayWidth*2+2], //tTetromino
  [displayWidth*2+1, displayWidth*2+2, displayWidth+1, displayWidth+2], //oTetromino
  [1, displayWidth+1, displayWidth*2+1,  displayWidth*3+1] //iTetromino
];

const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * tetrominoes.length);
let current = tetrominoes[random][currentRotation];



const draw = () => {
  current.forEach(index => {
    squares[currentPosition + index].classList.add("tetromino");
  })
};

const undraw = () => {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove("tetromino");
  })
};

const controls = (e) => {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate(); 
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
};

document.addEventListener("keyup", controls);

const moveDown = () => {
  undraw();
  currentPosition += width;
  draw();
  freeze();
};

const freeze = () => {
  if (current.some(index => squares[currentPosition + index + width].classList.contains("bottom"))) {
    current.forEach(index => squares[currentPosition + index].classList.add("bottom"));
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * tetrominoes.length);
    current = tetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
};

const moveLeft = () => {
  undraw();
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if (!isAtLeftEdge) currentPosition -= 1;
  if (current.some(index => squares[currentPosition + index].classList.contains("bottom"))) {
    currentPosition += 1;
  }
  draw();
};

const moveRight = () => {
  undraw();
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
  if (!isAtRightEdge) currentPosition += 1;
  if (current.some(index => squares[currentPosition + index].classList.contains("bottom"))) {
    currentPosition -= 1;
  }
  draw();
};


const isAtRight = () => {
  return current.some(index => (currentPosition + index + 1) % width === 0);
};

const isAtLeft = () => {
  return current.some(index => (currentPosition + index) % width === 0);
};

const checkRotatePosition = (P) => {
  P = P || currentPosition;
  if ((P + 1) % width < 4) {
    if (isAtRight()) {
      currentPosition += 1;
      checkRotatePosition(P);
    }
  }
  else if (P % width > 5) {
    if (isAtLeft()) {
      currentPosition += 1;
      checkRotatePosition(P);
    }
  }
};

const rotate = () => {
  undraw();
  currentRotation ++;
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = tetrominoes[random][currentRotation];
  checkRotatePosition();
  draw();
};

const displayShape = () => {
  displaySquares.forEach(squares => {
    squares.classList.remove("tetromino")
  });
  nextUpTetrominos[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add("tetromino")
  });
};

startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 1000);
    displayShape();
  }
});

const addScore = () => {
  for (let i = 0; i < 199; i += width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    if (row.every(index => squares[index].classList.contains("bottom"))) {
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach(index => {
        squares[index].classList.remove("bottom");
        squares[index].classList.remove("tetromino");
      });
      const squaresRemoved = squares.splice(i, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach(cell => container.appendChild(cell));
    }
  }
};

const gameOver = () => {
  if (current.some(index => squares[currentPosition + index].classList.contains("bottom"))) {
    myGameOver.style.display = "flex";
    clearInterval(timerId);
  }
};