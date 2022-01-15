/*
 *Cell should only manage the cellstate grid - never touch neighbour grid with this
*/

import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { cellStateGrid, decrementNeighbours, incrementNeighbours, xBoundaryArray, yBoundaryArray } from '../utils/GridFunctions.js';

const StyledCell = styled.div`
    width: ${(props => 100/props.columns)}%;
    aspect-ratio:1/1;
    border: 0.1vw solid lightgray;
`;

const Cell = ({ rows, columns, i, j, iterationCounter, iterationState }) => {
    const [on, setOn] = useState(false);

    const handleCellClick = () => {
        if (!on) {
            incrementNeighbours(i, j);
            xBoundaryArray.push(j);
            yBoundaryArray.push(i);
        }
        else if (on)
            decrementNeighbours(i, j);
        setOn(prev => !prev);
        cellStateGrid[i][j] = !cellStateGrid[i][j];
    }

    useEffect(() => {
        if (cellStateGrid[i][j])
            setOn(true);
        else
            setOn(false);
    }, [i, j, iterationCounter]);



    return (
        <StyledCell id={`cell${i}${j}`} style={{ backgroundColor: on ? "#4f6df5" : "white" }} onClick={handleCellClick} rows={rows} columns={columns}/>
    )
}

export default Cell;
