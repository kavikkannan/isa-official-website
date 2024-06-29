import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
const Commonheader = () => {
    const router = useRouter()
    const home = () => {
        router.push('/')
    }

    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
        exit: {
            y: -100,
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeIn' },
        },
    }

    return (
        <AnimatePresence className="overflow-hidden overscroll-x-none">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={headerVariants}
            >
                <header className="relative  w-full bg-white text-blue-800 p-4 flex items-center justify-between z-100">
                    <div className="flex items-center">
                        <img
                            src="/images/isa_logo.jpg"
                            alt="Logo"
                            className="h-12 w-12 mr-2 cursor-pointer"
                            onClick={home}
                        />
                    </div>
                    <div className=" text-xl sm:text-lg font-extrabold">
                        International Society of Automation
                    </div>
                    <div>
                        <div className="flex items-center">
                            <img
                                src="/images/vitlogomain.jpeg"
                                alt="Logo"
                                className="h-14 w-11 mr-2"
                            />
                        </div>
                    </div>
                </header>
            </motion.div>
        </AnimatePresence>
    )
}

export default Commonheader
