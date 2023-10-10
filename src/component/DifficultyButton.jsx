import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { generateGrid, generateMines, resetTimer } from "../feature/game.slice";

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Button = styled.div`
    border: 2px solid #a6a6a6;
    border-radius: 5px;
    background-image: linear-gradient(to bottom right, #d1d1d1, #a6a6a6);
    box-shadow: inset -1px -1px 0 #f5f5f5, inset 1px 1px 0 #a6a6a6, 2px 2px 0 #5a5a5a;
    color: #5a5a5a;
    cursor: pointer;
    font-size: 2vw;
    text-align: center;
    font-weight: bold;
    width: 4em;
    padding: .4em;
    margin-bottom: 1em;
    text-shadow: 1px 1px 0 #f5f5f5;
    transition: all 0.3s ease-in-out;
    user-select: none;
    
    &.active, &:hover {
        background-image: linear-gradient(to bottom right, #a6a6a6, #d1d1d1);
        border: 2px solid #5a5a5a;
        box-shadow: inset -1px -1px 0 #d1d1d1, inset 1px 1px 0 #5a5a5a, 2px 2px 0 #2a2a2a;
        color: #2a2a2a;
        text-shadow: 1px 1px 0 #d1d1d1;
    }
`

function DifficultyButton({ difficulty }) {
    const difficultyLabel = {
        'easy': 'Facile',
        'medium': 'Moyen',
        'hard': 'Difficile'
    }

    const dispatch = useDispatch();

    function handleClick() {
        dispatch(generateGrid(difficulty));
        dispatch(generateMines(difficulty));
        dispatch(resetTimer());
    }
    const selectDifficulty = useSelector(({gameGrid}) => gameGrid.difficulty);

    return (
        <ButtonContainer>
            <Button onClick={() => handleClick()} className={`${selectDifficulty === difficulty ? 'active' : ''}`}>
                {difficultyLabel[difficulty]}
            </Button>
        </ButtonContainer>
    )
}

export default DifficultyButton