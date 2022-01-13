import React, { useState } from 'react'
import Footer from '../PostStart/Footer';

import { displayGridCells, countNeighbours, cellStateGridUpdate, resetGrids, intervalID, shouldReset } from '../utils/GridFunctions';

import './FreeGrid.css';

const FreeGrid = ({ update, rows, columns }) => {
    // console.log("FGR");
    const [iterationState, setIterationState] = useState(false);
    const [iterationCounter, setIterationCounter] = useState(0);
    // const [intervalID, setIntervalID] = useState(0);

    const startFreeFns = () => {
        countNeighbours(rows, columns);
        cellStateGridUpdate(rows, columns);
        if (shouldReset)
            resetFree();
    }

    // const stopFree = () => {
    //     clearInterval(intervalId);
    //     setIntervalId(0);
    // };

    // const clearFree = () => {
    //     cellStateGrid = Array.from(Array(rows), () => new Array(columns).fill(false));
    //     neighbourCountGrid = Array.from(Array(rows), () => new Array(columns).fill(0));
    //     console.log(cellStateGrid, neighbourCountGrid);
    //     setFlag(false);
    // };

    const toggleFree = () => {
        setIterationState(p => !p);
        if (intervalID.id) {
            clearInterval(intervalID.id);
            intervalID.id = 0;
            return;
        }
        const newIntervalID = setInterval(() => {
            startFreeFns();
            setIterationCounter(p => p + 1);
        }, 1000);
        intervalID.id = newIntervalID;
    };

    const resetFree = () => {
        resetGrids(rows, columns);
        setIterationCounter(prev => prev + 1);
        setIterationState(false);
        clearInterval(intervalID.id);
        intervalID.id = 0;
    }

    return (
        <>
            <div className="free-grid-container">
                {displayGridCells(rows, columns, iterationState, iterationCounter, "free-grid", "free-grid-row")}
            </div>
            <Footer toggle={toggleFree} reset={resetFree} iterationState={iterationState} />
        </>
    )
}

export default FreeGrid;
