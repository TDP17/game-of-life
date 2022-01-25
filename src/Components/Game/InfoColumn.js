import React from 'react'

import './InfoColumn.css';

const InfoColumn = ({ initialIterations, goal, penalty }) => {
    return (
        <div className="info-column">
            <h1>Your Goal</h1>
            <img className="goal-image" src={goal} alt="goal"></img>
            <h3>Iteration(s) <h4>{initialIterations}</h4></h3>
            <h3>Score Penalty  <h4>{penalty}</h4></h3>
        </div>
    )
}

export default InfoColumn
