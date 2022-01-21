import React, { useState, useEffect } from 'react';
import Header from '../PostStart/Header';
import InfoColumn from './InfoColumn';

import { displayGridCells, cellStateGridUpdate, intervalID, shouldClear, resetState, clearFunction, cellStateGrid, gridBoundaries } from '../utils/GridFunctions';
import { compareGrids } from '../utils/LevelFunctions.js';

import './LevelGrid.css';

let attempt = 1;
const LevelGrid = ({ rows, columns, initialIterations, goal, goalLogical, cellsOn }) => {
    const [iterationState, setIterationState] = useState(false);
    const [iterationCounter, setIterationCounter] = useState(initialIterations);

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
            compareGrids(goalLogical, cellStateGrid, gridBoundaries);
        }
    }, [iterationCounter]);


    return (
        <>
            <Header toggle={toggleLevel} clear={clearLevel} iterationState={iterationState} />
            <section className="level-main-container">
                <div className="level-grid-container">
                    {displayGridCells(rows, columns, iterationState, iterationCounter, "level-grid", "level-grid-row")}
                </div>
                <InfoColumn iterationCounter={iterationCounter} />
            </section>
        </>
    );
};

export default LevelGrid;
