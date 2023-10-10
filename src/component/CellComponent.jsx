import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { revealCell, startTimer, toggleCellFlag } from "../feature/game.slice";
import Bomb from "./../assets/bomb.svg";
import flag from './../assets/flag.svg';

const Cell = styled.div`
    width: 2.4vw;
    height: 2.4vw;
    max-width: 43px;
    max-height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    text-shadow: 0 0 4px white;
    user-select: none;
    z-index: 1;
    @media only screen and (max-width: 1023px) {
        width: 10vw;
        height: 10vw;
        font-size: 2em;
    }
    
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
const Img = styled.img`
    width: 2.5vw;
    max-width: 42px;
    @media only screen and (max-width: 1023px) {
        width: 9.5vw;
    }
`
function CellComponent({ rowIndex, colIndex, color }) {
    function handleClick() {
        if (cell.isFlagged) {
            return;
        }
        if (state === 'not_started') {
            dispatch(startTimer());
        }
        dispatch(revealCell({rowIndex, colIndex}));
    }

    const dispatch = useDispatch();
    const state = useSelector(({ gameGrid }) => gameGrid.state);
    const cell = useSelector(({ gameGrid }) => gameGrid.grid[rowIndex][colIndex]);
    let content = '';

    if(cell.isFlagged) {
        content = <Img src={flag}></Img>;
    } else if(cell.isMine) {
        content = cell.isVisible ? <Img src={Bomb}></Img> : '';
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
        default:
            break;
    }

    return (
        <Cell
            onClick={() => handleClick()}
            onContextMenu={(e) => {
                e.preventDefault()
                dispatch(toggleCellFlag({rowIndex, colIndex}))
            }}
            className={`${color} ${cell.isVisible ? `isVisible ${cellNumberClass}` : ''}`}
        >
            { content }
        </Cell>
    )
}

export default CellComponent