import React from 'react'
import { displayBlankGrid } from '../utils/GridFunctions';

import './FreeGrid.css';

const FreeGrid = ({ grid }) => {
    return (
        <div className="free-grid-container">
            {displayBlankGrid(grid, "free-grid", "free-grid-row")}
            {/* {console.log(grid)} */}
            {/* {displayGrid("free-grid", "grid-row")} */}
        </div>
    )
}

export default FreeGrid
