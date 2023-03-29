import { createSlice } from "@reduxjs/toolkit";

const TableSizes = {
    easy: {
        col: 8,
        row: 8,
        mines: 10
    },
    medium: {
        col: 14,
        row: 14,
        mines: 40
    },
    hard: {
        col: 20,
        row: 20,
        mines: 99
    },
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function countNeighbourMines(grid, row, col) {
    let count = 0;
    for(let i = Math.max(row - 1, 0); i <= Math.min(row + 1, grid.length - 1); i++) {
        for(let j = Math.max(col - 1, 0); j <= Math.min(col + 1, grid[0].length - 1); j++) {
            if(grid[i][j].isMine) {
                count ++;
            }
        }
    }
    return count;
}

function getAdjacentCells(rowIndex, colIndex, grid) {
    const adjacentCells = [];
    const coords = [
        {col: colIndex - 1, row: rowIndex - 1},
        {col: colIndex,     row: rowIndex - 1},
        {col: colIndex + 1, row: rowIndex - 1},
        {col: colIndex - 1, row: rowIndex},
        {col: colIndex + 1, row: rowIndex},
        {col: colIndex - 1, row: rowIndex + 1},
        {col: colIndex,     row: rowIndex + 1},
        {col: colIndex + 1, row: rowIndex + 1},
    ];

    coords.forEach(adjCell => {
        if (grid[adjCell.row] && grid[adjCell.row][adjCell.col]) {
            const stateAdjacentC = grid[adjCell.row][adjCell.col];
            if(!stateAdjacentC.isVisible && !stateAdjacentC.isMine) {
                adjacentCells.push(stateAdjacentC);
            } 
        }
    });

    return adjacentCells;
}

function revealAdjacentCells(grid, row, col) {
    const cell = grid[row][col];
    cell.isVisible = true;
    const adjacentCells = getAdjacentCells(row, col, grid);

    for(let i = 0; i < adjacentCells.length; i++) {
        const adjCell = adjacentCells[i];
        if(!adjCell.isMine && !adjCell.isVisible) {
            adjCell.isVisible = true;
            if(adjCell.neighbourMines === 0) {
                revealAdjacentCells(grid, adjCell.cellRow, adjCell.cellCol);
            }
        }
    }
}

export const gameSlice = createSlice({
    name: "gameGrid",
    initialState: {
        difficulty: 'easy',
        grid: [],
        time: 0,
        remainingFlags: 10,
    },
    reducers: {
        generateGrid: (state, { payload }) => {
            state.difficulty = payload;
            state.remainingFlags = TableSizes[payload].mines;
            state.grid = []
            const { row, col } = TableSizes[payload];
            for (let i = 0; i < row; i++) {
                state.grid[i] = [];
                for (let j = 0; j < col; j++) {
                    state.grid[i][j] = {
                        cellCol: j,
                        cellRow: i,
                        isVisible: false,
                        isMine: false,
                        isFlagged: false,
                        neighbourMines: 0
                    }
                }
            }
        },
        generateMines: (state, { payload }) => {
            let remainingMines = TableSizes[payload].mines;
            const col = TableSizes[payload].col;
            const row = TableSizes[payload].row;

            while(remainingMines > 0) {
                const randomCol = randomInt(0, col);
                const randomRow = randomInt(0, row);
                let cell = state.grid[randomRow][randomCol];

                if (!cell.isMine) {
                    cell.isMine = true;
                    // Debug option
                    // cell.isVisible = true
                    remainingMines--;
                }
            }

            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    state.grid[i][j].neighbourMines = countNeighbourMines(state.grid, i, j);
                }
            }
        },
        incrementTimer: (state, { payload }) => {
            state.time += payload;
            // setInterval(() => {
            //     state.time += 1
            // }, 1000)
        },
        toggleCellFlag: (state, { payload }) => {
            const { rowIndex, colIndex } = payload;
            const cell = state.grid[rowIndex][colIndex];
            if(cell.isVisible) {
                return;
            }
            cell.isFlagged = !cell.isFlagged;
            cell.isFlagged ? state.remainingFlags-- : state.remainingFlags++;
        },
        revealCell: (state, { payload }) => {
            const { rowIndex, colIndex } = payload;
            const cell = state.grid[rowIndex][colIndex];
            cell.isVisible = true;
            if(cell.isMine) {
                for (let i = 0; i < state.grid.length; i++) {
                    for (let j = 0; j < state.grid[0].length; j++) {
                        if(state.grid[i][j].isMine) {
                            state.grid[i][j].isVisible = true;
                        }
                    }
                }
            } else {
                if(cell.neighbourMines === 0) {
                    revealAdjacentCells(state.grid, rowIndex, colIndex);
                }
            }
        },
    }
})

export const { generateGrid, generateMines, incrementTimer, toggleCellFlag, revealCell } = gameSlice.actions;
export default gameSlice.reducer;