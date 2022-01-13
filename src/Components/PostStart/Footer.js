import React from 'react'

import './Footer.css'

const Footer = ({ start, reset }) => {
    return (
        <div className="footer">
            <button className="start-free" onClick={start}>
                Start
            </button>
            {/* <button className="stop-free" onClick={stop}> */}
                {/* Stop */}
            {/* </button> */}
            <button className="clear-free" onClick={reset}>
                Clear
            </button>
        </div>
    )
}

export default Footer
