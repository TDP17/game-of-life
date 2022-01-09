import React from 'react'

import './RulesPage.css'

const Rules = () => {
    return (
        <div className="rules-page">
            <h2>Good luck, user!</h2>
            <p>A simple game based on John Horton Conway's Game of Life (or just Life)</p>
            <section className="rules-section">
                <ul>
                    There are 4 rules to how a cell will work for every step in time
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
            </section>
            <section className="rules-section">
                <p>Every level you will be given a blank grid, a prompt and number of iterations (representing steps in time)</p>
                <div className="rules-example"></div>
                <p>Your goal is to match the figure in the prompt when the given number of iterations hits zero</p>
                {/* Placeholder image in iterations */}
                <div className="rules-iterations"></div>
            </section>
        </div>
    )
}

export default Rules
