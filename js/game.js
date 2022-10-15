const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");

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

///////////////////////////////////////////////////////////////////

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

gameState = ["", "", "", "", "", "", "", "", ""];

// BOARD
const gameBoard = Array.from(document.getElementsByClassName("cell"));

// GLOBAL VARIABLES
let p1Turns = 3;
let p2Turns = 3;
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
                if (turn) {
                    addMarkHuman(event, turn);
                    totalPlays++;
                    checkWinner(!turn);
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
                    checkWinner(turn);
                    turn = !turn
                }
                console.log(totalPlays)
                console.log(p1Turns, p2Turns)
            } else {
                removeCurrentMarkHuman(event, turn)
                p1Turns++;
            }
        });

    });
};



// GAME MECHANIC FUNCTIONS
const addMarkHuman = (event) => {
    let currentCell = event.target.textContent;
    if (currentCell == "") {
        event.target.textContent = "X";
    }
}

const addMarkCpu = (turn) => {
    let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (nextMove.textContent != "") {
        nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    nextMove.textContent = "O";
    totalPlays--;
    turn = !turn
}

const removeMarkCpu = () => {
    let randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    while (randomRemove.textContent == "" || randomRemove.textContent == "X") {
        randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
    }
    randomRemove.textContent = "";
}

const removeCurrentMark = (event, turn) => {
    let currentMark = event.target.textContent;
    if (turn && currentMark == "X") {
        event.target.textContent = "";
        p1Turns++;
    }
    if (!turn && currentMark == "O") {
        event.target.textContent = "";
        p2Turns++;
    }
};

const removeCurrentMarkHuman = (event, turn) => {
    let currentMark = event.target.textContent;
    if (turn && currentMark == "X") {
        event.target.textContent = "";
    }
    if (!turn && currentMark == "O") {
        event.target.textContent = "";
    }
};

const addMark = (event, turn) => {
    if (turn) {
        event.target.textContent = "X";
        p1Turns--;
        totalPlays++;
    } else {
        event.target.textContent = "O";
        p2Turns--;
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
    // window.location = "../pages/winner.html"
};

const addMarkPlayer = (turn) => {
    gameBoard.map(cell => {
        cell.addEventListener("click", (event) => {
            if (event.target.textContent == "") {
                event.target.textContent = "X"
                totalPlays--;
                turn = !turn

            }
        })
    })
}

const cpuVsHuman = () => {
    console.log("cpuvshuman")
};


cpuVsHuman()

