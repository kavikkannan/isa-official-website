import React, { useState, useEffect } from 'react'

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false) // State to track navbar visibility
    const [prevScrollPos, setPrevScrollPos] = useState(0) // State to track previous scroll position

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset // Get current scroll position

            // If the difference between current scroll position and last scroll position is positive and not at the top of the page, show navbar
            setIsVisible(
                prevScrollPos < currentScrollPos && currentScrollPos > 0,
            )
            setPrevScrollPos(currentScrollPos) // Update previous scroll position
        }

        // Event listener for scroll
        window.addEventListener('scroll', handleScroll)

        return () => {
            // Cleanup by removing event listener when component unmounts
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPos]) // Listen for changes in prevScrollPos

    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            // Update isVisible state based on viewport width
            setIsVisible(!isMobileViewport())
        }

        // Event listener for window resize
        window.addEventListener('resize', handleResize)

        return () => {
            // Cleanup by removing event listener when component unmounts
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const isMobileViewport = () => {
        console.log(window.innerWidth)
        return window.innerWidth <= 768 ? true : false
    }

    return (
        <nav
            style={{
                position: 'fixed',
                top: isVisible ? '0' : '-100px', // Move navbar out of view if not visible
                left: '0',
                width: '100%',
                backgroundColor: '#eeeeee',
                color: 'black',
                padding: '10px 20px', // Adjust padding as needed
                zIndex: '9999', // Ensure the navbar appears above other content
                transition: 'top 0.4s', // Smooth transition for navbar visibility
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div className="hover:-translate-y-1 transform transition duration-200 hover:shadow-xl">
                    <img
                        src={'/images/isapng.png'}
                        alt="Logo"
                        style={{ maxWidth: '80px', height: 'auto' }}
                    />
                    {/* Insert your logo or brand name here */}
                    {/* <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        ISA-VIT
                    </span> */}
                </div>
                <div className="bg-[#18181B] p-2 rounded-lg border-2 border-black/30 hover:-translate-y-1 transform transition duration-200 hover:shadow-xl justify-center">
                    <div className=" justify-center text-4xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.300),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.300),theme(colors.indigo.400))] outline-2 animate-gradient hidden lg:block">
                        International Society of Automation
                    </div>

                    <div className=" justify-center text-4xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.300),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.300),theme(colors.indigo.400))] outline-2 animate-gradient block lg:hidden">
                        ISA
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center">
                    {/* Insert your navigation links/buttons here */}
                    <a
                        href="#"
                        style={{
                            color: 'black',
                            marginRight: '20px',
                            textDecoration: 'none',
                        }}
                    >
                        <button className="px-3 py-2 m-1 rounded-md border border-neutral-300 bg-neutral-100  text-black text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                            Home
                        </button>
                    </a>

                    <a
                        href="#"
                        style={{
                            color: 'black',
                            marginRight: '20px',
                            textDecoration: 'none',
                        }}
                    >
                        
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
