const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const piecesElements = document.querySelectorAll('[data-pieces]')
const square = document.getElementById('square')
const winningmsgElement = document.getElementById('winningmsg')
const restartButton = document.getElementById('resetbtn')
const winningMsgTextElement = document.querySelector('[data-winning-msg-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    piecesElements.forEach(pieces => {
        pieces.classList.remove(X_CLASS)
        pieces.classList.remove(CIRCLE_CLASS)
        pieces.removeEventListener('click', handleClick)
        pieces.addEventListener('click', handleClick, { once: true })
    })
    setSquareHoverClass()
    winningmsgElement.classList.remove('show')
}
function handleClick(e) {
    const pieces = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(pieces, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setSquareHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMsgTextElement.innerText = 'Draw!!!'
    } else {
        winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`
    }
    winningmsgElement.classList.add('show')
}

function isDraw() {
    return [...piecesElements].every(piece => {
        return piece.classList.contains(X_CLASS) ||
            piece.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(pieces, currentClass) {
    pieces.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setSquareHoverClass() {
    square.classList.remove(X_CLASS)
    square.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        square.classList.add(CIRCLE_CLASS)
    } else {
        square.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return piecesElements[index].classList.contains(currentClass)
        })
    })
}