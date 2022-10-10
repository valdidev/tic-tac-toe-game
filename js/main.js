const cells = Array.from(document.getElementsByClassName("cell"));
const p1Turn = document.querySelector(".player1-your-turn");
const p2Turn = document.querySelector(".player2-your-turn");

let turn = true;
let p1Rolls = 3;
let p2Rolls = 3;

cells.map(cell => {
    cell.addEventListener("click", () => {
        if(cell.innerHTML == "" && p1Rolls >= 0 && p2Rolls > 0){
            cell.innerHTML = (turn) ? "X" : "O";
            turn = !turn;
            if(!turn){
                p2Turn.classList.remove('hide');
                p1Turn.classList.add('hide');
                p1Rolls--;
                console.log("p1 " + p1Rolls);
            } else {
                p1Turn.classList.remove('hide');
                p2Turn.classList.add('hide');
                p2Rolls--;
                console.log("p2 " + p2Rolls);
            }
        }else {
            console.log("function movePlacedPiece")
        }
    });
});
