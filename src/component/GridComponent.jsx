import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CellComponent from "./CellComponent";

const GridContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: auto;
`

const Grid = styled.div`
    display: flex;
    flex-direction: column;
`

const RowContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
function getCellColor(colIndex, rowIndex) {
    let cellColor = '';
    if (rowIndex % 2 === 0) {
        if (colIndex % 2 === 0) {
            cellColor = 'dark';
        } else {
            cellColor = 'light';
        }
    } else {
        if (colIndex % 2 === 0) {
            cellColor = 'light';
        } else {
            cellColor = 'dark';
        }
    }
    
    return cellColor;
}

function GridComponent() {
    const grid = useSelector(({ gameGrid }) => gameGrid.grid);
    //const dispatch = useDispatch();


// i % 2 === 0 si c'est impair, i % 2 === 1 si c'est pair
    return (
        <GridContainer>
            <Grid>
                { grid.map((row, rowIndex) => {
                    return <RowContainer key={rowIndex}>
                        { row.map((cell, colIndex) => {
                            return <CellComponent
                                        color={getCellColor(colIndex, rowIndex)}
                                        key={`${rowIndex} ${colIndex}`} 
                                        rowIndex={rowIndex} 
                                        colIndex={colIndex} 
                                    />
                        })}
                    </RowContainer>
                })}
            </Grid>
        </GridContainer>
    )
}

export default GridComponent;