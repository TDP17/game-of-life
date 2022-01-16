import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import TutorialsPage from './TutorialsPage';

import './WelcomeScreen.css'

const WelcomeScreen = () => {
    const [overlay, setOverlay] = useState(false);

    return (
        <>
            <div className="welcome-overlay" style={{ display: overlay ? 'flex' : 'none' }}>
                <button className="wo-exit" onClick={() => setOverlay(false)}>&#215;</button>
                <TutorialsPage />
            </div>
            <div className="welcome-screen">
                <h1>Conway's Game of Life</h1>
                <section className="welcome-options">
                    <Link to='/game'><button className="welcome-button">Start Game</button></Link>
                    <button className="welcome-button" onClick={() => setOverlay(true)}>Learn To Play</button>
                    <Link to='/free'><button className="welcome-button">Free Mode</button></Link>
                </section>
            </div>
        </>
    )
}

export default WelcomeScreen
