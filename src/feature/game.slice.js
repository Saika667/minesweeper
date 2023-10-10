import { createSlice } from "@reduxjs/toolkit";

const TableSizes = {
    easy: {
        col: 8,
        row: 8,
        mines: 10,
        cells: 54
    },
    medium: {
        col: 14,
        row: 14,
        mines: 40,
        cells: 156
    },
    hard: {
        col: 20,
        row: 20,
        mines: 99,
        cells: 301
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

function revealAdjacentCells(state, row, col) {
    const cell = state.grid[row][col];
    cell.isVisible = true;
    cell.isFlagged = false;
    const adjacentCells = getAdjacentCells(row, col, state.grid);

    for(let i = 0; i < adjacentCells.length; i++) {
        const adjCell = adjacentCells[i];
        if(!adjCell.isMine && !adjCell.isVisible) {
            adjCell.isVisible = true;
            adjCell.isFlagged = false;
            state.remainingCells--;
            if(adjCell.neighbourMines === 0) {
                revealAdjacentCells(state, adjCell.cellRow, adjCell.cellCol);
            }
        }
    }
}

function saveHighScore(time, difficulty) {
    let localS = localStorage.getItem('high_score');
    let highScores = {};
    
    if (localS === null) {
        highScores = {
            easy: null,
            medium: null,
            hard: null
        }
    } else {
        highScores = JSON.parse(localS);
    }

    if (highScores[difficulty] > time || highScores[difficulty] === null) {
        highScores[difficulty] = time;
        localStorage.setItem('high_score', JSON.stringify(highScores));
    }
}

const initialState = {
    difficulty: '',
    grid: [],
    time: 0,
    state: 'not_started',
    remainingFlags: 10,
    remainingCells: 54
}

export const gameSlice = createSlice({
    name: "gameGrid",
    initialState: initialState,
    reducers: {
        generateGrid: (state, { payload }) => {
            state.difficulty = payload;
            state.remainingFlags = TableSizes[payload].mines;
            state.remainingCells = TableSizes[payload].cells;
            state.grid = [];
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
            state.state = 'grid_generated';
        },
        resetGrid: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key];
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
        startTimer: (state) => {
            state.state = 'playing';
        },
        resetTimer: (state) => {
            state.time = 0;
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
            if (state.state !== 'playing' && state.state !== 'grid_generated') {
                return;
            }
            if (state.state === 'grid_generated') {
                state.state = 'playing';
            }
            const { rowIndex, colIndex } = payload;
            const cell = state.grid[rowIndex][colIndex];
            if (cell.isVisible) {
                return;
            }
            cell.isVisible = true;
            if(cell.isMine) {
                for (let i = 0; i < state.grid.length; i++) {
                    for (let j = 0; j < state.grid[0].length; j++) {
                        if(state.grid[i][j].isMine) {
                            state.grid[i][j].isVisible = true;
                        }
                    }
                }
                state.state = 'lose';
            } else {
                if(cell.neighbourMines === 0) {
                    revealAdjacentCells(state, rowIndex, colIndex);
                }
                state.remainingCells--;
                if (state.remainingCells === 0) {
                    state.state = 'win';
                    saveHighScore(state.time, state.difficulty);
                }
            }
        },
    }
})

export const { 
    generateGrid,
    resetGrid,
    generateMines,
    incrementTimer,
    toggleCellFlag,
    revealCell,
    startTimer,
    resetTimer
} = gameSlice.actions;
export default gameSlice.reducer;