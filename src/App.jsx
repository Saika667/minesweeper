import { useSelector } from 'react-redux';
import DifficultyButton from './component/DifficultyButton';
import GridComponent from './component/GridComponent';
import styled from 'styled-components';
import TimerComponent from './component/TimerComponent';
import ModalComponent from './component/ModalComponent';
import DifficultyList from './component/DifficultyList';
import flag from './assets/flag.svg';
import clock from './assets/clock.svg'
import MinesweeperImage from './component/MinesweeperImage';
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  user-select: none;
`

const GameTitle = styled.h1`
  text-align: center;
  font-size: 6vw;
  margin: 0.4em 0;
  text-shadow: 1px 1px 0 #ffffff;

  @media only screen and (max-width: 1023px) {
    margin: .2em 0;
    width: 100%;
  }
`

const GameContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  @media only screen and (max-width: 1023px) {
    flex-direction: column;
    overflow: auto;
  }
`

const GridContainer = styled.div`
  background-color: #b6bab5;
  width: 70%;
  display: flex;
  position: relative;

  @media only screen and (min-width: 1024px) {
    &::after, &::before {
      content: '';
      position: absolute;
      border-radius: 15px;
      z-index: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    &::after {
      width: 49vw;
      height: 49vw;
      max-width: 889px;
      max-height: 889px;
      background-color: #0d7d5d;
    }

    &::before {
      content: "";
      width: 50vw;
      height: 50vw;
      max-width: 900px;
      max-height: 900px;
      background-color: #717171;
    }
  }
  @media only screen and (max-width: 1023px) {
    min-width: 100%;
    width: fit-content;
    flex: 1;
  }
`
const NoSignal = styled.span`
  font-size: 5vw;
  color: #34c877;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1023px) {
    display: none;
  }
`

const ParamsContainer = styled.div`
  width: 30%;
  background-color: #b6bab5;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid black;

  @media only screen and (max-width: 1023px) {
    width: 100vw;
    border-bottom: 1px solid black;
    margin: 0;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
  }
`
const Params = styled.div`
  
  @media only screen and (max-width: 1023px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    width: 100%;
  }
`

const ButtonsContainer = styled.div`
  @media only screen and (max-width: 1023px) {
    display: none;
  }
`

const CountersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1em;

  @media only screen and (max-width: 1023px) {
    margin: .5em;
  }
`

const CounterComponent = styled.div`
  font-size: 2vw;
  height: 1.5em;
  width: 2em;
  background-color: #0d7d5d;
  border-radius: .3em;
  text-align: center;
  line-height: 1.5em;
  margin-left: .5em;
  @media only screen and (max-width: 768px) {
    font-size: 1em;
    padding: .3em;
  }
`
const Img = styled.img`
  width: 5vw;
  @media only screen and (max-width: 767px) {
    width: 6vw;
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 4vw;
  }
`

function App() {
  const remainingFlags = useSelector(({ gameGrid }) => gameGrid.remainingFlags);
  const stateGame = useSelector(({ gameGrid }) => gameGrid.state);

  return (
    <AppContainer>
      <ModalComponent />
      <GameContainer>
        <ParamsContainer>
          <GameTitle>Démineur</GameTitle>

          <Params>
            <ButtonsContainer>
              <DifficultyButton difficulty={'easy'}/>
              <DifficultyButton difficulty={'medium'}/>
              <DifficultyButton difficulty={'hard'}/>
            </ButtonsContainer>

            <DifficultyList />

            <CountersContainer>
              <Img src={clock} />
              <TimerComponent />
            </CountersContainer>

            <CountersContainer>
              <Img src={flag} />
              <CounterComponent>{remainingFlags}</CounterComponent>
            </CountersContainer>
          </Params>
        </ParamsContainer>

        <GridContainer>
          {stateGame === "not_started" && <NoSignal>NO&nbsp;SIGNAL</NoSignal>}
          <GridComponent />
        </GridContainer>
      </GameContainer>
    </AppContainer>
  );
}

export default App;
