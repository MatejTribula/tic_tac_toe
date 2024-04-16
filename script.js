// PROJECT
// 1. gameboard object
// 2. the array will be inside of a Gameboard object
// 3. create objects for players
// 4.logic of the game
//set names for players and by blicking button game starts
//gameboard appears and tells player one that its his turn
//once one player clicks on one square it is not clickable anymore
//if one of the patterns is matched the game ends
//if it doesnt happen after clicking 9 squares it is game over and draw
// after game is over text is show and button to reset the game is in


const gameboard = (() => {
    const rows = 3
    const columns = 3
    const board = []

    //filled out all the values in our gameboard array
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(0)
        }
    }

    const getBoard = () => board



    // check if the whole board is full
    const isBoardFull = board.reduce(function (availableCells, currentValue) {
        currentValue.forEach(cell => cell === 0 ? availableCells += 1 : "")

        return availableCells === 0 ? true : false
    }, 0)

    //check if a specific cell is not already occupied
    const isCellAvailable = function (x, y) {
        if (y < board.length && x < board[x].length)
            if (board[y][x] === 0) {
                return true
            }
        return false
    }

    // players can pick a cell and if it is available they will populate it
    const pickCell = function (x, y, player) {
        isCellAvailable(x, y) ? board[y][x] = player : console.log("This cell is already taken!")
    }

    //return all the needed methods or variables
    return { getBoard, isBoardFull, isCellAvailable, pickCell }
})()




const gameController = (() => {
    //names are defined here because in the future they will be retrieved solely from user input
    const playerOneName = "jano"
    const playerTwoName = "zdeno"

    //getting board obejct and all of its values and methods
    const gameboardObj = gameboard
    const board = gameboardObj.getBoard()

    //array of players objects
    const players = [
        {
            name: playerOneName,
            id: 1
        },
        {
            name: playerTwoName,
            id: 2
        },
    ]

    //active player method && switch turns
    let activePlayer = players[0]

    const changeActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0]
    };


    const getActivePlayer = () => activePlayer

    //round
    const newRound = (x, y) => {
        if (!isGameOver()) {
            gameboardObj.pickCell(x, y, getActivePlayer().id)
            // console.log(activePlayer.id, x, y)
            changeActivePlayer()
        }


    }

    let checkForWin = false

    //this method checks if game is over 
    const isGameOver = function () {
        if (!gameboardObj.isBoardFull) {

            for (let j = 0; j < board.length; j++) {
                rowCheck(board, (arr, i) => arr[j][i]) // horziontal
                rowCheck(board, (arr, i) => arr[i][j]) // vertical
            }
            rowCheck(board, (arr, i) => arr[i][i]) // diagonal top to bottom
            rowCheck(board, (arr, i) => arr[i][(board.length - 1) - i]) // diagonal bottom to top
        }

        if (checkForWin) { return true }
        return false
    }





    const rowCheck = (arr, extractionFn) => {
        const newArr = []

        for (let i = 0; i < arr.length; i++) {
            newArr.push(extractionFn(arr, i));
        }

        // console.log(newArr)

        const filteredArr = newArr.filter(cell => cell === newArr[0])
        const notZeros = filteredArr.reduce((total, currentValue) => total + currentValue, 0)

        // console.log(filteredArr)

        if (filteredArr.length = arr.length && notZeros !== 0) {
            checkForWin = true
        } else {
            checkForWin = false
        }
    }

    return { getActivePlayer, newRound }
})()




gameController.newRound(2, 2)
console.log(gameController.getActivePlayer())
gameController.newRound(2, 0)
console.log(gameController.getActivePlayer())
console.log(gameboard.getBoard())

