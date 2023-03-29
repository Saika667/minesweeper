import styled from "styled-components";
import { darken } from "polished";

const Container = styled.div`
    width: 1.9em;
    height: 1.9em;
    //background-color: blue;
    display: flex;
    align-items: flex-end;
`

const MineContainer = styled.div`
    transform: rotate(37deg);
`

const MineBody = styled.div`
    width: 1.35em;
    height: 1.35em;
    background-color: black;
    border-radius: 50%;
    position: relative;

    &:before {
        content: '';
        width: .65em;
        height: .35em;
        background-color: black;
        border-radius: 5px 5px 0 0;
        position: absolute;
        top: -.25em;
        left: .35em;
        z-index: 3;
    }
    &:after {
        content: '';
        width: .55em;
        height: .3em;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: .35em;
        left: .1em;
        filter: blur(.1em);
        transform: rotate(-50deg);
    }
`

const Wick = styled.div`
    //background: radial-gradient(circle at 4% 87%,transparent 59%,#ffe6b3 35%);
    background-color: #ffe6b3;
    width: 0.1em;
    height: 0.2em;
    border-radius: 7pc 0px;
    position: absolute;
    border: 1px solid ${darken(.5, "#ffe6b3")};

    &.one {
        left: 0.63em;
        top: -0.4em;
        transform: rotate(41deg);
        z-index: 2;
    }

    &.two {
        left: 0.7em;
        top: -0.54em;
        transform: rotate(25deg);
        z-index: 1;
    }
    
    &.three {
        left: 0.75em;
        top: -0.65em;
        transform: rotate(-9deg);
    }
`

const Flame = styled.div`
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    filter: blur(2px);
    background-color: #ffff1a;
    position: absolute;
    top: -0.85em;
    right: 0.25em;
`

function MineComponent() {
    return(
        <Container>
            <MineContainer>
                <Wick className="one"/>
                <Wick className="two"/>
                <Wick className="three"/>
                <Flame />
                <MineBody />
            </MineContainer>
        </Container>
    )
}

export default MineComponent