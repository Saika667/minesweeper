import styled from "styled-components";

const ArrowContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: .5em;
    right: .5em;
`

const Arrow = styled.div.attrs(props => ({
    size: props.size ? props.size + 'em' : '1em',
}))`
    background-color: black;
    width: ${props => props.size};
    height: .25em;
`

function ArrowComponent() {
    return (
        <ArrowContainer>
            <Arrow />
            <Arrow size={.8} />
            <Arrow size={.6} />
            <Arrow size={.4} />
            <Arrow size={.2} />
        </ArrowContainer>
    )
}

export default ArrowComponent