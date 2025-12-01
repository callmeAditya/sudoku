const isplacable = (arr, i, j, num) => {
    let n = 9;
    for (let x = 0; x < n; x++) {
        if (arr[i][x] == num || arr[x][j] == num) { return false }
    }

    let rn = 3;
    let sx = Math.floor(i / rn) * rn;
    let sy = Math.floor(j / rn) * rn;

    for (let x = sx; x < sx + rn; x++) {
        for (let y = sy; y < sy + rn; y++) {
            if (arr[x][y] == num) { return false }
        }
    }

    return true;
}

function solveit(arr, i, j, n) {
    if (i == n) {
        return true;
    }

    if (j == n) return solveit(arr, i + 1, 0, n);

    if (arr[i][j] != 0) return solveit(arr, i, j + 1, n);

    for (let num = 1; num <= 9; num++) {
        if (isplacable(arr, i, j, num)) {
            arr[i][j] = num;
            if (solveit(arr, i, j + 1, n)) return true;
            arr[i][j] = 0;
        }
    }
    return false;
}

export const validSudoku = (arr) => {
    const rows = 9;
    const cols = 9;

    let grid = Array(rows).fill().map(() => Array(cols).fill(0));

    

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j].length === 2) grid[i][j] = Number(arr[i][j][1]);
            else if (arr[i][j].length === 1) grid[i][j] = Number(arr[i][j]);
            else grid[i][j] = 0;
        }
    }

    // console.log('grid came:::',arr, grid);


    var ans =  solveit(grid, 0, 0, 9);

    return grid;
    
}