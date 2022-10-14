const winnerName = document.getElementById("winner-name");
winnerName.innerHTML = sessionStorage.getItem("winner");

const btnNewGame = document.getElementById("btn-new-game");
btnNewGame.addEventListener("click", () => {
    window.location.href = "../pages/select-players.html"
});