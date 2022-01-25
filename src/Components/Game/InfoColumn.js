import React from 'react'

import './InfoColumn.css';

const InfoColumn = ({ initialIterations, goal, attempt }) => {
    return (
        <div className="info-column">
            <h1>Your Goal</h1>
            <img className="goal-image" src={goal} alt="goal"></img>
            <h3>Iteration(s) <div>{initialIterations}</div></h3>
            <h3>Attempt <div>#{attempt}</div></h3>
        </div>
    )
}

export default InfoColumn
