import React, { useContext, useMemo, useState } from 'react';

import Footer from '../PostStart/Footer';
import Header from '../PostStart/Header';
import FreeGrid from './FreeGrid';

import { createBlankGrid, createCellStateGrid, createNeighbourCountGrid, countNeighbours, cellStateGridUpdate } from '../utils/GridFunctions';
import IterationContext from '../utils/IterationContextProvider.js';


import './Free.css';

const Free = () => {
    console.log("Free reval");
    const [flag, setFlag] = useState(false);
    const [intervalId, setIntervalId] = useState(0);

    const { nextIteration } = useContext(IterationContext);

    const rows = 5;
    const columns = 5;

    const cellStateGrid = useMemo(() => createCellStateGrid(rows, columns), [])
    const neighbourCountGrid = useMemo(() => createNeighbourCountGrid(rows, columns), [])

    const grid = useMemo(() => createBlankGrid(rows, columns, cellStateGrid, flag, setFlag), [cellStateGrid, flag])

    const startFreeFns = () => {
        countNeighbours(rows, columns, cellStateGrid, neighbourCountGrid);
        cellStateGridUpdate(rows, columns, cellStateGrid, neighbourCountGrid);
        console.log(neighbourCountGrid);
        nextIteration();
    }

    const startFree = () => {
        startFreeFns();
        // if (intervalId) {
        //     clearInterval(intervalId);
        //     setIntervalId(0);
        //     return;
        // }
        // const newIntervalId = setInterval(() => {
        //     startFreeFns();
        // }, 5000);
        // setIntervalId(newIntervalId);
    };



    return (
        <div className="free-mode-container">
            <Header />
            <FreeGrid grid={grid} />
            <Footer start={startFree} />
        </div>
    )
}

export default React.memo(Free);
