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

/////////

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

// VARIABLES
let p1Turns = 3;
let p2Turns = 3;
player1TurnsNumber.textContent = p1Turns;
player2TurnsNumber.textContent = p2Turns;
let totalPlays = 0;

// GAME MODES 
const humanVsHuman = () => {
    let turn = true;
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (p1Turns > 0 || p2Turns > 0) {
                if (event.target.textContent === "") {
                    addMark(event, turn);
                    checkWinner(turn)
                    turn = !turn;
                    if (turn) {
                        player2Name.classList.remove("current-player")
                        player1Name.classList.add("current-player")
                    }
                    if (!turn) {
                        player1Name.classList.remove("current-player")
                        player2Name.classList.add("current-player")
                    }
                }
            } else {
                removeCurrentMark(event, turn);
            }
        });
    });
};

const humanVsCpu = () => {
    let turn = true;
    let totalPlays = 0;
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (p1Turns > 0 || p2Turns > 0) {
                if (turn && event.target.textContent == "") {
                    addMarkHuman(event, turn);
                    p1Turns--;
                    console.log(p1Turns)
                    totalPlays++;
                    checkWinner(turn);
                    turn = !turn;
                    p1Turns--;
                }
                if (!turn && totalPlays < 6) {
                    addMarkCpu();
                    totalPlays++;
                    checkWinner(turn);
                    turn = !turn;
                    p2Turns--;
                }
                if (!turn && p2Turns == 0) {
                    removeMarkCpu();
                    addMarkCpu();
                    checkWinner(!turn);
                    turn = !turn
                }
            } else {
                removeCurrentMarkHuman(event, turn)
                p1Turns++;
            }
        });

    });
};

const cpuVsHuman = () => {
    humanVsCpu();
    humanVsHuman();
    /* var cpuTurn = true;
    var cpuPlays = 0;
    var humanPlays = 0;
    var totalPlays = 0;

    addMarkCpuFirst(cpuTurn);
    cpuPlays++;
    totalPlays++;

    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            
            if (humanPlays <= 10) {
                event.target.textContent = "X";
                event.target.textContent = "X";
                event.target.classList.add("x-mark")
                humanPlays++;
                totalPlays++;
                cpuTurn = true;
            }

            if (cpuPlays < 3) {
                addMarkCpuFirst(cpuTurn);
                cpuPlays++;
                totalPlays++;
            }
            if (totalPlays == 6) {
                removeMarkCpu();
                addMarkCpuFirst(cpuTurn);
                totalPlays++;
            }

            if (totalPlays >= 7) {
                let currentMark = event.target.textContent;
                if (currentMark == "X") {
                    event.target.textContent = "";
                    event.target.classList.remove("x-mark");
                    event.target.classList.remove("o-mark");
                }
            }
        });
    }); */

};


// GAME MECHANIC FUNCTIONS
function addMarkCpuFirst(cpuTurn) {
    while (cpuTurn === true) {
        let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        while (nextMove.textContent != "") {
            nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        }
        nextMove.textContent = "O";
        nextMove.classList.add("o-mark")

        cpuTurn = false;
    }
}

const addMarkHuman = (event) => {
    let currentCell = event.target.textContent;
    if (currentCell == "") {
        event.target.textContent = "X";
        event.target.classList.add("x-mark")
    }
}

let randomRemove;

const addMarkCpu = (turn) => {
    let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (nextMove.textContent != "" && nextMove.textContent != randomRemove) {
        console.log(randomRemove)
        nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    nextMove.textContent = "O";
    nextMove.classList.add("o-mark")
    totalPlays--;
    turn = !turn
}

const removeMarkCpu = () => {
    let randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (randomRemove.textContent == "" || randomRemove.textContent == "X") {
        randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    randomRemove.textContent = "";
    randomRemove.classList.remove("x-mark");
    randomRemove.classList.remove("o-mark");
}

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

const removeCurrentMarkHuman = (event, turn) => {
    let currentMark = event.target.textContent;
    if (turn && currentMark == "X") {
        event.target.textContent = "";
        event.target.classList.remove("x-mark");
        event.target.classList.remove("o-mark");

    }
    if (!turn && currentMark == "O") {
        event.target.textContent = "";
        event.target.classList.remove("x-mark");
        event.target.classList.remove("o-mark");
    }
};

const addMark = (event, turn) => {
    if (turn) {
        event.target.textContent = "X";
        event.target.classList.add("x-mark");
        p1Turns--;
        player1TurnsNumber.textContent = p1Turns;
        totalPlays++;
    } else {
        event.target.textContent = "O";
        event.target.classList.add("o-mark");
        p2Turns--;
        player2TurnsNumber.textContent = p2Turns;
        totalPlays++;
    }
};

const checkWinner = (turn) => {
    for (let i = 0; i < winningCombinations.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
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

const storageWinner = (turn) => {
    if (turn) {
        sessionStorage.setItem('winner', JSON.stringify(player1.name));
    } else {
        sessionStorage.setItem('winner', JSON.stringify(player2.name));
    }
    window.location = "../pages/winner.html"
};

const addMarkPlayer = (turn) => {
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (event.target.textContent == "") {
                event.target.textContent = "X"
                event.target.classList.add("x-mark")
                totalPlays--;
                turn = !turn

            }
        })
    })
}

// DISPLAY GAME MODE
btnNewGame.addEventListener("click", () => {
    window.location.href = "../pages/select-players.html"
});

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