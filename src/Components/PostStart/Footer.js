import React from 'react'

import './Footer.css'

const Footer = ({start}) => {
     return (
        <div className="footer">
            <button className="start-free" onClick={start}>
                Start
            </button>
        </div>
    )
}

export default Footer
