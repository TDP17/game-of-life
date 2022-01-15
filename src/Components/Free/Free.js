/*
 * This is the parent component for the free mode - used for initializations
 * This should never re-render due to state/context changes
*/
import React from 'react';

import FreeGrid from './FreeGrid';

import { initializeGrids } from '../utils/GridFunctions';

import './Free.css';

const Free = () => {
    const rows = 50;
    const columns = 50;

    initializeGrids(rows, columns);

    return (
        <div className="free-mode-container">
            <FreeGrid rows={rows} columns={columns}/>
        </div>
    )
}

export default Free;
