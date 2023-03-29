import styled from "styled-components";

const ClockContainer = styled.div`
    width: 2em;
    height: 2em;
`

const Clock = styled.div`
    width: 2em;
    height: 2em;
    border-radius: 50%;
    border: 1px solid #841005;
    background-color: #c45008;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
        content: '';
        width: 1.7em;
        height: 1.7em;
        border-radius: 50%;
        border: 1px solid #841005;
        background-color: #ffffff;
        position: absolute;
        top: .1em;
        left: .1em;
        box-sizing: border-box;
    }
`
const Point = styled.div`
    width: .15em;
    height: .15em;
    border-radius: 50%;
    background-color: black;
    z-index: 1;
`

const BarHour = styled.div`
    width: .1em;
    height: .15em;
    background-color: black;
    z-index: 1;
    position: absolute;

    &.one {
        top: .2em;
        left: .9em;
    }
    &.two {
        top: .3em;
        right: .58em;
        transform: rotate(30deg);
    }
    &.three {
        top: .55em;
        right: .34em;
        transform: rotate(60deg);
    }
    &.four {
        top: .9em;
        right: .26em;
        transform: rotate(90deg);
    }
    &.five {
        bottom: .55em;
        right: .34em;
        transform: rotate(-60deg);
    }
    &.six {
        bottom: .3em;
        right: .58em;
        transform: rotate(-30deg);
    }
    &.seven {
        bottom: .2em;
        left: .9em;
    }
    &.eight {
        bottom: .3em;
        left: .58em;
        transform: rotate(30deg);
    }
    &.nine {
        bottom: .55em;
        left: .34em;
        transform: rotate(60deg);
    }
    &.ten {
        top: .9em;
        left: .25em;
        transform: rotate(90deg);
    }
    &.eleven {
        top: .55em;
        left: .34em;
        transform: rotate(-60deg);
    }
    &.twelve {
        top: .3em;
        left: .58em;
        transform: rotate(-30deg);
    }
`

const Hand = styled.div`
    width: .1em;
    background-color: black;
    position: absolute;
    z-index: 1;

    &.small {
        height: .3em;
        top: .65em;
        left: .95em;
        transform: rotate(20deg);
    }
    &.large {
        height: .5em;
        top: .9em;
        left: 1.07em;
        transform: rotate(-40deg);
    }
`
function ClockComponent() {
    return (
        <ClockContainer>
            <Clock>
                <BarHour className="one"/>
                <BarHour className="two"/>
                <BarHour className="three"/>
                <BarHour className="four"/>
                <BarHour className="five"/>
                <BarHour className="six"/>
                <BarHour className="seven"/>
                <BarHour className="eight"/>
                <BarHour className="nine"/>
                <BarHour className="ten"/>
                <BarHour className="eleven"/>
                <BarHour className="twelve"/>
                <Point />
                <Hand className="small" />
                <Hand className="large" />
            </Clock>
        </ClockContainer>
    )
}

export default ClockComponent