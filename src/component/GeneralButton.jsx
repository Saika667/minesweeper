import styled from "styled-components";
import { Button, ButtonContainer } from "./DifficultyButton";

const ButtonContainerElt = styled(ButtonContainer)`
    &:hover {
        svg {
            fill: #2a2a2a;
            #Dribbble-Light-Preview {
                fill: #2a2a2a;
            }
        }
    }
`

const ButtonElt = styled(Button)`
    width: 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: #5a5a5a;
        width: 2vw;
        height: fit-content;
        margin-right: .3em;
        #Dribbble-Light-Preview {
            fill: #5a5a5a;
        }
    }
    @media only screen and (max-width: 768px) {
        width: 16vw;
        font-size: 3vw;
    }
`

function GeneralButton({ label, logo, handleClick }) {

    return (
        <ButtonContainerElt>
            <ButtonElt onClick={() => handleClick()}>
                {logo}
                {label}
            </ButtonElt>
        </ButtonContainerElt>   
    )
}

export default GeneralButton