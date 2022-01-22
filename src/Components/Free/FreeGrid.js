import React, { useEffect, useMemo, useState } from 'react'
import Cell from '../Game/Cell';
import Header from '../PostStart/Header';

import { displayGridCells, cellStateGridUpdate, clearFunction, intervalID, shouldClear, resetFunction, resetState } from '../utils/GridFunctions';

import './FreeGrid.css';

const FreeGrid = ({ rows, columns }) => {
    const [iterationState, setIterationState] = useState(false);
    const [iterationCounter, setIterationCounter] = useState(0);

    const freeGrid = useMemo(() => {
        const displayGrid = [];
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < columns; j++)
                currentRow.push(<Cell key={Math.random()} rows={rows} columns={columns} i={i} j={j} iterationState={iterationState} />);
            displayGrid.push(currentRow);
        }
        return displayGrid;
    }, [rows, columns, iterationState]);

    const startFreeFns = () => {
        resetState();
        cellStateGridUpdate(rows, columns);
        if (shouldClear)
            clearFree();
    }

    useEffect(() => {
        console.log("FROM FG", iterationState);
    }, [iterationState]);

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
                {displayGridCells("free-grid", "free-grid-row", freeGrid)}
            </div>
        </>
    )
}

export default FreeGrid;
