const displayWinnerName = document.getElementById("winner-name");
let winnerName = sessionStorage.getItem("winner");
displayWinnerName.innerHTML = winnerName;
console.log(winnerName)

const btnNewGame = document.getElementById("btn-new-game");
btnNewGame.addEventListener("click", () => {
    window.location.href = "../pages/select-players.html"
});