import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import { BackgroundGradient } from '../ui/Gradient'
import { Meteors } from '../Meteors'

const AboutUsComponent = () => {
    return (
        <div>
            <AnimatePresence>
                <motion.div
                    className="flex flex-col justify-center items-center"
                    initial={{ opacity: 0, y: 100, x: 0 }} // Initial animation state
                    animate={{ opacity: 1, y: 0, x: 0 }} // Animation to perform
                    exit={{ opacity: 0, y: -50 }} // Animation when component is removed from the DOM
                    transition={{ delay: 0.5, duration: 0.6 }} // Transition duration
                >
                    <div className="p-1 relative w-full bg-black/0  flex flex-col items-center justify-center overflow-hidden rounded-md transition-all duration-150 ease-in-out -mt-20 lg:-mt-10 ">
                        <div className=" w-11/12 lg:w-3/5 flex flex-col items-center justify-center">
                            <BackgroundGradient className="rounded-[22px] w-full p-7 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                                <div className="p-2 w-4/5 lg:w-2/5 border-white bg-[linear-gradient(to_right,theme(colors.indigo.400/50),theme(colors.sky.400/50),theme(colors.fuchsia.400/50))] rounded-lg hover:scale-110 transition-all duration-300 ease-in-out ">
                                    <div className="inline-flex flex-col h-12 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-1 lg:px-6 font-medium text-white/60  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  hover:text-white/90 transition-all duration-300 ease-in-out p-1 lg:p-3">
                                        About Us
                                    </div>
                                </div>

                                <p className="text-lg text-neutral-600 dark:text-neutral-400 p-5 mt-2 text-center">
                                    ISA is a renowned global organization
                                    dedicated to promoting and advancing the
                                    field of automation and control systems.
                                    With a rich history spanning decades, our
                                    International Chapter serves as a vibrant
                                    hub for professionals seeking to stay at the
                                    forefront of technological advancements.
                                </p>
                            </BackgroundGradient>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default AboutUsComponent
