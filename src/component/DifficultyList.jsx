import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { generateGrid, generateMines, resetTimer } from "../feature/game.slice";
import ArrowComponent from "./ArrowComponent";

const ListContainer = styled.div`
    background-color: white;
    height: fit-content;
    padding: .3em;
    font-size: 1.3em;
    margin: .5em 0 .5em .5em;
    position: relative;
    z-index: 100;

    @media only screen and (min-width: 1024px) {
        display: none;
    }
`

const ButtonList = styled.div`
    display: flex;
`

const ChoiceContainer = styled.div`
    display: none;
    flex-direction: column;
    background: white;
    position: absolute;
    width: 100%;
    left: 0;

    &.isVisible {
        display: flex;
    }
`

const Choice = styled.div`
    padding: 0.2em .3em;
    cursor: pointer;
`

function DifficultyList() {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    function handleClick(difficulty) {
        console.log(difficulty)
        dispatch(generateGrid(difficulty));
        dispatch(generateMines(difficulty));
        dispatch(resetTimer());
        setIsVisible(false);
    }
    const selectDifficulty = useSelector(({gameGrid}) => gameGrid.difficulty);

    return (
        <ListContainer>
            <ButtonList onClick={() => {setIsVisible(!isVisible)}}>
                Difficulté
                <ArrowComponent />
            </ButtonList>

            <ChoiceContainer className={isVisible ? 'isVisible' : ''}>
                <Choice
                    onClick={() => handleClick('easy')}
                    value='easy' 
                    className={`${selectDifficulty === 'easy' ? 'active' : ''}`}
                >
                    Facile
                </Choice>

                <Choice
                    onClick={() => handleClick('medium')}
                    value='medium'
                    className={`${selectDifficulty === 'medium' ? 'active' : ''}`}
                >
                    Moyen
                </Choice>

                <Choice
                    onClick={() => handleClick('hard')}
                    value='hard'
                    className={`${selectDifficulty === 'hard' ? 'active' : ''}`}
                >
                    Difficile
                </Choice>
            </ChoiceContainer>
        </ListContainer>
    )
}

export default DifficultyList