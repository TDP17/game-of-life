import React from 'react'

import './Footer.css'

const Footer = ({ toggle, reset, clear, iterationState }) => {
    return (
        <div className="footer">
            <button className="start-free" onClick={toggle}>
                {iterationState ? 'Stop' : 'Start'}
            </button>
            <button className="reset-free" onClick={reset}>
                Reset
            </button>
            <button className="clear-free" onClick={clear}>
                Clear
            </button>
        </div>
    )
}

export default Footer
