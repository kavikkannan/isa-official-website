import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { HoverEffect } from '../ui/CardHoverEffect'
import { BackgroundGradient } from '../ui/Gradient'

const UspComponent = () => {
    return (
        <div>
            <AnimatePresence>
                <motion.div
                    className="flex flex-col justify-center items-center"
                    initial={{ opacity: 0, y: 100, x: 0 }} // Initial animation state
                    animate={{ opacity: 1, y: 0, x: 0 }} // Animation to perform
                    exit={{ opacity: 0, y: -50 }} // Animation when component is removed from the DOM
                    transition={{ delay: 1, duration: 0.6 }} // Transition duration
                >
                    <div className="p-1 relative w-full bg-black/0 mt-20 flex flex-col items-center justify-center overflow-hidden rounded-md transition-all duration-150 ease-in-out ">
                        <div className="w-11/12 lg:w-3/5 flex flex-col items-center justify-center">
                            <BackgroundGradient className="rounded-[22px] w-full p-7 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                                <div className="p-2 w-11/12 lg:w-2/5 border-white bg-[linear-gradient(to_right,theme(colors.indigo.400/50),theme(colors.sky.400/50),theme(colors.fuchsia.400/50))] rounded-lg hover:scale-110 transition-all duration-300 ease-in-out ">
                                    <div className="inline-flex flex-col h-12 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white/60  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  hover:text-white/90 transition-all duration-300 ease-in-out p-3 text-center">
                                        What Sets us Apart !
                                    </div>
                                </div>

                                <div className="max-w-5xl mx-auto px-8">
                                    <HoverEffect items={projects} />
                                </div>
                            </BackgroundGradient>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export const projects = [
    {
        title: 'Global Network',
        description:
            'Join a diverse and dynamic community of professionals, researchers, and industry leaders from every corner of the world. Benefit from cross-cultural collaboration, knowledge exchange, and networking opportunities.',
        link: '#',
    },
    {
        title: 'Cutting-Edge Technology',
        description:
            'Stay ahead of the curve with access to the latest developments in automation, instrumentation, and control systems. Our International Chapter is committed to being a source of knowledge and expertise for all members.',
        link: '#',
    },
    {
        title: 'Professional Development',
        description:
            'Elevate your career with exclusive resources, training programs, and events tailored to enhance your skills and expertise in the field of automation. ISA is your partner in professional growth.',
        link: '#',
    },
]

export default UspComponent
