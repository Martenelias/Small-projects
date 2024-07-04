const container = document.getElementById("tetris-container");

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

const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
let squares = Array.from(document.querySelectorAll(".tetris-box"));
const width = 10;
let nexRound = 0;
let timerId;
let score = 0;
const colors = [
  '#ecb5ff',
  '#ffa0ab',
  '#8cffb4',
  '#ff8666',
  '#80c3f5',
  '#c2e77d',
  '#fdf9a1',
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

timerId = setInterval(moveDown, 1000);

const freeze = () => {
  if (current.some(index => squares[currentPosition + index + width].classList.contains("bottom"))) {
    current.forEach(index => squares[currentPosition + index].classList.add("bottom"));
    random = Math.floor(Math.random() * tetrominoes.length);
    current = tetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
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
}