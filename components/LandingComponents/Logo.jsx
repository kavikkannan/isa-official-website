import React from 'react'
import logo from '@/public/images/isapng.png' // Assuming you have a logo image file

const Logo = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                padding: '10px',
                zIndex: '9999', // Ensure the logo appears above other content
                background: 'white', // Adjust background color as needed
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
            }}
        >
            <img
                src={logo}
                alt="Logo"
                style={{ maxWidth: '120px', height: 'auto' }}
            />
        </div>
    )
}

export default Logo
