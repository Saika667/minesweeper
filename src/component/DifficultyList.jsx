import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { generateGrid, generateMines } from "../feature/game.slice";
import ArrowComponent from "./ArrowComponent";

const ListContainer = styled.div`
    display: none;
    overflow: hidden;
    margin: 0 1em;
    background: white;
    background-color: white;
    box-shadow: inset -1px -1px 0 #f5f5f5, inset 1px 1px 0 #a6a6a6, 2px 2px 0 #5a5a5a;
    position: relative;
    width: 12em;

    @media only screen and (max-width: 768px) {
        display: flex; 
    }
`
const List = styled.select`
    width: 100%;
    height: 1.5em;
    font-family: 'VT323', sans-serif;
    font-size: 1.5em;
    padding-left: .5em;
    appearance: none;
    border: none;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    cursor: pointer;
    z-index: 1;

    &:focus{
        outline: none;
    }
`

const ListElt = styled.option`

`

const ArrowComponentElt = styled(ArrowComponent)`
    &.isHover {
        background-color: blue;
    }
`

function DifficultyList() {
    const dispatch = useDispatch();

    function handleClick(difficulty) {
        dispatch(generateGrid(difficulty));
        dispatch(generateMines(difficulty));
    }
    const selectDifficulty = useSelector(({gameGrid}) => gameGrid.difficulty);

    return (
        <ListContainer>
            <List onChange={(evt) => handleClick(evt.target.value)} >
                <ListElt 
                    value='easy' 
                    className={`${selectDifficulty === 'easy' ? 'active' : ''}`}
                >
                    Facile
                </ListElt>

                <ListElt 
                    value='medium'
                    className={`${selectDifficulty === 'medium' ? 'active' : ''}`}
                >
                    Moyen
                </ListElt>

                <ListElt 
                    value='hard'
                    className={`${selectDifficulty === 'hard' ? 'active' : ''}`}
                >
                    Difficile
                </ListElt>
            </List>
            <ArrowComponentElt />
        </ListContainer>
    )
}

export default DifficultyList