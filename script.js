const players = function(name, sign) {
    return {name, sign}
}

    


const gameController = (function() {
    let fields = ['', '', '',  '', '', '',  '', '', '']
    const player1 = players('Bözsi', 'X')
    const player2 = players('Lali', 'O')
    let endResult = ''
    let round = 1
    let activePlayer = player1
    let winnerIndex = []

    const playRound = function(field) {
        
        if (endResult !== '') {
            return 
        }
        if (fields[field] === '') {
            fields[field] = getActivePlayerSign()
            console.log(fields[field])
            console.log(getResult())
        }

        if (checkWinner()) {
            return endResult
        }

        round++

        if (getRound() > 9) {
            endResult = 'DRAW' 
        }
        swithPlayer()
        // drawFields()
    }
    
    const getActivePlayerSign = function() {
        return round % 2 === 0 ?  player2.sign :  player1.sign
    }

    const swithPlayer = function () {
        if (activePlayer === player1) {
            activePlayer = player2
        } else activePlayer = player1
    }

    const checkWinner = function() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ]

        function filterEquals(array, value) {
            return array.map((element, index) => element === value ? index : -1).filter(element => element !== -1)
        }

        arrayX = filterEquals(fields, 'X')
        arrayO = filterEquals(fields, 'O')
    
        if (winConditions.some(element => element.every(value => arrayX.includes(value)))) {
            for (let i = 0; i < winConditions.length; i++) {
                if (winConditions[i].every(value => arrayX.includes(value))) {
                    winnerIndex.push(winConditions[i])
                }
            }
            endResult = 'X wins'
            return true
        }

        if (winConditions.some(element => element.every(value => arrayO.includes(value)))) {
            for (let i = 0; i < winConditions.length; i++) {
                if (winConditions[i].every(value => arrayO.includes(value))) {
                    winnerIndex.push(winConditions[i])
                }
            }
            endResult = 'O wins'
            winnerIndex.push(arrayO)
            return true
        }
    }

    const reset = function() {
        fields.fill('', 0, fields.length)
        endResult = ''
        round = 1
        activePlayer = player1
        winnerIndex.length = 0
    }

    const getRound = function() {
        return round
    }

    const getResult = function() {
        return endResult
    }

    //for console
    const drawFields = function() {
        console.log(fields[0], fields[1], fields[2])
        console.log(fields[3], fields[4], fields[5])
        console.log(fields[6], fields[7], fields[8])
    }

    return {getActivePlayerSign, playRound, checkWinner, reset, fields, getRound, getResult, winnerIndex}
})()






const displayController = (function() {
    const board = document.querySelectorAll('.field')
    const resetButton = document.querySelector('.reset')
    const resultButton = document.querySelector('.result>h1')
    
    board.forEach((field) => field.addEventListener('click', (e) => {
        let clickedField = e.target
        let clickedIndex = e.target.getAttribute('id')
        if (clickedField.textContent === '') {
           gameController.playRound(clickedIndex)
        }
        if (gameController.getResult() !== '') {
            if (gameController.getResult() === 'DRAW') {
                resultButton.textContent = gameController.getResult()
            } else{
                resultButton.textContent = gameController.getResult()
                setBackground(board, gameController.winnerIndex)
            }
            
        } 
        if (gameController.getRound() === 9) {
            resultButton.textContent = gameController.getResult()
        }
        render()
        
    }))    

    resetButton.addEventListener('click', () => {
        gameController.reset()
        resultButton.textContent = ''
        board.forEach((item) => item.style.color = 'black')
        render()
    })

    const render = function() {
        for (let i = 0; i < gameController.fields.length; i++) {
            board[i].textContent = gameController.fields[i]
        }
    }

    const setBackground = function(nodeList, array) {
        let index = '' 
        for (let i = 0; i < 3; i++) {
            index = array[0][i]
            nodeList.item(index).style.color = 'green'
            nodeList.item(index).style.borderColor = 'black'
        }
    }

})()