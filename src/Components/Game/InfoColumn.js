import React from 'react'

import './InfoColumn.css';

const InfoColumn = ({ initialIterations, goal, setScore }) => {
    return (
        <div className="info-column">
            <h1>Your Goal</h1>
            <img className="goal-image" src={goal} alt="goal"></img>
            <h3>In {initialIterations} iteration(s)</h3>
        </div>
    )
}

export default InfoColumn
