import React, { useState } from 'react'

import Level from './Level';
import GameEnd from './GameEnd';

import { grid_l1, grid_l2, grid_l3, grid_l0 } from '../utils/LevelFunctions.js'

import L0 from './LevelImages/Level0.png';
import L1 from './LevelImages/Level1.png';
import L2 from './LevelImages/Level2.png';
import L3 from './LevelImages/Level3.png';

import './GameController.css';

const GameController = () => {
    const [level, setLevel] = useState(0);

    const [score, setScore] = useState(0);

    const renderLevel = () => {
        switch (level) {
            case 0:
                return <Level goal={L0} goalLogical={grid_l0} level={level} setLevel={setLevel} setScore={setScore} />
            case 1:
                return <Level goal={L1} goalLogical={grid_l1} level={level} setLevel={setLevel} setScore={setScore} />
            case 2:
                return <Level goal={L2} goalLogical={grid_l2} level={level} setLevel={setLevel} setScore={setScore} />
            case 3:
                return <Level goal={L3} goalLogical={grid_l3} level={level} setLevel={setLevel} setScore={setScore} />
            default:
                return <GameEnd score={score} />
        }
    }

    return (
        <div className="game-controller">
            {renderLevel()}
        </div>
    )
}

export default GameController
