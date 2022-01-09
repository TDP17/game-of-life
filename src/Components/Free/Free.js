import React, { useContext, useMemo, useState } from 'react';

import Footer from '../PostStart/Footer';
import Header from '../PostStart/Header';
import FreeGrid from './FreeGrid';

import { createBlankGrid, createCellStateGrid, createNeighbourCountGrid, countNeighbours, cellStateGridUpdate } from '../utils/GridFunctions';
import IterationContext from '../utils/IterationContextProvider.js';


import './Free.css';

const Free = () => {
    console.log("Free reval");
    const [intervalId, setIntervalId] = useState(0);

    const { nextIteration } = useContext(IterationContext);

    const rows = 50;
    const columns = 50;

    const cellStateGrid = useMemo(() => createCellStateGrid(rows, columns), [])
    const neighbourCountGrid = useMemo(() => createNeighbourCountGrid(rows, columns), [])

    const grid = useMemo(() => createBlankGrid(rows, columns, cellStateGrid, neighbourCountGrid), [cellStateGrid, neighbourCountGrid])

    const startFreeFns = () => {
        countNeighbours(rows, columns, cellStateGrid, neighbourCountGrid);
        cellStateGridUpdate(rows, columns, cellStateGrid, neighbourCountGrid);
        nextIteration();
    }

    const startFree = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }
        const newIntervalId = setInterval(() => {
            startFreeFns();
        }, 500);
        setIntervalId(newIntervalId);
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
