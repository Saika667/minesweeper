import styled from "styled-components";

const FlagContainer = styled.div`
    width: 1.9em;
    height: 1.9em;
    position: relative;
`

const FlagPole = styled.div`
    width: .2em;
    height: 1.9em;
    background-color: #b1612f;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: .15em;
`

const Flag = styled.div`
    width: 1em;
    height: .9em;
    background:  radial-gradient(circle at 50% -69%,transparent 50%,#d4082d 35%);
    position: absolute;
    top: .1em;
    left: .25em;
    border-radius: 0 0 6em 37px;

    &:before {
        content: '';
        width: .85em;
        height: .5em;
        border-radius: 1px 15px 0 0;
        background:  radial-gradient(circle at 66% 157%,transparent 56%,#d4082d 35%);
        position: absolute;
        top: .11em;
        left: .78em;
    }

    &:after {
        content: '';
        width: .6em;
        height: .5em;
        border-radius: 0 104% 0 0;
        background:  radial-gradient(circle at 50% 151%,transparent 56%,#d4082d 35%);
        position: absolute;
        top: 0;
        left: 1em;
    }
`

function FlagComponent() {
    return(
        <FlagContainer>
            <FlagPole />
            <Flag />
        </FlagContainer>
    )
}

export default FlagComponent