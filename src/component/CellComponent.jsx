import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { revealCell, toggleCellFlag } from "../feature/game.slice";
import FlagComponent from "./FlagComponent";
import MineComponent from "./MineComponent";

const Cell = styled.div`
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 0 4px white;
    user-select: none;
    &.dark {
        background-color: #00bd48;
        &.isVisible {
            background-color: #cd8265; 
        }
    }
    &.light {
        background-color: #61ff9e;
        &.isVisible {
            background-color: #daa28b; 
        }
    }
    
    &.one {
        color: blue;
    }
    &.two {
        color: #31be0e;
    }
    &.three {
        color: red;
    }
    &.four {
        color: purple;
    }
    &.five {
        color: orange;
    }
    &.six {
        color: turquoise;
    }
    &.seven {
        color: #ff000092;
    }
    &.eight {
        color: black
    }
`

function CellComponent({ rowIndex, colIndex, color }) {
    const dispatch = useDispatch();
    const cell = useSelector(({ gameGrid }) => gameGrid.grid[rowIndex][colIndex]);
    let content = '';

    if(cell.isFlagged) {
        content = <FlagComponent />;
    } else if(cell.isMine) {
        content = cell.isVisible ? <MineComponent /> : '';
    } else if(cell.isVisible) {
        content = cell.neighbourMines === 0 ? '' : cell.neighbourMines;
    }

    let cellNumberClass = '';
    switch(cell.neighbourMines) {
        case 1:
            cellNumberClass = 'one'
            break;
        case 2:
            cellNumberClass = 'two'
            break;
        case 3:
            cellNumberClass = 'three'
            break;
        case 4:
            cellNumberClass = 'four'
            break;
        case 5:
            cellNumberClass = 'five'
            break;
        case 6:
            cellNumberClass = 'six'
            break;
        case 7:
            cellNumberClass = 'seven'
            break;
        case 8:
            cellNumberClass = 'eight'
            break;
    }

    return (
        <Cell
            onClick={() => dispatch(revealCell({rowIndex, colIndex}))}
            onContextMenu={(e) => {
                e.preventDefault()
                dispatch(toggleCellFlag({rowIndex, colIndex}))
            }}
            className={`${cellNumberClass} ${color} ${cell.isVisible ? 'isVisible' : ''}`}
        >
            { content }
        </Cell>
    )
}

export default CellComponent