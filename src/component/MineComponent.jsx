import styled from "styled-components";
import { darken } from "polished";

const Container = styled.div`
    width: 2.9vw;
    height: 2.9vw;
    background-color: blue;
    display: flex;
    align-items: flex-end;
    font-size: 2vw;

    @media only screen and (max-width: 768px) {
        width: 9vw;
        height: 9vw;
    }
`

const MineContainer = styled.div`
    position: relative;
`

const MineBody = styled.div`
    width: 2vw;
    height: 2vw;
    background-color: black;
    border-radius: 50%;
    position: relative;

    &:before {
        content: '';
        width: 1.05vw;
        height: 1.1vw;
        background-color: black;
        border-radius: 15px 15px 0 0;
        position: absolute;
        top: -.25rem;
        left: .15rem;
        z-index: 3;
    }
    &:after {
        content: '';
        width: .75vw;
        height: .4vw;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: .35rem;
        left: .2rem;
        filter: blur(.2rem);
        transform: rotate(-50deg);
        z-index: 4;
    }
`
const WickContainer = styled.div`
    width: fit-content;
    position: relative;
    width: 1.6vw;
    height: .7vw;
`
const Wick = styled.div`
    background-color: #ffe6b3;
    width: 0.25vw;
    height: 0.4vw;
    border-radius: 7pc 0;
    position: absolute;
    border: 1px solid ${darken(.5, "#ffe6b3")};

    &.one {
        left: 0.23vw;
        top: .1vw;
        transform: rotate(-22deg);
        z-index: 2;
    }

    &.two {
        left: 0.3vw;
        top: -0.05vw;
        transform: rotate(12deg);
        z-index: 1;
    }
    
    &.three {
        left: 0.45vw;
        top: -0.07vw;
        transform: rotate(29deg);
        &:after {
            content: '';
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            filter: blur(2px);
            background-color: #ffff1a;
            position: absolute;
            top: -0.3rem;
            right: -0.3rem;
            z-index: 2;
        }
    }
`

function MineComponent() {
    return(
        <Container>
            <MineContainer>
                <WickContainer>
                    <Wick className="one"/>
                    <Wick className="two"/>
                    <Wick className="three"/>
                </WickContainer>   
                <MineBody />
            </MineContainer>
        </Container>
    )
}

export default MineComponent