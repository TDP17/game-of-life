import React, { useState, useEffect, useMemo } from 'react';
import Header from '../PostStart/Header';
import InfoColumn from './InfoColumn';
import Cell from './Cell';

import { displayGridCells, cellStateGridUpdate, intervalID, shouldClear, resetState, clearFunction, cellStateGrid } from '../utils/GridFunctions';
import { compareGrids } from '../utils/LevelFunctions.js';

import './LevelGrid.css';

let attempt = 1;
const LevelGrid = ({ rows, columns, initialIterations, goal, goalLogical }) => {
    const [iterationState, setIterationState] = useState(false);
    const [iterationCounter, setIterationCounter] = useState(initialIterations);

    const levelGrid = useMemo(() => {
        const displayGrid = [];
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < columns; j++)
                currentRow.push(<Cell key={Math.random()} rows={rows} columns={columns} i={i} j={j} iterationState={iterationState} />);
            displayGrid.push(currentRow);
        }
        return displayGrid;
    }, [rows, columns, iterationState]);

    const levelFailed = () => {
        attempt += 1;
        alert(`Level failed, moving on to attempt ${attempt}, surely you'll get it one day`);
    };

    const startLevelFns = () => {
        resetState();
        cellStateGridUpdate(rows, columns);
        if (shouldClear) {
            levelFailed();
            clearLevel();
        }
    }

    const toggleLevel = () => {
        if (iterationCounter) {
            setIterationState(p => !p);
            if (intervalID.id) {
                clearInterval(intervalID.id);
                intervalID.id = 0;
                return;
            }
            const newIntervalID = setInterval(() => {
                startLevelFns();
                if (!shouldClear) {
                    setIterationCounter(p => p - 1);
                }
            }, 1000);
            intervalID.id = newIntervalID;
        }
    };

    const clearLevel = () => {
        clearFunction(rows, columns);
        setIterationCounter(p => p === initialIterations ? initialIterations - 1 : initialIterations);
        setIterationCounter(p => initialIterations);
        setIterationState(false);
        clearInterval(intervalID.id);
        intervalID.id = 0;
    }

    useEffect(() => {
        if (iterationCounter === 0) {
            clearInterval(intervalID.id);
            intervalID.id = 0;
            setIterationState(false);
            setTimeout(() => {
                if (compareGrids(goalLogical, cellStateGrid))
                    alert("Nice job, excellente!");
                else
                    alert("Aw, try again");
            }, 1000);
        }
    }, [iterationCounter]);


    return (
        <>
            <Header toggle={toggleLevel} clear={clearLevel} iterationState={iterationState} />
            <section className="level-main-container">
                <div className="level-grid-container">
                    {displayGridCells("level-grid", "level-grid-row", levelGrid)}
                </div>
                <InfoColumn iterationCounter={iterationCounter} />
            </section>
        </>
    );
};

export default LevelGrid;
