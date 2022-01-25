import React from 'react';

import './GameEnd.css';

const GameEnd = ({ score }) => {
    const highScore = () => {
        const hs = localStorage.getItem('highscore');
        console.log(hs);
        if (hs) {
            if (hs < score)
                localStorage.setItem('highscore', parseInt(score));
            return hs;
        }
        else localStorage.setItem('highscore', parseInt(score));
        return parseInt(score);
    }

    return (
        <div className="game-end-container">
            <div className="game-end">
                <p>Congratulations on completing the game! I am very impressed!</p>
                <p>You can now either enjoy <a onClick={() => window.location.reload()}><u>replaying</u></a> for a higher score or experiment in the free mode</p>
                <section className="game-end-scores">
                    <h3>Current Score <h4>{parseInt(score)}</h4></h3>
                    <hr />
                    <h3>High Score <h4>{highScore()}</h4></h3>
                    <hr />
                </section>
                <a href="https://github.com/TDP17/game-of-life">Source Code</a>
                <h5>Made by TDP17, hope you had fun :)</h5>
            </div>
        </div>
    );
};

export default GameEnd;
