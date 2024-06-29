import React, { useState } from 'react'

import { WavyBackground } from '../ui/Waves'
import { AnimatePresence, motion } from 'framer-motion'
import SparklesCore from '../ui/Sparkles'

const TitleComponent = () => {
    return (
        <div className="-mt-[25%] lg:-mt-[5%]">
            <WavyBackground
                className="flex justify-center items-center"
                waveWidth={30}
            >
                <AnimatePresence>
                    <div className="flex flex-col">
                        <motion.div
                            className="flex flex-col justify-center items-center "
                            initial={{ opacity: 0, y: -50 }} // Initial animation state
                            animate={{ opacity: 1, y: 0 }} // Animation to perform
                            exit={{ opacity: 0, y: 50 }} // Animation when component is removed from the DOM
                            transition={{ duration: 0.5 }} // Transition duration
                        >
                            <div className="w-screen absolute inset-0 h-screen"></div>
                            <div className="text-center text-3xl lg:text-7xl font-black-ops font-extrabold pb-1 lg:pb-7 transition-all duration-350 ease-in-out hover:scale-110">
                                International Society <br /> of Automation
                            </div>
                            <div className="text-sm lg:text-lg text-white/70 transition-all font-black-ops duration-150 ease-in-out hover:scale-110 hover:text-white/90 ">
                                Unlock the Power of Automation Worldwide
                            </div>
                            <div
                                className={`min-h-[3px] bg-white/70 transition-all duration-100 
                                }`}
                            ></div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </WavyBackground>
        </div>
    )
}

export default TitleComponent
