import React from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = ({ toggle, reset, clear, iterationState }) => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div>
                <button className="header-exit" onClick={() => { navigate("/") }} >
                    <KeyboardBackspaceIcon />
                </button>
                <p className="header-game">&nbsp;&nbsp;John Conway's Game Of Life</p>   
            </div>
            <button className="start-free" onClick={toggle}>
                <PlayArrowIcon />{iterationState ? 'Stop' : 'Start'}
            </button>
            <button className="reset-free" onClick={reset}>
                <RestartAltIcon />Reset
            </button>
            <button className="clear-free" onClick={clear}>
                <ClearIcon />Clear
            </button>
        </div>
    )
}

export default Header
