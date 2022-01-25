import React from 'react'

import './TutorialsPage.css'

import Rule1 from './Images/rule1.gif';
import Rule2 from './Images/rule2.gif';
import Rule3 from './Images/rule3.gif';
import Rule4 from './Images/rule4.gif';

const TutorialsPage = () => {
    return (
        <div className="tutorial-container">
            <section className="tutorial-header">
                <h2>Welcome, player!</h2>
                <p>This is a simple game based on John Horton Conway's Game of Life</p>
            </section>
            There are 4 rules to how a cell will work for every step in time
            <section className="tutorial-rules">
                <div className="rule">
                    Any live cell with fewer than two live neighbours dies.
                    <img src={Rule1} alt="rule-1" />
                </div>
                <div className="rule">
                    Any live cell with two or three live neighbours lives.
                    <img src={Rule2} alt="rule-2" />
                </div>
                <div className="rule">
                    Any live cell with more than three live neighbours dies.
                    <img src={Rule3} alt="rule-3" />
                </div>
                <div className="rule">
                    Any dead cell with exactly three live neighbours becomes a live cell.
                    <img src={Rule4} alt="rule-4" />
                </div>
            </section>
            <br />
            <section className="tutorial-explanation">
                <p>Every level you will be given a blank grid, a prompt and number of iterations (representing steps in time). Your goal is to match the figure in the prompt exactly in the given number of iterations</p>
                {/* Show example level */}
                <iframe src="https://www.youtube.com/embed/D6pmGLuPF-Y" width="100%" height="420px"></iframe>
            </section>
        </div>
    )
}

export default TutorialsPage
