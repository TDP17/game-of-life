import React from 'react'
import Header from './Header';
import Footer from './Footer';

import './Game.css';
import Level from '../Game/Level';

const Game = () => {
    return (
        <div className="game">
            <Header />
            <Level />
            <Footer />
        </div>
    )
}

export default Game
