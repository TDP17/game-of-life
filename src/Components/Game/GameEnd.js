import React from 'react';

import './GameEnd.css';

const GameEnd = ({ score }) => {
    const highScore = () => {
        const hs = localStorage.getItem('highscore');
        if (hs)
            return hs;
        else localStorage.setItem('highscore', score);
        return score;
    }

    return (
        <div className="game-end-container">
            <div className="game-end">
                <p>Congratulations on completing the game! I am very impressed!</p>
                <p>You can now either enjoy replaying for a higher score or experiment in the free mode</p>
                <section className="game-end-scores">
                    <p>Current Score <div>{score}</div></p>
                    <hr />
                    <p>High Score <div>{highScore()}</div></p>
                    <hr />
                </section>
                <a href="https://github.com/TDP17/game-of-life">Source Code</a>
                <h5>Made by TDP17, hope you had fun :)</h5>
            </div>
        </div>
    );
};

export default GameEnd;
