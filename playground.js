const board = 
[
    [5, 3, 3], 
    [1, 2, 3],
    [1, 2, 2]
]

function announceResult (array) {

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
            results.push(arr[i].every(element => element === arr[i][0]))
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

console.log(announceResult(board))

