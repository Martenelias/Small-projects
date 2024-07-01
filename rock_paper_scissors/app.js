let letsPlay = document.getElementById("letsPlay");
let usernameInput = document.getElementById("username");
let errorText = document.getElementById("errorText");
let gameBtn = document.getElementById("gameBtn");

let username = "";

window.onload = function() {
  gameBtn.addEventListener("click", closeWindow);
  usernameInput.addEventListener("input", getUsername)
  document.getElementById("nextRound").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
}

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
      letsPlay.style.display = "none"
    }, 1000);
    document.getElementById("nextRound").style.display = "block";
    let myName = document.getElementById("myName").textContent = username;
  }
}
