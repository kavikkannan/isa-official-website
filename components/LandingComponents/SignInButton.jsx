import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider } from '@/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import userData from '@/assests/rereg_std_fata.json';
import adminData from '@/assests/admin_email.json';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';

const SignInButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUnderlined, setUnderlined] = useState(false);

    const handleUnderlineDraw = () => {
        setUnderlined(true);
    };

    const handleUnderlineErase = () => {
        setUnderlined(false);
    };

    const handleSignIn = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((data) => {
                const signedInEmail = data.user.email;
                sessionStorage.setItem('email', signedInEmail);
                sessionStorage.setItem('emailstatus', true);
                const isAdmin = adminData.users.some((user) => user.EmailId === signedInEmail);
                if (isAdmin) {
                    router.push('/show_admin');
                } else {
                    // Check if the signed-in email is in the user data file
                    const userDataWithEmail = userData.users.find((user) => user.EmailId === signedInEmail);
                    if (userDataWithEmail) {
                        router.push('/show_mem');
                    } else {
                        // If the user email is not found, set error message
                        setLoading(false);
                        setErrorMessage('The Email-ID you tried to login with is not associated with this Chapter!');
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error signing in:', error.message);
            });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100, x: 0 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: 2, duration: 0.6 }}
            >
                <div className="flex items-center justify-center m-10 p-10">
                    <div className="p-2 border-white w-11/12 lg:w-3/5 bg-[linear-gradient(to_right,theme(colors.indigo.400/50),theme(colors.sky.400/50),theme(colors.fuchsia.400/50))] rounded-lg hover:scale-110 transition-all duration-300 ease-in-out ">
                        <button
                            onClick={handleSignIn}
                            onMouseEnter={handleUnderlineDraw}
                            onMouseLeave={handleUnderlineErase}
                            className="inline-flex flex-col h-16 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white/60  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  hover:text-white/90 transition-all duration-300 ease-in-out"
                        >
                            Sign In with VIT Email !
                            <div
                                className={`min-h-[0.7px] bg-white/70 transition-all duration-300 ${
                                    isUnderlined ? 'w-3/12' : 'w-0'
                                }`}
                            ></div>
                        </button>
                    </div>

                    {loading && <Loading />}

                    {errorMessage && (
                        <p className="text-red-500 mt-2">{errorMessage}</p>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignInButton;
