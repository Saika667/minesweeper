import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { incrementTimer } from "../feature/game.slice";

const TimerContainer = styled.div`
    height: 1.5em;
    width: 6em;
    line-height: 1.5em;
    margin-left: .5em;
    text-align: center;
    font-size: 1.5em;
    background-color: #0d7d5d;
    border-radius: .3em;

    @media only screen and (max-width: 768px) {
        width: 4em;
        font-size: 1em;
        padding: .3em;
    }
`

function TimerComponent() {
    const dispatch = useDispatch();
    const timeValue = useSelector((gameGrid) => gameGrid.gameGrid.time);
    
    // useEffect(() => {
    //     setInterval(() => {
    //       dispatch(incrementTimer(1))
    //     }, 1000)
    // }, [dispatch])
    function getTimeMinuteAndSecond(time) {
        let hours = Math.floor(time / 3600);
        let remainingTime = time % 3600;
        let minutes = Math.floor(remainingTime / 60);
        remainingTime = remainingTime % 60;
        let seconds = remainingTime % 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;


        // let minutes = Math.floor(time / 60);
        // let seconds = time % 60;
        // let hours = Math.floor(time / 3600);
        // seconds = seconds < 10 ? `0${seconds}` : seconds;

        if(hours < 1) {
            return `${minutes} : ${seconds}`;
        } else {
            return `${hours} : ${minutes} : ${seconds}`;
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(incrementTimer(1))
        }, 1000);
  
        return () => clearInterval(timer);
      }, []);

    return (
        <TimerContainer>
            {getTimeMinuteAndSecond(Math.round(timeValue))}
        </TimerContainer>
    )
}

export default TimerComponent