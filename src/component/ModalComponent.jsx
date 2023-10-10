import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getTimeMinuteAndSecond } from "./TimerComponent";
import GeneralButton from "./GeneralButton";
import { ReactComponent as ReplaySvg } from "./../assets/replay.svg";
import { ReactComponent as HomeSvg }  from "./../assets/home.svg";
import { generateGrid, generateMines, resetGrid, resetTimer } from "../feature/game.slice";

const ModalContainer = styled.div`
    background: rgba(10, 10, 10, .7);
    position: fixed;
    bottom: 0;
    top: 0;
    left:0;
    right: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 3;

    &.isVisible {
        display: flex;
    }
`

const Modal = styled.div`
    background: #b6bab5;
    width: 60vw;
    height: 27vw;
    border-radius: 30px;
    padding: 2vw;

    @media only screen and (max-width: 768px) {
        width: 70vw;
        height: 35vw;
    }

    @media only screen and (min-width: 769px) and (max-width: 1023px) {
        width: 70vw;
        height: 30vw;
    }
`

const EndGameTitle = styled.h2`
    text-align: center;
    font-size: 4vw;
    margin: .2em 0;
`
const SectionContainer = styled.div`
    display: flex;
    align-items: center;

    &.timerSection {
        justify-content: space-around;

        @media only screen and (max-width: 768px) {
            margin: .8em 0 0 0;
        }
    }
    &.timerTitleSection {
        justify-content: space-around;
        margin: 1em 0;
        background-color: #717171;
        box-shadow: inset -1px -1px 0 #f5f5f5, inset 1px 1px 0 #a6a6a6, 2px 2px 0 #5a5a5a;
        
        @media only screen and (max-width: 768px) {
            margin: .5em 0;
        }
    }
    &.modeSection {
        justify-content: center;
    }
    &.buttonSection {
        justify-content: space-around;
        margin-top: 5vh;
        @media only screen and (max-width: 768px) {
            margin-top: 2vh;
        }
        @media only screen and (min-width: 769px) and (max-width: 1100px) {
            margin-top: 3vh;
        }
    }
`

const SectionTitle = styled.h3`
    font-size: 3vw;
    margin: .2em 0;
    width: 22vw;
    text-align: center;

    &.mode {
        text-align: left;
    }
`

const Span = styled.span`
    font-size: 2.5vw;
`

const TimerComponentElt = styled.div`
    background: #b6bab5;
    font-size: 2.5vw;
    width: 22vw;
    text-align: center;
`
function ModalComponent() {
    const dispatch = useDispatch();
    const game = useSelector(({ gameGrid }) => gameGrid);
    const diff = {
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile'
    };
    let highScores = localStorage.getItem('high_score');
    let difficultyHighScore = "--";
    if (highScores !== null) {
        highScores = JSON.parse(highScores);
        difficultyHighScore = highScores[game.difficulty] === null ? "--" : highScores[game.difficulty];
        highScores[game.difficulty] = "--";
    }

    function goHome() {
        dispatch(resetGrid());
    }

    function replay() { 
        dispatch(generateGrid(game.difficulty));
        dispatch(generateMines(game.difficulty));
        dispatch(resetTimer());
    }
    return (
        <ModalContainer className={["not_started", "playing", "grid_generated"].includes(game.state)  ? '' : 'isVisible'}>
            <Modal>
                {game.state === "win" && <EndGameTitle>Gagné !</EndGameTitle>}
                {game.state === "lose" && <EndGameTitle>Perdu !</EndGameTitle>}

                <SectionContainer className="modeSection">
                    <SectionTitle className="mode">Mode :</SectionTitle>
                    <Span>{diff[game.difficulty]}</Span>
                </SectionContainer>

                <SectionContainer className="timerTitleSection">
                    <SectionTitle>Temps</SectionTitle>
                    <SectionTitle>Meilleur&nbsp;temps</SectionTitle>
                </SectionContainer>

                <SectionContainer className="timerSection">
                    <TimerComponentElt>
                        {getTimeMinuteAndSecond(game.time, 'full')}
                    </TimerComponentElt>
                    <TimerComponentElt>
                        { difficultyHighScore }
                    </TimerComponentElt>
                </SectionContainer>
                <SectionContainer className="buttonSection">
                    <GeneralButton label="Accueil" logo={<HomeSvg/>} handleClick={() => goHome()}/>
                    <GeneralButton label="Rejouer" logo={<ReplaySvg/>} handleClick={() => replay()}/>
                </SectionContainer>
            </Modal>
        </ModalContainer>
    )
}

export default ModalComponent