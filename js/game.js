const xClass = 'symbol-x'
const oClass = 'symbol-o'
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cells = Array.from(document.querySelectorAll('.cell'));

let turn


const startGame = () => {
    turn = true;
    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.addEventListener('click', handleClick)
    })
}

const handleClick = (e) => {
    let cell = e.target;
    let currentClass = turn ? xClass : oClass
    placeMark(cell, currentClass);
    swapTurn();
}

startGame();

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const swapTurn = () => {
    turn = !turn
}

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}