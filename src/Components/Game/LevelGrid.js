import React, { useState, useEffect, useMemo } from 'react';
import Header from '../PostStart/Header';
import InfoColumn from './InfoColumn';
import Cell from './Cell';

import { displayGridCells, cellStateGridUpdate, intervalID, shouldClear, resetState, clearFunction, cellStateGrid } from '../utils/GridFunctions';
import { compareGrids } from '../utils/LevelFunctions.js';

import './LevelGrid.css';

let attempt = 1;
let initialIterations;
const LevelGrid = ({ rows, columns, goal, goalLogical, level, setLevel, setScore }) => {
    const [iterationState, setIterationState] = useState(false);

    if (level === 1)
        initialIterations = 1;
    else if (level === 2)
        initialIterations = 2;

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
        alert(`Level failed, moving on to attempt ${attempt}`);
    };

    const startLevelFns = () => {
        resetState();
        cellStateGridUpdate(rows, columns);
        if (shouldClear) {
            clearLevel();
            levelFailed();
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
        setIterationState(false);
        setIterationCounter(p => p === initialIterations ? initialIterations - 1 : initialIterations);
        setIterationCounter(p => initialIterations);
        clearInterval(intervalID.id);
        intervalID.id = 0;
    }

    useEffect(() => {
        if (iterationCounter === 0 && iterationState) {
            clearInterval(intervalID.id);
            intervalID.id = 0;
            setIterationState(false);
            setTimeout(() => {
                if (compareGrids(goalLogical, cellStateGrid, level)) {
                    setScore(s => (s + 100 / attempt))
                    setLevel(l => l + 1);
                    alert("Nice job, excellente!");
                }
                else
                    levelFailed();
                clearFunction(rows, columns);
                setIterationCounter(initialIterations);
            }, 1000);
        }
    }, [iterationCounter, goalLogical, rows, columns]);


    return (
        <>
            <Header toggle={toggleLevel} clear={clearLevel} iterationState={iterationState} />
            <section className="level-main-container">
                <div className="level-grid-container">
                    {displayGridCells("level-grid", "level-grid-row", levelGrid)}
                </div>
                <InfoColumn initialIterations={initialIterations} goal={goal} attempt={attempt} />
            </section>
        </>
    );
};

export default LevelGrid;
