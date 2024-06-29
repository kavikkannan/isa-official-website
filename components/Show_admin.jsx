import React, { useState, useEffect } from 'react';
import { ref, get, query, orderByKey, update } from 'firebase/database';
import { db } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import adminData from '@/assests/admin_email.json'; 
import Loading from '@/components/Loading'; 

const UserDomainTable = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
        const checkAdminEmail = async () => {
            const signedInEmail = sessionStorage.getItem('email');
            const isAdmin = adminData.users.some((user) => user.EmailId === signedInEmail);

            if (!isAdmin) {
                router.push('/unauthorized');
            } else {
                setLoading(false);
            }
        };

        checkAdminEmail();
    }, [router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersSnapshot = await get(query(ref(db, 'UserNew'), orderByKey()));
    
                if (usersSnapshot.exists()) {
                    const usersData = [];
                    usersSnapshot.forEach((snapshot) => {
                        const userData = snapshot.val();
                        const username = snapshot.key;
                        const userDataWithDateTime = {};
                        Object.keys(userData).forEach((domain) => {
                            const subdomain = userData[domain];
                            const domainData = { subdomain };
                            if (subdomain.dateTime) {
                                domainData.dateTime = subdomain.dateTime.timeAndDate;
                            }
                            userDataWithDateTime[domain] = domainData;
                        });
                        usersData.push({ username, domains: userDataWithDateTime });
                    });
                    setUsers(usersData);
                    setFilteredUsers(usersData);
                } else {
                    console.log('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, [filteredUsers]); // Trigger fetch data when filteredUsers state changes
    
    const handleUpdateDateTime = async (username, domain) => {
        const dateTime = prompt('Enter time and date (DD-MM HH:MM):');
        if (dateTime) {
            const userRef = ref(db, `UserNew/${username}/${domain}/dateTime`);
            await update(userRef, { timeAndDate: dateTime });
            // Refresh table data by updating filteredUsers state
            setFilteredUsers([]); // Clear filteredUsers state
        }
    };
    
    

    useEffect(() => {
        const filteredResults = users.filter((user) => {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filteredResults);
    }, [searchTerm, users]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    
    const hasDomain = (user, domain) => {
        return Object.keys(user.domains).includes(domain);
    };

  


    
    const formatUsername = (username) => {
        return username.replace('9999', ' ').trim(); 
    };

    return (
        <div>
            {isLoading ? ( 
                <Loading />
            ) : (
                <div>
                    <div className='flex justify-center pt-2 pb-2 rounded-3xl text-black'>
                        <input 
                            className=''
                            type="text"
                            placeholder="Search by username"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <table className='w-full' style={{ borderSpacing: '10px' }}>
                        <thead>
                        <tr>
                        <th style={{ borderSpacing: '10px', border: '2px solid green' }}>Username</th>
                        <th style={{ borderSpacing: '10px', border: '2px solid green' }}>Technical</th>
                        <th style={{ borderSpacing: '10px', border: '2px solid green' }}>Management</th>
                        <th style={{ borderSpacing: '10px', border: '2px solid green' }}>Design</th>
                    </tr>
                        </thead>
                        <tbody className=' '>
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className=' '>
                                    <td className='pl-3' style={{ borderSpacing: '10px', border: '2px solid green' }}>{user.username}</td>

                                    <td style={{ borderSpacing: '10px', border: '2px solid green' }}>
                                        <center>
                                            {hasDomain(user, 'technical') ? (
                                                <React.Fragment>
                                                    <button onClick={() => handleUpdateDateTime(user.username, 'technical')}>
                                                        {user.domains.technical.dateTime ? "" : "Set Time & Date"}
                                                    </button>
                                                    {user.domains.technical && user.domains.technical.dateTime ? (
                                                        <span>
                                                            {user.domains.technical.dateTime}{' '}
                                                            <button onClick={() => handleUpdateDateTime(user.username, 'technical')}>
                                                                Edit
                                                            </button>
                                                        </span>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </React.Fragment>
                                            ) : (
                                                <span>Not registered</span>
                                            )}
                                        </center>
                                    </td> 

                                    <td style={{ borderSpacing: '10px', border: '2px solid green' }}>
                                        <center>
                                            {hasDomain(user, 'management') ? (
                                                <React.Fragment>
                                                    <button onClick={() => handleUpdateDateTime(user.username, 'management')}>
                                                        {user.domains.management.dateTime ? "" : "Set Time & Date"}
                                                    </button>
                                                    {user.domains.management && user.domains.management.dateTime ? (
                                                        <span>
                                                            {user.domains.management.dateTime}{' '}
                                                            <button onClick={() => handleUpdateDateTime(user.username, 'management')}>
                                                                Edit
                                                            </button>
                                                        </span>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </React.Fragment>
                                            ) : (
                                                <span>Not registered</span>
                                            )}
                                        </center>
                                    </td>

                                    <td style={{ borderSpacing: '10px', border: '2px solid green' }}>
                                        <center>
                                            {hasDomain(user, 'design') ? (
                                                <React.Fragment>
                                                    <button onClick={() => handleUpdateDateTime(user.username, 'design')}>
                                                        {user.domains.design.dateTime ? "" : "Set Time & Date"}
                                                    </button>
                                                    {user.domains.design && user.domains.design.dateTime ? (
                                                        <span>
                                                            {user.domains.design.dateTime}{' '}
                                                            <button onClick={() => handleUpdateDateTime(user.username, 'design')}>
                                                                Edit
                                                            </button>
                                                        </span>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </React.Fragment>
                                            ) : (
                                                <span>Not registered</span>
                                            )}
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserDomainTable;
