import React, { useState } from 'react'
import Header from '../PostStart/Header';

import { cellStateGrid, neighbourCountGrid, displayGridCells, cellStateGridUpdate, clearFunction, intervalID, shouldReset, resetFunction, resetState } from '../utils/GridFunctions';

import './FreeGrid.css';

const FreeGrid = ({ rows, columns }) => {
    // console.log("FGR");
    const [iterationState, setIterationState] = useState(false);
    const [iterationCounter, setIterationCounter] = useState(0);
    // const [intervalID, setIntervalID] = useState(0);

    const startFreeFns = () => {
        resetState();
        cellStateGridUpdate(rows, columns);
        if (shouldReset)
            clearFree();
    }

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
        resetFunction(rows, columns);
        console.log(neighbourCountGrid, cellStateGrid);
        setIterationCounter(p => p === 1 ? 0 : 1);
        setIterationState(false);
        clearInterval(intervalID.id);
        intervalID.id = 0;
    }

    const clearFree = () => {
        clearFunction(rows, columns);
        setIterationCounter(p => p === 1 ? 0 : 1);
        setIterationState(false);
        clearInterval(intervalID.id);
        intervalID.id = 0;
    }

    return (
        <>
            <Header toggle={toggleFree} reset={resetFree} clear={clearFree} iterationState={iterationState} />
            <div className="free-grid-container">
                {displayGridCells(rows, columns, iterationState, iterationCounter, "free-grid", "free-grid-row")}
            </div>
        </>
    )
}

export default FreeGrid;
