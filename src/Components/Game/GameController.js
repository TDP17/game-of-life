import React, { useState } from 'react'

import Level from './Level';
import { grid_l1 } from '../utils/LevelFunctions.js'

import L1 from './LevelImages/Level1.png';

import './GameController.css';

const GameController = () => {
    const [level, setLevel] = useState(1);

    const renderLevel = () => {
        switch (level) {
            case 1:
                return <Level goal={L1} initialIterations={1} goalLogical={grid_l1} />
            default:
                console.log("Todo component", level, typeof (level));
                break;
        }
    }

    return (
        <div className="game-controller">
            {renderLevel()}
            <button onClick={() => setLevel(l => l + 1)}>Next</button>
        </div>
    )
}

export default GameController
