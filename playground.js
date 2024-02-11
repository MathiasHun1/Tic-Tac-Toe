//Factory of a gameboard object
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];
        //Implementation of a gameboard in dimensions rows X columns
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

        //Set the given board-cell to the players token
    const setPickedCell = (row, column, player) => {
        board[row][column].setValue(player)
    }
        //Drawing the board to the console
    const drawBoard = () => {
        return board.map((row) => (row.map(cell => cell.getValue())))
    }
        //Implement the winning check

    const announceResult = (array) => {
        const arr = array
        const colsArray = convertColumnsToArr(arr)
        const crossArray = convertCrosstoArray(arr)
    
        //Functions
        function isWin (arr, cols, cross) {
            if (checkEqual(arr) || checkEqual(cols) || checkEqual(cross)) {
                return true
            } return false
        }
    
        function checkEqual (arr) {
            const results = []
            for (i = 0; i < arr.length; i++ ) {
                results.push(arr[i].every(element => (element === arr[i][0] && arr[i][0] !== '')))
            }
            return results.includes(true) ? true : false
        }
    
    
        function convertColumnsToArr(arr) {
            const columnsArr = []
            for (i = 0; i < arr.length; i++) {
                let column = []
                for (j = 0; j < arr.length; j++) {
                    column.push(arr[j][i])
                }
                columnsArr.push(column)
            }
            return columnsArr
        }
    
    
        function convertCrosstoArray(arr) {
            const crossArray = []
            const arr1 = []
            const arr2 = []
    
            for (i = 0; i < arr.length; i++) {
                arr1.push(arr[i][i])
            }
    
            for (i = 0; i < arr.length; i++) {
                arr2.push(arr[i][arr.length - 1- i])
            }
            crossArray.push(arr1, arr2)
            return crossArray
        }
    
        return isWin(arr, colsArray, crossArray)
    }


    return {board, setPickedCell, drawBoard, announceResult}
}

//Factory for a cell object to the gameboard
function Cell() {
    let value = '';
    const setValue = (player) => value = player;
    const getValue = () => value;
    return {setValue, getValue};
}


//Factory for a game-controller object
function GameController(player1Name = 'Erzsi', player2Name = 'Dezsö') {
    const board = GameBoard();
    const players = [
        {
            name: player1Name,
            token: 'X'
        },
        {
            name: player2Name,
            token: 'O'
        },
    ]

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer
    const switchActivePlayer = () => {
        activePlayer = getActivePlayer() === players[0] ? players[1] : players[0]
    }

    const playRound = (row, column) => {
        if (board.board[row][column].getValue() === '') {

            board.setPickedCell(row, column, getActivePlayer().token);
            console.log(board.drawBoard())
            if (board.announceResult(board.drawBoard())) {
                console.log(`${getActivePlayer().name} WON THE GAME`)
                return
            }
            switchActivePlayer();
            console.log(`${getActivePlayer().name}'s turn!`);
        } else return
    }

    return {board, playRound}
}

const game = GameController()
console.log(game.board.drawBoard())

