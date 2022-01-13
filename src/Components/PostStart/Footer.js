import React from 'react'

import './Footer.css'

const Footer = ({ toggle, reset, iterationState }) => {
    return (
        <div className="footer">
            <button className="start-free" onClick={toggle}>
                {iterationState ? 'Stop' : 'Start'}
            </button>
            <button className="clear-free" onClick={reset}>
                Clear
            </button>
        </div>
    )
}

export default Footer
