const btnPlay = document.getElementById("btn-play").addEventListener("click", storagePlayers);

// SAVE DATA IN SESSIONSTORAGE
function storagePlayers () {
    // Player names
    const player1InputName = document.getElementById("player1-name");
    let player1Name = player1InputName.value;
    sessionStorage.setItem("player1-name", player1Name);

    const player2InputName = document.getElementById("player2-name");
    let player2Name = player2InputName.value;
    sessionStorage.setItem("player2-name", player2Name);

    // Player types
    const player1RadioType = document.getElementById("player1-human");
    let player1Type = player1RadioType.checked;
    sessionStorage.setItem("player1-human", player1Type);
    
    const player2RadioType = document.getElementById("player2-human");
    let player2Type = player2RadioType.checked;
    sessionStorage.setItem("player2-human", player2Type);

    // Input validation
    if (player1Type == false && player2Type == false) {
        alert("At least one human has to play");
    } else if(player1Name == "" || player2Name == "") {
        alert("You must complete both names");
    } else {
       window.location.href = "../pages/game-board.html"
    };
};