import React from 'react';

import './GameEnd.css';

const GameEnd = ({ score }) => {
    return (
        <div className="game-end-container">
            {score}
        </div>
    );
};

export default GameEnd;
