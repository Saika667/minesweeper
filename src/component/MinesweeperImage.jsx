import styled from "styled-components";

const Container = styled.div`
    width: 800px;
    height: 600px;
    background-color: #58b7ee;
    position: absolute;
    z-index: 100;
`

const Floor = styled.div`
    width: 800px;
    height: 10px;
    background-color: green;
    position: absolute;
    top: 300px;
`

const Earth = styled.div`
    width: 800px;
    height: 290px;
    background-color: #774d4d;
    position: absolute;
    bottom: 0;
`

const Weed = styled.div`
    background-color: green;
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    &.one {
        width: 10px;
        height: 90px;
        left: 70px;
    }
    &.two {
        width: 12px;
        height: 60px;
        transform: rotate(-10deg);
        left: 55px;
    }
    &.three {
        width:15px;
        height: 70px;
        transform: rotate(20deg);
        left: 80px;
    }
    &.four {
        width: 8px;
        height: 50px;
        transform: rotate(-15deg);
        left: 40px;
    }
    &.five {
        width: 8px;
        height: 100px;
        left: 250px;
    }
    &.six {
        width: 8px;
        height: 50px;
        transform: rotate(-15deg);
        left: 240px;
    }
    &.seven {
        width: 14px;
        height: 80px;
        transform: rotate(15deg);
        left: 265px;
    }
    &.eight {
        width: 14px;
        height: 80px;
        transform: rotate(15deg);
        left: 465px;
    }
    &.nine {
        width: 10px;
        height: 50px;
        left: 450px;
    }
    &.ten {
        width: 12px;
        height: 70px;
        transform: rotate(-15deg);
        left: 605px;
    }
    &.eleven {
        width: 8px;
        height: 40px;
        transform: rotate(15deg);
        left: 625px;
    }
    &.twelve {
        width: 10px;
        height: 100px;
        left: 720px;
    }
    &.thirteen {
        width: 7px;
        height: 80px;
        transform: rotate(-15deg);
        left: 710px;
    }
    &.fourteen {
        width: 7px;
        height: 40px;
        transform: rotate(15deg);
        left: 730px;
    }
    &.fifteen {
        width: 8px;
        height: 50px;
        transform: rotate(30deg);
        left: 740px;
    }
`

const MineContainer = styled.div`
    width: 150px;
    height: 200px;
    position: absolute;
    top: 50px;
    left: 300px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const MineBody = styled.div`
    background-color: black;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    position: relative;
    &:after {
        content: "";
        background-color: black;
        position: absolute;
        top: -25px;
        left: 35px;
        width: 70px;
        height: 40px;
        border-radius: 20px 20px 0 0;
    }
`

const Wick = styled.div`
    width: 20px;
    height: 15px;
    border: 1px solid brown;
    border-radius: 7pc 0 7pc 0;
    background-color: #ac9494;
    position: absolute;
    
    &.one {
        top: 25px;
    }
    &.two {
        top: 15px;
        left: 68px;
    }
    &.three {
        top: 5px;
        left: 73px;
    }
`

const FlagContainer = styled.div`
    width: 250px;
    height: 300px;
    position: absolute;
    left: 150px;
    top: 40px;
    z-index: 1;
    overflow: hidden;
`

const FlagBar = styled.div`
    width: 10px;
    height: 300px;
    background-color: brown;
    border-radius: 10px 10px 50% 50%;
    position: absolute;
    right: 10px;
    z-index: 1;
`

const FlagBody = styled.div`
    width: 215px;
    height: 120px;
    background-color: red;
    position: absolute;
    top: 20px;
    right: 10px;
    
    &::after, &:before {
        content: '';
        position: absolute;
        background-color: #58b7ee;
        width: 220px;
        height: 60px;
        right: 8px;
    }
    &:after {
        transform: rotate(-15deg);
        top: -26px;
    }
    &:before {
        transform: rotate(15deg);
        bottom: -26px;
    } 
`

const Cloud = styled.div`
    border-radius: 50%;
    background-color: white;
    position: absolute;
    z-index: 2;

    &.one {
        width: 100px;
        height: 50px;
        top: 80px;
        left: 10px;
    }
    &.two {
        width: 80px;
        height: 60px;
        top: 65px;
        left: 50px;
    }
    &.three {
        width: 100px;
        height: 50px;
        top: 90px;
        left: 70px;
    }
    &.four {
        width: 100px;
        height: 50px;
        top: 10px;
        left: 620px;
    }
    &.five {
        width: 80px;
        height: 60px;
        top: 30px;
        left: 590px;
    }
    &.six {
        width: 100px;
        height: 60px;
        top: 40px;
        left: 660px;
    }
    &.seven {
        width: 130px;
        height: 50px;
        top: 100px;
        left: 410px;
    }
    &.eight {
        width: 100px;
        height: 50px;
        top: 120px;
        left: 470px;
    }
`

function MinesweeperImage() {
    return(
        <Container>
            <Cloud className="one" />
            <Cloud className="two" />
            <Cloud className="three" />
            <Cloud className="four" />
            <Cloud className="five" />
            <Cloud className="six" />
            <Cloud className="seven" />
            <Cloud className="eight" />
            <FlagContainer>
                <FlagBar />
                <FlagBody />
            </FlagContainer>
            <Floor>
                <Weed className="one" />
                <Weed className="two" />
                <Weed className="three" />
                <Weed className="four" />
                <Weed className="five" />
                <Weed className="six" />
                <Weed className="seven" />
                <Weed className="eight" />
                <Weed className="nine" />
                <Weed className="ten" />
                <Weed className="eleven" />
                <Weed className="twelve" />
                <Weed className="thirteen" />
                <Weed className="fourteen" />
                <Weed className="fifteen" />
            </Floor>
            <Earth>
                <MineContainer>
                    <Wick className="one"/>
                    <Wick className="two"/>
                    <Wick className="three"/>
                    <MineBody />
                </MineContainer>
            </Earth>
        </Container>
    )
}

export default MinesweeperImage