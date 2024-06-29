import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
import TTecnical from '@/assests/thank.json'

const ThankYouPage = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 4000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg mb-8">Let's make a good team.</p>
            <div className="w-64 h-64">
                <Lottie animationData={TTecnical} loop={false} />
            </div>
        </div>
    )
}

export default ThankYouPage
