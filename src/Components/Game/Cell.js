/**
Cell should only manage the cellstate grid - never touch neighbour grid with this
*/

import React, { useContext, useEffect, useState } from 'react'

import IterationContext from '../utils/IterationContextProvider.js';

import { gridBoundaries } from '../utils/GridBoundaries.js';

import './Cell.css'

const Cell = ({ i, j, cellStateGrid, flag, setFlag }) => {
    console.log("Cell reval");
    const [on, setOn] = useState(false);
    const { iteration } = useContext(IterationContext);

    const handleCellClick = () => {
        if(!flag)
        {
            gridBoundaries.left = j;
            gridBoundaries.top = i;
            setFlag(true);
        }
        // if (cellStateGrid[i][j])
        //     countNeighbours(false, i, j, neighbourCountGrid);
        // else
        //     countNeighbours(true, i, j, neighbourCountGrid);
        if (!on) {
            if (gridBoundaries.left > j)
                gridBoundaries.left = j;
            if (gridBoundaries.right < j)
                gridBoundaries.right = j;
            if (gridBoundaries.top > i)
                gridBoundaries.top = i;
            if (gridBoundaries.bottom < i)
                gridBoundaries.bottom = i;
        }

        setOn(prev => !prev);
        cellStateGrid[i][j] = !cellStateGrid[i][j];
    }

    useEffect(() => {
        if (cellStateGrid[i][j])
            setOn(true);
        else
            setOn(false);
    }, [cellStateGrid, i, j, iteration]);

    return (
        <div className="cell" id={`cell${i}${j}`} style={{ backgroundColor: on ? "black" : "" }} onClick={handleCellClick}>
        </div>
    )
}

export default React.memo(Cell);
