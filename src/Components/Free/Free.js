/*
 * This is the parent component for the free mode - used for initializations
 * This should never re-render due to state/context changes
*/
import React from 'react';

import Header from '../PostStart/Header';
import FreeGrid from './FreeGrid';

import { initializeGrids } from '../utils/GridFunctions';

import './Free.css';

const Free = () => {
    console.log("FR");
    const rows = 5;
    const columns = 5;

    initializeGrids(rows, columns);

    return (
        <div className="free-mode-container">
            <Header />
            <FreeGrid rows={rows} columns={columns}/>
        </div>
    )
}

export default Free;
