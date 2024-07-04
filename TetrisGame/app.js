const iTetromino = "iShape";
const jTetromino = "jShape";
const lTetromino = "lShape";
const oTetromino = "oShape";
const zTetromino = "zShape";
const tTetromino = "tShape";
const sTetromino = "sShape";
const tetrominoes = [iTetromino, jTetromino, lTetromino, oTetromino, zTetromino, tTetromino, sTetromino];
const scoreDisplay = document.getElementById("score");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tetris-container");

  for (let i = 0; i < 200; i++) {
    const div = document.createElement("div");
    div.classList.add("tetris-box");
    container.appendChild(div);
  }
  let squares = Array.from(document.querySelectorAll(".tetris-box"));
  console.log(squares);
});