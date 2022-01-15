/*
 *Cell should only manage the cellstate grid - never touch neighbour grid with this
*/

import React, { useEffect, useState } from 'react'

import { cellStateGrid, decrementNeighbours, incrementNeighbours, xBoundaryArray, yBoundaryArray } from '../utils/GridFunctions.js';

import './Cell.css'

const Cell = ({ i, j, iterationCounter, iterationState }) => {
    console.log("Cell reval");
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
        <div className="cell" id={`cell${i}${j}`} style={{ backgroundColor: on ? "black" : "gray" }} onClick={handleCellClick}>
        </div>
    )
}

export default Cell;
