const cells = document.querySelectorAll(".cell");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector(".winning-message");
let isRunning = false;
let turnX = true;
const WINS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

startGame();

function startGame() {
    isRunning = true;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', makeMove);
        cell.addEventListener("click", makeMove);
    });
    winningMessage.style.display = 'none';
}

function checkForWin(cell, turn) {
    const id = +cell.id;
    for (let i = 0; i < WINS.length; i++) {
        let comb = WINS[i];
        if (!(comb.includes(id))) {
            continue;
        }
        let isEnd = true;
        isEnd &&= cells[comb[0]].classList.contains(turn);
        console.log(isEnd);
        isEnd &&= cells[comb[1]].classList.contains(turn);
        console.log(isEnd);
        isEnd &&= cells[comb[2]].classList.contains(turn);
        console.log(isEnd);
        if (isEnd) {
            return true;
        }
    }
    return false;
}

function makeMove(e) {
    const cell = e.target;
    const currTurn = turnX ? "x" : "o";
    cell.classList.add(currTurn);
    turnX = !turnX;
    if (checkForWin(cell, currTurn)) {
        isRunning = false;
        winningMessageTextElement.textContent = `${currTurn}'s wins!`;
        winningMessage.style.display = "flex";
    } else if (checkForDraw()) {
        isRunning = false;
        winningMessageTextElement.textContent = "Draw!";
        winningMessage.style.display = "flex";
    }
}

restartButton.addEventListener("click", startGame);