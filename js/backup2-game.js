const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const gameModeDisplay = document.getElementById("game-mode-display");
let player1TurnsNumber = document.getElementById("player1-turns-number");
let player2TurnsNumber = document.getElementById("player2-turns-number");
let player1TurnsText = document.getElementById("player1-turns-text");
let player2TurnsText = document.getElementById("player2-turns-text");
const btnNewGame = document.getElementById("btn-new-game");

// GET NAME/TYPE player1 FROM SESSIONSTORAGE
player1Name.innerHTML = sessionStorage.getItem("player1-name");

let player1Type = "";
if (JSON.parse(sessionStorage.getItem("player1-human")) == true) {
    player1Type = "human";
} else {
    player1Type = "cpu";
};

// GET NAME/TYPE player2 FROM SESSIONSTORAGE
player2Name.innerHTML = sessionStorage.getItem("player2-name");

let player2Type = "";
if (JSON.parse(sessionStorage.getItem("player2-human")) == true) {
    player2Type = "human";
} else {
    player2Type = "cpu";
};

// CLASS PLAYER 
class Player {
    constructor(name, type) {
        this.name = name,
            this.type = type
    }
};

let player1 = new Player(player1Name.innerHTML, player1Type);
let player2 = new Player(player2Name.innerHTML, player2Type);

///////////////////////////////////////////////////////////////////////////////
// GAME
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// BOARD
const gameBoard = Array.from(document.getElementsByClassName("cell"));

// GLOBAL VARIABLES
let p1Turns = 3;
let p2Turns = 3;
player1TurnsNumber.textContent = p1Turns;
player2TurnsNumber.textContent = p2Turns;
let firstMove = true;

///////////////////////////////////////////////////////////////////////////////

// MODES 
const humanVsHuman = () => {
    let turn = true;
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (p1Turns > 0 || p2Turns > 0) {
                if (event.target.textContent === "") {
                    addMark(event, turn);
                    checkWinner(turn);
                    turn = !turn;
                    if (turn) {
                        player2Name.classList.remove("current-player");
                        player1Name.classList.add("current-player");
                    }
                    if (!turn) {
                        player1Name.classList.remove("current-player");
                        player2Name.classList.add("current-player");
                    }
                }
            } else {
                removeCurrentMark(event, turn);
            }
        });
    });
};

const humanVsCpu = () => {
    let tieBreaker = false;
    let turn = true;
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (p1Turns > 0 || p2Turns > 0) {
                if (event.target.textContent === "") {
                    addMark(event, turn);
                    checkWinner2(turn);
                    turn = !turn;

                    if (tieBreaker == true) {
                        removeMarkCpu();
                    }
                    addMarkCpu();

                    turn = !turn;
                    checkWinner2(turn);
                    if (p1Turns == 0 && p2Turns == 0) {
                        tieBreaker = true;
                    }
                }
            } else if (tieBreaker == true) {

                removeCurrentMark(event, turn);

            }
        });
    });
};

const cpuVsHuman = () => {
    let tieBreaker = false;
    let turn = true;
    let firstMove = true;
    if (firstMove) {
        let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        while (nextMove.textContent != "") {
            nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        }
        nextMove.textContent = "O";
        nextMove.classList.add("x-mark");
        p1Turns--;
        player1TurnsNumber.textContent = p1Turns;

        firstMove = !firstMove;
    }
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            console.log(p2Turns)
            if (p2Turns > 0) {
                if (tieBreaker == false){
                    if (event.target.textContent === "") {
                        event.target.textContent = "X";
                        event.target.classList.add("o-mark");
                        p2Turns--;
                        player2TurnsNumber.textContent = p2Turns;
                        checkWinner2(turn);
                        turn = !turn;
                        console.log(p1Turns, p2Turns)
                        if (p1Turns > 0) {
                            // insert O random
                            let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
                            while (nextMove.textContent != "") {
                                nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
                            }
                            nextMove.textContent = "O";
                            nextMove.classList.add("x-mark");
                            p1Turns--;
                            player1TurnsNumber.textContent = p1Turns;
    
                            checkWinner2(turn);
                            turn = !turn;
                }
                    } else {
                        removeMarkCpu();
                        p1Turns++;
                        player1TurnsNumber.textContent = p1Turns;
                        let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
                        while (nextMove.textContent != "") {
                            nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
                        }
                        nextMove.textContent = "O";
                        nextMove.classList.add("x-mark");
                        p1Turns--;
                        player1TurnsNumber.textContent = p1Turns;
                        tieBreaker = true;
                        
                    }
                }
            } else {
                console.log("esto")
            }
        });
    });
};

