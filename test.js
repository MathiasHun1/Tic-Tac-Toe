const players = function(name, sign) {
    return {name, sign}
}

    



const gameController = (function() {
    let fields = ['', '', '',  '', '', '',  '', '', '']
    const player1 = players('Bözsi', 'X')
    const player2 = players('Lali', 'O')
    let winner = ''
    let round = 1
    let activePlayer = player1


    
    const playRound = function(field) {
        if (fields[field] === 'X' || fields[field] === 'O' || winner !== '') {
            return false
        } else {
            fields[field] = getActivePlayerSign()
        }
        
        checkWinner()
        if (winner !== '') {
            console.log(`${winner} wins!`)
            return
        }
        if (winner === '' && round === 9) {
            console.log('DRAW')
            return
        }
        swithPlayer()
        drawFields()
        console.log(`${activePlayer.name}'s turn!`, activePlayer.sign)
        round++
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

        for(let i = 0; i < winConditions.length; i++) {
            if (arrayX.length >= 3 || arrayO.length >= 3) {
                if (arrayX.toString().includes(winConditions[i].toString())) {
                    winner = player1.name
                    return true
                }
                if (arrayO.toString().includes(winConditions[i].toString())) {
                    winner = player2.name
                    return true
                }
            }
        }
    }

    const reset = function() {
        fields.fill('', 0, fields.length)
        winner = ''
        round = 1
        activePlayer = player1
    }

    const getRound = function() {
        return round
    }

    //for console
    const drawFields = function() {
        console.log(fields[0], fields[1], fields[2])
        console.log(fields[3], fields[4], fields[5])
        console.log(fields[6], fields[7], fields[8])
    }

    return {getActivePlayerSign, playRound, checkWinner, reset, fields, getRound}
})()







const displayController = (function() {
    const board = document.querySelectorAll('.field')
    const resetButton = document.querySelector('.reset')
    
    board.forEach((field) => field.addEventListener('click', (e) => {
        let clickedField = e.target
        let clickedIndex = e.target.getAttribute('id')
        if (clickedField.textContent === '') {
            gameController.playRound(clickedIndex)
        }
        render()
        
    }))    

    resetButton.addEventListener('click', () => {
        gameController.reset()
        render()
    })

    const render = function() {
        for (let i = 0; i < gameController.fields.length; i++) {
            board[i].textContent = gameController.fields[i]
        }
    }

})()