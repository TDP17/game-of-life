import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import RulesPage from './RulesPage';

import './WelcomeScreen.css'

const WelcomeScreen = () => {
    const [overlay, setOverlay] = useState(false);

    return (
        <>
            <div className="welcome-overlay" style={{ display: overlay ? 'flex' : 'none' }}>
                <button className="wo-exit" onClick={() => setOverlay(false)}>&#215;</button>
                <RulesPage />
            </div>
            <div className="welcome-screen">
                <h1>Connway's Game of Life</h1>
                <section className="welcome-options">
                    <Link to='/game'><button className="welcome-button">Start</button></Link>
                    <button className="welcome-button" onClick={() => setOverlay(true)}>Rules</button>
                    <Link to='/free'><button className="welcome-button">Free Mode</button></Link>
                </section>
            </div>
        </>
    )
}

export default WelcomeScreen
