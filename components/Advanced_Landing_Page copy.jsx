import React, { useState } from 'react'
import Lottie from 'lottie-react'
import robo_animation from '@/assests/robo_animation.json'
import { useRouter } from 'next/navigation'
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import userData from '@/assests/rereg_std_fata.json'
import Loading from './Loading'
import { LampContainer } from './ui/Lamp'
import { WavyBackground } from './ui/Waves'
import { AnimatePresence, motion } from 'framer-motion'
import SparklesCore from './ui/Sparkles'
import { Meteors } from './Meteors'
import { BackgroundGradient } from './ui/Gradient'

const LandingPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isUnderlined, setUnderlined] = useState(false)

    const handleUnderlineDraw = () => {
        setUnderlined(true)
    }

    const handleUnderlineErase = () => {
        setUnderlined(false)
    }

    const handleSignIn = () => {
        setLoading(true)
        signInWithPopup(auth, provider)
            .then((data) => {
                const signedInEmail = data.user.email
                sessionStorage.setItem('email', signedInEmail)
                sessionStorage.setItem('emailstatus', true)
                const userDataWithEmail = userData.users.find(
                    (user) => user.EmailId === signedInEmail,
                )
                if (userDataWithEmail) {
                    router.push('/Domain_Selection')
                } else {
                    sessionStorage.setItem('email', null)
                    sessionStorage.setItem('emailstatus', false)
                    setLoading(false)
                    setErrorMessage(
                        'The Email-ID you tried to login with is not associated with this Chapter !',
                    )
                }
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error signing in:', error.message)
            })
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
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
                                    <div className="w-full absolute inset-0 h-screen">
                                        <SparklesCore
                                            id="tsparticlesfullpage"
                                            background="transparent"
                                            minSize={0.3}
                                            maxSize={0.9}
                                            particleDensity={15}
                                            className="w-full h-full opacity-20"
                                            particleColor="#FFFFFF"
                                        />
                                    </div>
                                    <div className="text-center text-3xl lg:text-7xl font-black-ops font-extrabold pb-1 lg:pb-7 transition-all duration-350 ease-in-out hover:scale-110">
                                        International Society <br /> of
                                        Automation
                                    </div>
                                    <div className="text-sm lg:text-lg pb-10 text-white/70 transition-all font-black-ops duration-150 ease-in-out hover:scale-110 hover:text-white/90 ">
                                        Unlock the Power of Automation Worldwide
                                    </div>
                                    <div
                                        className={`min-h-[3px] bg-white/70 transition-all duration-100 ${
                                            isUnderlined ? 'w-full' : 'w-0'
                                        }`}
                                    ></div>
                                </motion.div>
                                <motion.div
                                    className="flex flex-col justify-center items-center"
                                    initial={{ opacity: 0, y: 100, x: 0 }} // Initial animation state
                                    animate={{ opacity: 1, y: 0, x: 0 }} // Animation to perform
                                    exit={{ opacity: 0, y: -50 }} // Animation when component is removed from the DOM
                                    transition={{ delay: 0.5, duration: 0.6 }} // Transition duration
                                >
                                    <div className="p-10 relative w-full bg-black/0  flex flex-col items-center justify-center overflow-hidden rounded-md transition-all duration-150 ease-in-out ">
                                        <div className="w-3/5 mt-10 flex flex-col items-center justify-center">
                                            <BackgroundGradient className="rounded-[22px] w-full p-1 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
                                                <div className="p-2 w-2/5 border-white bg-[linear-gradient(to_right,theme(colors.indigo.400/50),theme(colors.sky.400/50),theme(colors.fuchsia.400/50))] rounded-lg hover:scale-110 transition-all duration-300 ease-in-out ">
                                                    <div className="inline-flex flex-col h-12 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white/60  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  hover:text-white/90 transition-all duration-300 ease-in-out p-3">
                                                        About Us
                                                    </div>
                                                </div>

                                                <p className="text-md text-neutral-600 dark:text-neutral-400 p-4 text-center">
                                                    ISA is a renowned global
                                                    organization dedicated to
                                                    promoting and advancing the
                                                    field of automation and
                                                    control systems. With a rich
                                                    history spanning decades,
                                                    our International Chapter
                                                    serves as a vibrant hub for
                                                    professionals seeking to
                                                    stay at the forefront of
                                                    technological advancements.
                                                </p>
                                            </BackgroundGradient>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </AnimatePresence>
                    </WavyBackground>
                </div>

                // <div className="w-full bg-gray-800 text-white min-h-screen flex flex-col sm:flex-row  items-center justify-evenly">
                //     <div className="absolute  z-[-1] sm:relative sm:z-0 w-full max-w-2xl mb-8">
                //         <Lottie animationData={robo_animation} />
                //     </div>
                //     <div className="  max-w-md bg-transparent bg-gray-900 p-8 shadow-md rounded-md ">
                //         <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">
                //             Welcome to ISA International Chaptesas r
                //         </h1>

                //         <p className="text-lg text-gray-400 mb-8 text-center">
                //             Unlock the Power of Automation Worldwide
                //         </p>

                //         <div className="mb-8">
                //             <h2 className="text-xl font-bold mb-4 text-blue-500">
                //                 About Us
                //             </h2>
                //             <p className="text-gray-400 text-center">
                //                 ISA is a renowned global organization dedicated
                //                 to promoting and advancing the field of
                //                 automation and control systems. With a rich
                //                 history spanning decades, our International
                //                 Chapter serves as a vibrant hub for
                //                 professionals seeking to stay at the forefront
                //                 of technological advancements.
                //             </p>
                //         </div>

                //         <div className="mb-8">
                //             <h2 className="text-xl font-bold mb-4 text-blue-500">
                //                 What Sets Us Apart
                //             </h2>
                //             <ul className="list-disc pl-6  text-gray-400">
                //                 <li>
                //                     <strong className=" font-extrabold text-blue-200 font">
                //                         Global Network:
                //                     </strong>{' '}
                //                     Join a diverse and dynamic community of
                //                     professionals, researchers, and industry
                //                     leaders from every corner of the world.
                //                     Benefit from cross-cultural collaboration,
                //                     knowledge exchange, and networking
                //                     opportunities.
                //                 </li>
                //                 <li>
                //                     <strong className=" font-extrabold text-blue-200 font">
                //                         Cutting-Edge Technology:
                //                     </strong>{' '}
                //                     Stay ahead of the curve with access to the
                //                     latest developments in automation,
                //                     instrumentation, and control systems. Our
                //                     International Chapter is committed to being
                //                     a source of knowledge and expertise for all
                //                     members.
                //                 </li>
                //                 <li>
                //                     <strong className=" font-extrabold text-blue-200 font">
                //                         Professional Development:
                //                     </strong>{' '}
                //                     Elevate your career with exclusive
                //                     resources, training programs, and events
                //                     tailored to enhance your skills and
                //                     expertise in the field of automation. ISA is
                //                     your partner in professional growth.
                //                 </li>
                //             </ul>
                //         </div>

                //         {/* Button Components */}
                //         <div className="text-center flex-col flex items-center justify-center">
                //             {/* <button className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"></button> */}
                //             <div className="p-2 border-white bg-[linear-gradient(to_right,theme(colors.indigo.400/50),theme(colors.sky.400/50),theme(colors.fuchsia.400/50))] rounded-lg hover:scale-110 transition-all duration-300 ease-in-out ">
                //                 <button
                //                     onClick={handleSignIn}
                //                     onMouseEnter={handleUnderlineDraw}
                //                     onMouseLeave={handleUnderlineErase}
                //                     className="inline-flex flex-col h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white/60  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  hover:text-white/90 transition-all duration-300 ease-in-out"
                //                 >
                //                     Sign In with VIT Email !
                //                     <div
                //                         className={`min-h-[0.7px] bg-white/70 transition-all duration-100 ${
                //                             isUnderlined ? 'w-full' : 'w-0'
                //                         }`}
                //                     ></div>
                //                 </button>
                //             </div>

                //             {errorMessage && (
                //                 <p className="text-red-500 mt-2">
                //                     {errorMessage}
                //                 </p>
                //             )}
                //         </div>
                //     </div>
                // </div>
            )}
        </>
    )
}

export default LandingPage
