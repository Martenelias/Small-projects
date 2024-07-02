const letsPlay = document.getElementById("letsPlay");
const usernameInput = document.getElementById("username");
let errorText = document.getElementById("errorText");
const gameBtn = document.getElementById("gameBtn");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
let gamesLeft = document.getElementById("gamesLeft");
let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");
const nextRound = document.getElementById("nextRound");
const playAgain = document.getElementById("playAgain");

let username = "";
let playerScoreCount = 0;
let computerScoreCount = 0;
let roundsPlayed = 0;

window.onload = function() {
  gameBtn.addEventListener("click", closeWindow);
  usernameInput.addEventListener("input", getUsername);
  nextRound.addEventListener("click", getNextRound);
  playAgain.addEventListener("click", resetGame);

  document.getElementById("nextRound").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  
  rock.addEventListener("click", () => getPlayerChoice("rock"));
  paper.addEventListener("click", () => getPlayerChoice("paper"));
  scissors.addEventListener("click", () => getPlayerChoice("scissors"));
};

// Checking, if name contains numbers or symbols.
function getUsername() {
  username = usernameInput.value;
  let namePattern = /^[a-zA-Z\s]+$/;

  if (username === "") {
    errorText.textContent = "*Please enter your name.";
    gameBtn.disabled = true;
  } else if (!namePattern.test(username)) {
    errorText.textContent = "*Your name can't contain numbers or symbols.";
    gameBtn.disabled = true;
  } else {
    errorText.textContent = "";
    gameBtn.disabled = false;
  }
}

function closeWindow() {
  if (!gameBtn.disabled) {
    letsPlay.classList.add("slide-out");
    setTimeout(() => {
      letsPlay.style.display = "none";
      nextRound.style.display = "block";
      document.getElementById("myName").textContent = username;
    }, 1000);
  }
}

function getPlayerChoice(playerChoice) {
  if (roundsPlayed < 5) {
    const computerChoice = getComputerChoice();
    const result = getWinner(playerChoice, computerChoice);
    displayResult(result, computerChoice);

    // disable rock, paper and scissors while you press next round.
    if (result) {
      document.querySelector(".rpsContainer").style.pointerEvents = "none";
    }
  }
}

// Calculate random choice for the computer.
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(playerOne, computer) {
  if (playerOne === computer) {
    return "Tie Game!";
  } else if (
    (playerOne === "rock" && computer === "scissors") ||
    (playerOne === "paper" && computer === "rock") ||
    (playerOne === "scissors" && computer === "paper")
  ) {
    playerScoreCount += 1;
    updateScore();
    return `${username} wins!`;
  } else {
    computerScoreCount += 1;
    updateScore();
    return "Computer wins!";
  }
}

function updateScore() {
  playerScore.textContent = playerScoreCount;
  computerScore.textContent = computerScoreCount;
}

function getNextRound() {
  roundsPlayed += 1;
  gamesLeft.textContent = roundsPlayed;
  nextRound.disabled = true;

  if (roundsPlayed < 5) {
    document.querySelector(".rpsContainer").style.pointerEvents = "auto";
    document.getElementById("resultText").textContent = "Choose rock, paper or scissors.";
  } else {
    document.getElementById("nextRound").style.display = "none";
    document.getElementById("playAgain").style.display = "block";
    displayFinalResult();
  }
}

// When pressing play again, all the parameters must be zero again to start new game.
function resetGame() {
  roundsPlayed = 0;
  playerScoreCount = 0;
  computerScoreCount = 0;
  gamesLeft.textContent = 0;
  updateScore();
  
  document.getElementById("nextRound").style.display = "block";
  document.getElementById("playAgain").style.display = "none";
  document.querySelector(".rpsContainer").style.pointerEvents = "auto";
  closeWindow();
}

function displayResult(result, computerChoice) {
  document.getElementById("resultText").textContent = `${result} Computer chose ${computerChoice}.`;
  nextRound.disabled = false;
}

function displayFinalResult() {
  let finalResult = "";
  if (playerScoreCount > computerScoreCount) {
    finalResult = `${username} Wins The Game!!!`;
  } else if (playerScoreCount < computerScoreCount) {
    finalResult = "Computer Wins The Game!!!";
  } else {
    finalResult = "The Game Ends As A Tie!!!";
  }
  document.getElementById("resultText").textContent = finalResult;
}