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
        board[row][column].addValue(player)
    }
        //Drawing the board to the console
    const drawBoard = () => {
        console.log(board.map((row) => (row.map(cell => cell.getValue()))))
    }

    return {board, setPickedCell, drawBoard}
}

//Factory for a cell object to the gameboard
function Cell() {
    let value = '';
    const addValue = (player) => value = player;
    const getValue = () => value;
    return {addValue, getValue};
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
        console.log(`${getActivePlayer().name}'s turn!`);
        board.setPickedCell(row, column, getActivePlayer().token);
        board.drawBoard();
        switchActivePlayer();
    }

    board.drawBoard()

    return {board, playRound}
}

const game = GameController()

