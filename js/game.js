const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const gameModeDisplay = document.getElementById("game-mode-display");
let player1MarksNumber = document.getElementById("player1-marks-number");
let player2MarksNumber = document.getElementById("player2-marks-number");
let player1MarksText = document.getElementById("player1-marks-text");
let player2MarksText = document.getElementById("player2-marks-text");
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
    constructor(name, type, mark, oppositeMark) {
        this.name = name.innerHTML,
            this.type = type,
            this.mark = mark,
            this.oppositeMark = oppositeMark
    };

    marksLeft = 3;

    retrieveMark() {
        this.marksLeft++;
    };

    spendMark() {
        this.marksLeft--;
    };

    paintMark(event) {
        event.target.textContent = this.mark;
        event.target.classList.add(this.mark + "-mark");
        this.spendMark();

    };

    removeMark(event) {
        if (event.target.textContent == this.mark) {
            event.target.textContent = "";
            event.target.classList.remove("x-mark");
            event.target.classList.remove("o-mark");
            this.retrieveMark();
        }
    };

    cpuPaintMark(lastMove) {
        let nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        if (nextMove.textContent != "" && gameBoard.indexOf(nextMove) != gameBoard.indexOf(lastMove)) {
            nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        }
        while (nextMove.textContent != "" && gameBoard.indexOf(nextMove) != gameBoard.indexOf(lastMove)) {
            nextMove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        }
        nextMove.textContent = this.mark;
        nextMove.classList.add(this.mark + "-mark");
        this.spendMark();
    }

    cpuRemoveMark() {
        let randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        while (randomRemove.textContent == "" || randomRemove.textContent == this.oppositeMark) {
            randomRemove = gameBoard[Math.floor(Math.random() * gameBoard.length)];
        }
        randomRemove.textContent = "";
        randomRemove.classList.remove("x-mark");
        randomRemove.classList.remove("o-mark");
        this.retrieveMark();
        return randomRemove;
    }
};

let player1 = new Player(player1Name, player1Type, 'x', 'o');
let player2 = new Player(player2Name, player2Type, 'o', 'x');

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

// START TURN STATUS
let turn;

const changeTurn = () => {
    return turn = !turn
};

//REMAINING GLOBAL MARKS INITIALIZED
player1MarksNumber.textContent = player1.marksLeft;
player2MarksNumber.textContent = player2.marksLeft;

///////////////////////////////////////////////////////////////////////////////

// MODES 
const humanVsHuman = () => {
    turn = true;
    player1Name.classList.add("current-player");
    gameBoard.map(cell => {
        cell.addEventListener("click", event => {
            if (player1.marksLeft > 0 || player2.marksLeft > 0) {
                if (event.target.textContent == "") {
                    if (turn) {
                        player1Name.classList.remove("current-player");
                        player2Name.classList.add("current-player");
                        player1.paintMark(event);
                        checkWinner(turn);
                        player1MarksNumber.textContent = player1.marksLeft;
                        changeTurn();
                    } else {
                        player2Name.classList.remove("current-player");
                        player1Name.classList.add("current-player");
                        player2.paintMark(event);
                        checkWinner(turn);
                        player2MarksNumber.textContent = player2.marksLeft;
                        changeTurn();
                    }
                }
            } else {
                if (turn) {
                    player1.removeMark(event);
                    player1MarksNumber.textContent = player1.marksLeft;
                } else {
                    player2.removeMark(event);
                    player2MarksNumber.textContent = player2.marksLeft;
                }
            }
        });
    });
};

const humanVsCpu = () => {
    player1Name.classList.add("current-player");
    turn = true;
    let letPlayCpu = false;
    gameBoard.map(cell => {
        cell.addEventListener("click", event => {

            
            if (player1.marksLeft > 0 || player2.marksLeft > 0) {
                
                // player 1 - human
                if (event.target.innerHTML == "" && turn === true) {
                    player1Name.classList.remove("current-player");
                    player2Name.classList.add("current-player");
                    player1.paintMark(event);
                    checkWinner(turn);
                    player1MarksNumber.textContent = player1.marksLeft;
                    changeTurn();
                    letPlayCpu = true;
                }

                // player 2 - cpu
                if (player2.marksLeft > 0 && turn === false && letPlayCpu === true) {
                    letPlayCpu = false;
                    player1Name.classList.remove("current-player");
                    player2Name.classList.add("current-player");
                    setTimeout(() => {
                        player2Name.classList.remove("current-player");
                        player1Name.classList.add("current-player");
                        player2.cpuPaintMark();
                        checkWinner(turn);
                        player2MarksNumber.textContent = player2.marksLeft;
                    }, 500);
                    changeTurn();
                    
                // player 2 - cpu    
                } else if (player2.marksLeft <= 0 && turn === false && letPlayCpu === true) {
                    letPlayCpu = false;
                    player2.cpuRemoveMark();
                    setTimeout(() => {
                        player2Name.classList.remove("current-player");
                        player1Name.classList.add("current-player");
                        player2.cpuPaintMark();
                        checkWinner(turn);
                        player2MarksNumber.textContent = player2.marksLeft;
                    }, 500);
                    changeTurn();
                    
                }

            // player 1 - human    
            } else {
                player1.removeMark(event);
                player1MarksNumber.textContent = player1.marksLeft;
            }
        });
    });
};

const cpuVsHuman = () => {
    let removeCpu = false;
    let firstRoll = true;

    // player 1 - cpu - first random roll
    turn = true;
    if (firstRoll) {
        player1Name.classList.add("current-player");
        setTimeout(() => {
            player1Name.classList.remove("current-player");
            player2Name.classList.add("current-player");
            player1.cpuPaintMark();
            changeTurn();
            firstRoll = !firstRoll;
            player1MarksNumber.textContent = player1.marksLeft;
        }, 500);
    }

    gameBoard.map(cell => {
        cell.addEventListener("click", event => {

            // player 2 - human

            if (player2.marksLeft > 0 && turn === false) {
                if (event.target.textContent === "") {

                    player2.paintMark(event);
                    checkWinner(turn);
                    player2MarksNumber.textContent = player2.marksLeft;
                    removeCpu = true;
                    player1Name.classList.remove("current-player");
                    player2Name.classList.add("current-player");
                    changeTurn();

                }
            } else {
                if (event.target.textContent == player2.mark) {
                    player2.removeMark(event);
                    player2MarksNumber.textContent = player2.marksLeft;
                    removeCpu = false;
                }
            }

            // player 1 - cpu
            if (player1.marksLeft > 0 && turn === true) {
                player1.cpuPaintMark();
                checkWinner(turn);
                player1MarksNumber.textContent = player1.marksLeft;
                changeTurn();
            }

            if (player1.marksLeft >= 0 && turn === true && removeCpu === true) {
                let lastMove = player1.cpuRemoveMark();
                player1MarksNumber.textContent = player1.marksLeft;
                player1.cpuPaintMark(lastMove);
                checkWinner(turn);
                player1MarksNumber.textContent = player1.marksLeft;
                changeTurn();
            }

        });
    });

}

///////////////////////////////////////////////////////////////////////////////
// GAME WINNER 
const result = [];

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

            return result.push(turn), storageWinner();
        }
    }
};


const storageWinner = () => {
    if (result[0] === true) {
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