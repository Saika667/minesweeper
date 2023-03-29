import { useSelector } from 'react-redux';
import DifficultyButton from './component/DifficultyButton';
import GridComponent from './component/GridComponent';
import styled from 'styled-components';
import TimerComponent from './component/TimerComponent';
import ClockComponent from './component/ClockComponent';
import FlagComponent from './component/FlagComponent';
import DifficultyList from './component/DifficultyList';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const GameTitle = styled.h1`
  text-align: center;
  font-size: 60px;
  margin: 0.4em 0;
  text-shadow: 1px 1px 0 #ffffff;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const GameContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding-top: 5.4em;
  }
`
/*const ParamsWrapper = styled.div`
  
  @media only screen and (max-width: 768px) {
    position: relative;
    height: 3.27em;
  }
`*/

const ParamsContainer = styled.div`
  width: 30%;
  background-color: #b6bab5;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
`

const ButtonsContainer = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const CountersContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: .5em 0;
  width: 12em;
`

const CounterComponent = styled.div`
  font-size: 1.5em;
  height: 1.5em;
  width: 2em;
  background-color: #0d7d5d;
  border-radius: .3em;
  text-align: center;
  line-height: 1.5em;
  margin-left: .5em;
`

function App() {
  const remainingFlags = useSelector(({ gameGrid }) => gameGrid.remainingFlags);

  return (
    <AppContainer>
      <GameContainer>
        <ParamsContainer>
          <GameTitle>Démineur</GameTitle>

          <ButtonsContainer>
            <DifficultyButton difficulty={'easy'}/>
            <DifficultyButton difficulty={'medium'}/>
            <DifficultyButton difficulty={'hard'}/>
          </ButtonsContainer>

          <DifficultyList />

          <CountersContainer>
            <ClockComponent />
            <TimerComponent />
          </CountersContainer>

          <CountersContainer>
            <FlagComponent />
            <CounterComponent>{remainingFlags}</CounterComponent>
          </CountersContainer>
        </ParamsContainer>

        <GridComponent />
      </GameContainer>
    </AppContainer>
  );
}

export default App;
