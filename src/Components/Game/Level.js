import React, { useEffect } from 'react'
import LevelGrid from './LevelGrid';

import { clearFunction, initializeGrids } from '../utils/GridFunctions';

import './Level.css';

const Level = ({ goal, goalLogical, cellsOn, initialIterations }) => {
    const rows = 15;
    const columns = 25;

    initializeGrids(rows, columns);

    useEffect(() => {
        return () => {
            clearFunction(rows, columns);
        };
    }, []);


    return (
        <div className="level">
            <LevelGrid rows={rows} columns={columns} initialIterations={initialIterations} goal={goal} goalLogical={goalLogical} cellsOn={cellsOn} />
        </div>
    )
}

export default Level
