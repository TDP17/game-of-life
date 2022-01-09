import React from 'react'

import './Level.css';

import { createBlankGrid } from '../utils/GridFunctions.js';
import InfoColumn from './InfoColumn';

const Level = () => {
    console.log("Level reval");
  
    return (
        <div className="level">
            {/* Grid */}
            <div className="level-grid-container">
                {createBlankGrid(20, 20)}
                {/* {displayGrid("level-grid", "grid-row")} */}
            </div>
            {/* Prompt + Iterations */}
            <InfoColumn />
        </div>
    )
}

export default Level
