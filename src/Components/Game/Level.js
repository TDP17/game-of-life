import React, { useEffect } from 'react'
import LevelGrid from './LevelGrid';

import { clearFunction, initializeGrids } from '../utils/GridFunctions';

import './Level.css';

const Level = ({ goal, goalLogical, cellsOn, level, setLevel, setScore }) => {
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
            <LevelGrid rows={rows} columns={columns} goal={goal} goalLogical={goalLogical} cellsOn={cellsOn} level={level} setLevel={setLevel} setScore={setScore} />
        </div>
    )
}

export default Level
