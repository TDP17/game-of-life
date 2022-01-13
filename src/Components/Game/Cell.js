/*
 *Cell should only manage the cellstate grid - never touch neighbour grid with this
*/

import React, { useContext, useEffect, useState } from 'react'

import IterationContext from '../utils/IterationContextProvider.js';

import { cellStateGrid, xBoundaryArray, yBoundaryArray } from '../utils/GridFunctions.js';

import './Cell.css'

const Cell = ({ i, j }) => {
    // console.log("Cell reval");
    const [on, setOn] = useState(false);
    const { iteration } = useContext(IterationContext);

    const handleCellClick = () => {
        if (!on) {
            xBoundaryArray.push(j);
            yBoundaryArray.push(i);
        }
        setOn(prev => !prev);
        cellStateGrid[i][j] = !cellStateGrid[i][j];
    }

    useEffect(() => {
        if (cellStateGrid[i][j])
            setOn(true);
        else
            setOn(false);
    }, [i, j, iteration]);

    return (
        <div className="cell" id={`cell${i}${j}`} style={{ backgroundColor: on ? "black" : "" }} onClick={handleCellClick}>
        </div>
    )
}

export default React.memo(Cell);
