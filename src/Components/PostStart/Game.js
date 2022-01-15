import React from 'react'
import Header from './Header';

import './Game.css';
import Level from '../Game/Level';

const Game = () => {
    return (
        <div className="game">
            <Header />
            <Level />
        </div>
    )
}

export default Game
