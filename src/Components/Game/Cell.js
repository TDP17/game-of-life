import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components';

import { cellStateGrid, decrementNeighbours, incrementNeighbours, xBoundaryArray, yBoundaryArray } from '../utils/GridFunctions.js';

import { numberOfCellsOn } from './LevelGrid.js';


const StyledCell = styled.div`
    width: ${(props => 100 / props.columns)}%;
    aspect-ratio:1/1;
    border: 0.1vw solid lightgray;
`;

const Cell = ({ rows, columns, i, j, iterationState }) => {
    const [on, setOn] = useState(false);

    const handleCellClick = () => {
        if (!iterationState) {
            if (!on) {
                incrementNeighbours(i, j);
                xBoundaryArray.push(j);
                yBoundaryArray.push(i);
            }
            else if (on) {
                decrementNeighbours(i, j);
                let idx = yBoundaryArray.indexOf(i);
                if (idx > -1) {
                    yBoundaryArray.splice(idx, 1);
                }
                idx = xBoundaryArray.indexOf(j);
                if (idx > -1) {
                    xBoundaryArray.splice(idx, 1);
                }
            }
            setOn(prev => !prev);
            cellStateGrid[i][j] = !cellStateGrid[i][j];
        }
    }

    useLayoutEffect(() => {
        if (cellStateGrid[i][j])
            setOn(true);

        else
            setOn(false);

    }, [i, j]);



    return (
        <StyledCell id={`cell${i}${j}`} style={{ backgroundColor: on ? "#4f6df5" : "white", cursor: iterationState ? "not-allowed" : "auto" }} onClick={() => iterationState ? null : handleCellClick()} rows={rows} columns={columns} />
    )
}

export default Cell;