///////////////////////////////////////////////////////////////////////////////
// MECHANICS 
// HUMAN
const addMark = (event, turn) => {
    if (turn) {
        event.target.textContent = "X";
        event.target.classList.add("x-mark");
        p1Turns--;
        player1TurnsNumber.textContent = p1Turns;
    } else {
        event.target.textContent = "O";
        event.target.classList.add("o-mark");
        p2Turns--;
        player2TurnsNumber.textContent = p2Turns;
    }
};

const removeCurrentMark = (event, turn) => {
    let currentMark = event.target.textContent;
    if (turn && currentMark == "X") {
        event.target.textContent = "";
        event.target.classList.remove("x-mark");
        event.target.classList.remove("o-mark");

        p1Turns++;
        player1TurnsNumber.textContent = p1Turns;
    }
    if (!turn && currentMark == "O") {
        event.target.textContent = "";
        event.target.classList.remove("x-mark");
        event.target.classList.remove("o-mark");
        p2Turns++;
        player2TurnsNumber.textContent = p2Turns;
    }
};

//CPU
const addMarkCpu = () => {
    let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (nextMove.textContent != "") {
        nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    nextMove.textContent = "O";
    nextMove.classList.add("o-mark");
    p2Turns--;
    player2TurnsNumber.textContent = p2Turns;
}

const removeMarkCpu = () => {
    let randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (randomRemove.textContent == "" || randomRemove.textContent == "X") {
        randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    randomRemove.textContent = "";
    p2Turns++;
    randomRemove.classList.remove("x-mark");
    randomRemove.classList.remove("o-mark");
}

///////////////////////////////////////////////////////////////////////////////
// GAME WINNER 

const checkWinner = (turn) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i]
        let position1 = gameBoard[winCondition[0]].textContent
        let position2 = gameBoard[winCondition[1]].textContent
        let position3 = gameBoard[winCondition[2]].textContent
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }
        if (position1 === position2 && position2 === position3) {
            console.log("gana")
            storageWinner(turn);
            break;
        }
    }
};

const checkWinner2 = (turn) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i]
        let position1 = gameBoard[winCondition[0]].textContent
        let position2 = gameBoard[winCondition[1]].textContent
        let position3 = gameBoard[winCondition[2]].textContent
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }
        if (position1 === position2 && position2 === position3) {
            console.log("gana")
            storageWinner2(turn);
            break;
        }
    }
};

const storageWinner = (turn) => {
    console.log(turn)
    if (turn) {
        sessionStorage.setItem('winner', JSON.stringify(player1.name));
    } else {
        sessionStorage.setItem('winner', JSON.stringify(player2.name));
    }
    window.location = "../pages/winner.html"
};

const storageWinner2 = (turn) => {
    turn = !turn
    if (turn) {
        sessionStorage.setItem('winner', JSON.stringify(player1.name));
    } else {
        sessionStorage.setItem('winner', JSON.stringify(player2.name));
    }
    window.location = "../pages/winner.html"
};

///////////////////////////////////////////////////////////////////////////////
// BUTTON NEW GAME
btnNewGame.addEventListener("click", () => {
    window.location.href = "../pages/select-players.html"
});

///////////////////////////////////////////////////////////////////////////////
// SELECT GAME MODE FUNCTION
function startGame() {
    if (player1.type == "human" && player2.type == "human") {
        gameModeDisplay.textContent = "Human vs Human";
        humanVsHuman();
    } else if (player1.type == "human" && player2.type == "cpu") {
        gameModeDisplay.textContent = "Human vs Cpu";
        humanVsCpu();
    } else {
        gameModeDisplay.textContent = "Cpu vs Human";
        cpuVsHuman();
    }
}

startGame();