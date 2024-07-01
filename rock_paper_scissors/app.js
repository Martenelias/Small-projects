let letsPlay = document.getElementById("letsPlay");
let usernameInput = document.getElementById("username");
let errorText = document.getElementById("errorText");
let gameBtn = document.getElementById("gameBtn");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

let username = "";

window.onload = function() {
  gameBtn.addEventListener("click", closeWindow);
  usernameInput.addEventListener("input", getUsername)
  document.getElementById("nextRound").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  rock.addEventListener("click", () => getPlayerChoice("rock"));
  paper.addEventListener("click", () => getPlayerChoice("paper"));
  scissors.addEventListener("click", () => getPlayerChoice("scissors"));
};

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
};


function closeWindow() {
  if (!gameBtn.disabled) {
    letsPlay.classList.add("slide-out");
    setTimeout(() => {
      letsPlay.style.display = "none"
      document.getElementById("nextRound").style.display = "block";
      document.getElementById("myName").textContent = username;
    }, 1000);
  }
};

function getPlayerChoice(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getWinner(playerChoice, computerChoice);
  displayResult(result);
};

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

function getWinner(playerOne, computer) {
  if(playerOne === computer) {
    return "Tie Game!";
  } else if (
    (playerOne === "rock" && computer === "scissors") ||
    (playerOne === "paper" && computer === "rock") ||
    (playerOne === "scissors" && computer === "paper") 
  ) {
    return `${username} wins!`;
  } else {
    return "computer wins!";
  }
}


function displayResult(result) {
  document.getElementById("resultText").textContent = result;
};