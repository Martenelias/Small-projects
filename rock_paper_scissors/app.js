let letsPlay = document.getElementById("letsPlay");

window.onload = function() {
  document.getElementById("gameBtn").addEventListener("click", closeWindow);
  document.getElementById("nextRound").disabled = true;
  document.getElementById("playAgain").disabled = true;
}

function closeWindow() {
  letsPlay.classList.add("slide-out");
  setTimeout(() => {
    letsPlay.style.display = "none"
  }, 1000);
}