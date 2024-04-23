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



// GAME LOGIC

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
    const isBoardFull = () => {
        board.reduce(function (availableCells, currentValue) {
            currentValue.forEach(cell => cell === 0 ? availableCells += 1 : "")

            return availableCells === 0 ? true : false
        }, 0)
    }

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
    const playerOneName = ''
    const playerTwoName = ''

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

            // console.log(gameboard.getBoard())
            isGameOver()
        }


    }

    let checkForWin = false

    //this method checks if game is over 
    const isGameOver = function () {
        if (!gameboardObj.isBoardFull()) {

            for (let j = 0; j < board.length; j++) {
                rowCheck(board, (arr, i) => arr[j][i]) // horziontal
                rowCheck(board, (arr, i) => arr[i][j]) // vertical
            }
            rowCheck(board, (arr, i) => arr[i][i]) // diagonal top to bottom
            rowCheck(board, (arr, i) => arr[i][(board.length - 1) - i]) // diagonal bottom to top
        }

        if (checkForWin) {
            // console.log(activePlayer.name + " is the Winner")
            return true
        }
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

        if (filteredArr.length === arr.length && notZeros !== 0) {
            // console.log(filteredArr, notZeros)
            checkForWin = true
        }
    }

    return { getActivePlayer, changeActivePlayer, newRound, players, isGameOver }
})()




//     gameController.newRound(0, 0)
// // console.log(gameController.getActivePlayer())
// gameController.newRound(2, 0)
// // console.log(gameController.getActivePlayer())
// gameController.newRound(0, 1)
// // // console.log(gameController.getActivePlayer())
// gameController.newRound(2, 1)
// // // console.log(gameController.getActivePlayer())
// gameController.newRound(0, 2)
// // console.log(gameController.getActivePlayer())
// console.log(gameboard.getBoard())
// gameController.newRound(2, 0)
// console.log(gameboard.getBoard())
// console.log()

const domController = (() => {



    // DOM
    const container = document.querySelector('.container')
    const playerOneCard = document.getElementById('playerOneCard')
    const playerTwoCard = document.getElementById('playerTwoCard')

    const buttonCardOne = playerOneCard.querySelector('button')
    const buttonCardTwo = playerTwoCard.querySelector('button')

    buttonCardOne.addEventListener('click', setDomName)
    buttonCardTwo.addEventListener('click', setDomName)

    function setDomName(e) {
        e.preventDefault()
        const form = e.target.parentNode
        const playerCard = form.parentNode
        // console.log(form)

        const inputValue = form.querySelector('input').value
        form.querySelector('input').value = ''
        // console.log(inputValue)

        playerCard.classList.add('set')
        playerCard.classList.remove('setting')

        if (document.querySelector('.unset')) {
            const secondCard = document.querySelector('.unset')
            secondCard.classList.add('setting')
            secondCard.classList.remove('unset')

        }

        playerCard.querySelector('p').innerHTML = inputValue


        // console.log(playerCard.querySelector('p').innerHTML)
        // console.log(inputValue)

        startGameButton()

        if (gameController.players[0].name === '') {
            gameController.players[0].name = inputValue
        } else {
            gameController.players[1].name = inputValue
        }
    }



    function startGameButton() {
        const playersSet = document.querySelectorAll('.set')
        if (playersSet.length === 2) {
            const btn = document.createElement('button')
            btn.classList.add('btn', 'btn-start')
            btn.innerText = 'start!'

            btn.addEventListener('click', () => {
                container.innerHTML = ``
                const gameboardContainer = document.createElement('div')
                gameboardContainer.classList.add('gameboard')

                for (let i = 0; i < 9; i++) {

                    const cell = document.createElement('div')
                    cell.classList.add('cell')
                    gameboardContainer.appendChild(cell)

                    cell.addEventListener('click', () => {
                        let iDivided = i % 3
                        if (i < 3) {
                            gameController.newRound(i, 0)
                        } else if (i > 2 && i < 6) {

                            gameController.newRound(iDivided, 1)
                        } else {
                            gameController.newRound(iDivided, 2)
                        }

                        if (cell.childElementCount === 0) {
                            const shape = document.createElement('i')
                            // console.log(gameController.getActivePlayer())
                            if (gameController.getActivePlayer().id === 1) {
                                shape.classList.add('fa-solid', 'fa-x')
                            } else[
                                shape.classList.add('fa-regular', 'fa-circle')
                            ]
                            cell.appendChild(shape)
                        }
                        isVictoryScreen()
                        gameController.changeActivePlayer()
                    })

                }

                container.appendChild(gameboardContainer)

            })

            container.querySelector('.card-container').appendChild(btn)
        }
    }

    function isVictoryScreen() {
        if (gameController.isGameOver()) {
            const body = document.body
            body.innerHTML = ''
            body.classList.add('game-over')

            const span = document.createElement('span')
            span.innerText = gameController.getActivePlayer().name

            const hOne = document.createElement('h1')
            hOne.innerText = ' is the winner!'
            hOne.insertBefore(span, hOne.firstChild)

            const newGameBtn = document.createElement('btn')
            newGameBtn.classList.add('btn')
            newGameBtn.innerText = 'new game!'
            newGameBtn.addEventListener('click', () => window.location.reload())


            body.appendChild(hOne)
            body.appendChild(newGameBtn)
        }
    }


    return {}
})()
