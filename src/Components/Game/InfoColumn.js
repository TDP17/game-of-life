import React from 'react'

import './InfoColumn.css';

const InfoColumn = ({ iterationCounter }) => {
    // console.log("IC reval with", iterationCounter);
    return (
        <div className="info-column">
            {iterationCounter}
        </div>
    )
}

export default InfoColumn
