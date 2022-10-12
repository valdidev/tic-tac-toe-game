const cells = Array.from(document.getElementsByClassName("cell"));
const p1Turn = document.querySelector(".player1-your-turn");
const p2Turn = document.querySelector(".player2-your-turn");

let turn = true;
let p1Rolls = 3;
let p2Rolls = 3;

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

/* const checkWin = (cells, turn) => {
    turn = !turn
    let currentClass = (turn) ? "symbol-x" : "symbol-o"

} */

const movedPlacedPiece = () => {
    cells.map(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent == "X"){
                cell.textContent = ""
            }
            cell.addEventListener("click", () => {
                if (cell.textContent == ""){
                    cell.textContent = "X"
                }
            })
        })
        return
    })
}

cells.map(cell => {
    cell.addEventListener("click", () => {
        if (cell.innerHTML == "" && p1Rolls >= 0 && p2Rolls > 0) {
            cell.innerHTML = (turn) ? "X" : "O";
            // cell = (turn) ? cell.classList.add("symbol-x") : cell.classList.add("symbol-o");
            turn = !turn;
            if (!turn) {
                p2Turn.classList.remove('hide');
                p1Turn.classList.add('hide');
                p1Rolls--;
            } else {
                p1Turn.classList.remove('hide');
                p2Turn.classList.add('hide');
                p2Rolls--;
            }
        } else {
            movedPlacedPiece(cells)
        }

        if (p1Rolls <= 0) {
            // checkWin(cells, turn);
            console.log("checkwin")
        }
    });
});
