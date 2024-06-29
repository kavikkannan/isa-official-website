'use client'

import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import Link from 'next/link'
import MManagement from '@/assests/management.json'
import TTecnical from '@/assests/technical_anime.json'
import DDesign from '@/assests/desing_anime.json'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ref, set, get, remove } from 'firebase/database'
import { db } from '@/firebaseConfig'
import { useRouter } from 'next/navigation'
import userData from '@/assests/rereg_std_fata.json'
import Loading from './Loading'

const Selection = () => {
    const router = useRouter()
    const [management, setManagement] = useState(false)
    const [technical, setTechnical] = useState(false)
    const [design, setDesign] = useState(false)
    const [selectedDomain, setSelectedDomain] = useState(null)
    const [nextClicked, setNextClicked] = useState(false)
    const [selectionDisabled, setSelectionDisabled] = useState(false)
    const [regno, setRegno] = useState('')
    const [stdname, setStdName] = useState('')
    const [email, setEmail1] = useState('')
    const [email1, setEmail2] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const e = sessionStorage.getItem('email')
                setEmail2(e)
                if (!sessionStorage.getItem('emailstatus')) {
                    router.push('/')
                }
                if (userData && userData.users) {
                    const userDataWithEmail = userData.users.find(
                        (user) => user.EmailId === e,
                    )
                    if (userDataWithEmail) {
                        const registerNumber = userDataWithEmail.RegisterNumber
                        const studentName = userDataWithEmail.StudentName
                        setStdName(studentName)

                        const ff = studentName + '9999' + registerNumber
                        setEmail1(ff)
                    } else {
                        console.log(
                            'Register number not found for the provided email.',
                        )
                    }
                } else {
                    console.log(
                        'userData is undefined or does not contain the expected structure.',
                    )
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchData()
    }, [])

    const [domain1, setDomain1] = useState('')
    const [domain2, setDomain2] = useState('')
    const [subDomain1, setSubDomain1] = useState('')
    const [subDomain2, setSubDomain2] = useState('')

    const submit = async () => {
        setLoading(true)
        const userSnapshot = await get(ref(db, `UserNew/${email}`))

        if (userSnapshot) {
            await remove(ref(db, `UserNew/${email}`))
        }

        const domainRef1 = ref(db, `UserNew/${email}/${domain1}`)
        await set(domainRef1, {
            Subdomain1: subDomain1,
        })
        const domainRef2 = ref(db, `UserNew/${email}/${domain2}`)
        await set(domainRef2, {
            Subdomain2: subDomain2,
        })

        router.push('/thank')
    }

    const trigger = (category) => {
        if (!selectionDisabled) {
            let selectedSubDomain
            if (category === 'M') {
                if (management) {
                    setManagement(false)
                    setSelectedDomain(null)
                } else {
                    setManagement(true)
                    setTechnical(false)
                    setDesign(false)
                    setSelectedDomain('management')
                }
            } else if (category === 'T') {
                if (technical) {
                    setTechnical(false)
                    setSelectedDomain(null)
                } else {
                    setTechnical(true)
                    setManagement(false)
                    setDesign(false)
                    setSelectedDomain('technical')
                }
            } else if (category === 'D') {
                if (design) {
                    setDesign(false)
                    setSelectedDomain(null)
                } else {
                    setDesign(true)
                    setManagement(false)
                    setTechnical(false)
                    setSelectedDomain('design')
                }
            }
        }
    }

    const handleNext = () => {
        setNextClicked(true)
        setSelectionDisabled(true)
    }

    const Reset = () => {
        setSubDomain1('')
        setSubDomain2('')
        setCon1(false)
        setCon2(false)
    }
    const back = () => {
        setSubDomain1('')
        setSubDomain2('')
        setCon1(false)
        setCon2(false)
        setDomain1('')
        setDomain2('')
        setManagement(false)
        setTechnical(false)
        setDesign(false)
        setNextClicked(!nextClicked)
        setSelectionDisabled(false)
    }
    const [subCon1, setCon1] = useState(false)
    const [subCon2, setCon2] = useState(false)
    const handleOptionClick = (domain, option) => {
        if (domain == domain1) {
            setCon1(true)
            setSubDomain1((prevSubDomain) =>
                prevSubDomain ? prevSubDomain + ' ' + option : option,
            )
        } else if (domain == domain2) {
            setCon2(true)
            setSubDomain2((prevSubDomain) =>
                prevSubDomain ? prevSubDomain + ' ' + option : option,
            )
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full bg-black text-white h-fit sm:h-[100vh] ">
                    <section id="sec1" className=" flex flex-col gap-5 h-[80%]">
                        <div className="flex justify-center p-5 ">
                            <h1 className=" items-end">HI {stdname}</h1>
                        </div>
                        <div className="text-blue-400  h-fit w-full flex justify-center ">
                            <TypeAnimation
                                className="flex  justify-center font-mono font-medium text-1xl sm:text-2xl"
                                sequence={[
                                    'Welcome  to our community,',
                                    1000,
                                    `Welcome to our community,\nWe are happy to introduce our domains !`,
                                    1000,
                                ]}
                                speed={75}
                                style={{
                                    display: 'flex',
                                    whiteSpace: 'pre-line',
                                    textAlign: 'center',
                                }}
                                repeat={null}
                                cursor={false}
                            />
                        </div>
                        <div className="flex   justify-center items-center  h-fit sm:items-center sm:h-[70%]">
                            <div className="relative  flex flex-col  items-center w-[80%] h-fit gap-10 sm:flex-row sm:items-center sm:h-full sm:justify-evenly ">
                            <motion.button
                                    animate={{ y: 0 }}
                                    initial={{ y: 1200 }}
                                    onClick={() => trigger('M')}
                                    className={
                                        management
                                            ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[50%]'
                                            : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[50%]'
                                    }
                                >
                                    <h1 className={nextClicked ? '' : ''}>
                                        Management
                                    </h1>
                                    <Lottie
                                        animationData={MManagement}
                                        className={
                                            nextClicked ? 'h-[50%] ' : 'h-[70%]'
                                        }
                                    />
                                </motion.button>

                                <motion.button
                                    animate={{ y: 0 }}
                                    initial={{ y: 1200 }}
                                    onClick={() => trigger('T')}
                                    className={
                                        technical
                                            ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl  sm:h-[50%]'
                                            : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[50%]'
                                    }
                                >
                                    <h1 className={nextClicked ? '' : ''}>
                                        Technical
                                    </h1>
                                    <Lottie
                                        animationData={TTecnical}
                                        className={
                                            nextClicked ? 'h-[50%] ' : 'h-[70%]'
                                        }
                                    />
                                </motion.button>

                                <motion.button
                                    animate={{ x: 0 }}
                                    initial={{ x: 800 }}
                                    onClick={() => trigger('D')}
                                    className={
                                        design
                                            ? 'bg-green-300 font-bold text-black text-xl h-fit w-1/2 z-10 shadow-green-400 shadow-md transform rotate-y-6 transition-all duration-500 rounded-3xl sm:h-[50%]'
                                            : 'bg-gray-300 font-bold text-black text-xl h-fit w-1/2 z-0 transform rotate-y-3 transition-all duration-500 rounded-xl sm:w-1/4 sm:h-[50%]'
                                    }
                                >
                                    <h1>Design</h1>
                                    <Lottie
                                        animationData={DDesign}
                                        className={
                                            nextClicked ? 'h-[50%]' : 'h-[70%]'
                                        }
                                    />
                                </motion.button>
                            </div>
                        </div>

                    </section>
                    <section className='bg-black h-fit pb-'>
                    <div className="flex justify-center w-full mt-5">
                            {selectedDomain === 'management' && (
                                <div className="bg-gray-800 p-5 rounded-lg text-white w-[80%]">
                                    <h2 className="text-xl font-bold">Management</h2>
                                    <p>
                                        Management domain covers areas such as project management, team leadership, strategic planning, and organizational behavior. It focuses on developing skills to manage teams and projects efficiently.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos vel mollitia sunt impedit omnis sequi quo consequatur placeat quia quam necessitatibus porro dolor, illum voluptatum excepturi deleniti laudantium iste!
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores laborum, quasi maxime laudantium repellat deleniti enim magnam ipsa a omnis incidunt expedita reiciendis. Repellendus, cumque dignissimos dicta beatae est non?
                                        Management domain covers areas such as project management, team leadership, strategic planning, and organizational behavior. It focuses on developing skills to manage teams and projects efficiently.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos vel mollitia sunt impedit omnis sequi quo consequatur placeat quia quam necessitatibus porro dolor, illum voluptatum excepturi deleniti laudantium iste!
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores laborum, quasi maxime laudantium repellat deleniti enim magnam ipsa a omnis incidunt expedita reiciendis. Repellendus, cumque dignissimos dicta beatae est non?
                                        Management domain covers areas such as project management, team leadership, strategic planning, and organizational behavior. It focuses on developing skills to manage teams and projects efficiently.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos vel mollitia sunt impedit omnis sequi quo consequatur placeat quia quam necessitatibus porro dolor, illum voluptatum excepturi deleniti laudantium iste!
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores laborum, quasi maxime laudantium repellat deleniti enim magnam ipsa a omnis incidunt expedita reiciendis. Repellendus, cumque dignissimos dicta beatae est non?
                                        Management domain covers areas such as project management, team leadership, strategic planning, and organizational behavior. It focuses on developing skills to manage teams and projects efficiently.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos vel mollitia sunt impedit omnis sequi quo consequatur placeat quia quam necessitatibus porro dolor, illum voluptatum excepturi deleniti laudantium iste!
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores laborum, quasi maxime laudantium repellat deleniti enim magnam ipsa a omnis incidunt expedita reiciendis. Repellendus, cumque dignissimos dicta beatae est non?
                                        Management domain covers areas such as project management, team leadership, strategic planning, and organizational behavior. It focuses on developing skills to manage teams and projects efficiently.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos vel mollitia sunt impedit omnis sequi quo consequatur placeat quia quam necessitatibus porro dolor, illum voluptatum excepturi deleniti laudantium iste!
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores laborum, quasi maxime laudantium repellat deleniti enim magnam ipsa a omnis incidunt expedita reiciendis. Repellendus, cumque dignissimos dicta beatae est non?
                                   
                                    </p>
                                </div>
                            )}
                            {selectedDomain === 'technical' && (
                                <div className="bg-gray-800 p-5 rounded-lg text-white w-[80%]">
                                    <h2 className="text-xl font-bold">Technical</h2>
                                    <p>
                                        Technical domain includes areas such as software development, system administration, networking, and cybersecurity. It aims to equip individuals with the skills needed to work with technology and solve technical problems.
                                    </p>
                                </div>
                            )}
                            {selectedDomain === 'design' && (
                                <div className="bg-gray-800 p-5 rounded-lg text-white w-[80%]">
                                    <h2 className="text-xl font-bold">Design</h2>
                                    <p>
                                        Design domain focuses on visual design, user experience (UX), and user interface (UI) design. It involves creating visually appealing and functional designs for websites, applications, and other digital products.
                                    </p>
                                </div>
                            )}
                        </div>
              
                    </section>
                </div>
            )}
        </>
    )
}

export default Selection
