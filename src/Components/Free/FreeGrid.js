import React, { useEffect, useState } from 'react'
import Footer from '../PostStart/Footer';

import { displayGridCells, countNeighbours, cellStateGridUpdate, resetGrids } from '../utils/GridFunctions';

import './FreeGrid.css';

const FreeGrid = ({ update, rows, columns }) => {
    console.log("FGR");
    const [changeCells, setChangeCells] = useState(0);

    const startFreeFns = () => {
        countNeighbours(rows, columns);
        cellStateGridUpdate(rows, columns);
        // nextIteration();
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

    const startFree = () => {
        // if (intervalId) {
        //     clearInterval(intervalId);
        //     setIntervalId(0);
        //     return;
        // }
        // const newIntervalId = setInterval(() => {
        //     startFreeFns();
        // }, 1000);
        // setIntervalId(newIntervalId);
        startFreeFns();
        setChangeCells(prev => prev + 1);
    };

    const resetFree = () => {
        resetGrids(rows, columns);
        setChangeCells(prev => prev + 1);
    }

    return (
        <>
            <div className="free-grid-container">
                {displayGridCells(rows, columns, changeCells, "free-grid", "free-grid-row")}
            </div>
            <Footer start={startFree} reset={resetFree} />
        </>
    )
}

export default FreeGrid;
