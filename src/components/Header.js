import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../asset/logo.png";
import { toast } from 'react-hot-toast'
import axios from 'axios';

export default function Header() {

    const storageToken = localStorage.getItem('token')
    const tokenRef = useRef(storageToken ?? null);

    const storageUser = JSON.parse(sessionStorage.getItem('user'))
    const [user, setUser] = useState(storageUser ?? null);


    useEffect(() => {
        if (tokenRef.current) {
            axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}user-info`, { headers: { Authorization: `Bearer ${tokenRef.current}` } })
                .then(res => {
                    setUser(res.data.info)
                    sessionStorage.setItem('user', JSON.stringify(res.data.info))
                })
                .catch()
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('user')
        localStorage.removeItem('token')

        toast('Logout successfully.')
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }


    return (
        <header className='fixed shadow-md w-full h-16 lg:px-2 z-50 bg-red-500 md:px-16'>
            <div className='max-w-[1200px] mx-auto h-full'>
                <div className='flex items-center h-full justify-between'>
                    <div className='h-10 flex items-center'>
                        <img className='h-full cursor-pointer' src={logo} alt='' onClick={() => window.location.href = '/'} />
                        {user && <Link to='/information' className='text-lg mr-2 ml-20 text-gray-400 hover:text-white transition duration-300'>Information</Link>}
                        {user && user.email === process.env.REACT_APP_USER_ADMIN && <Link to='/newproduct' className='text-lg mr-2 ml-20 text-gray-400 hover:text-white transition duration-300'>New Product</Link>}

                    </div>


                    <div className='flex gap-8 items-center text-lg relative'>
                        {user && <button className='mr-2 -ml-4 text-gray-400 hover:text-white transition duration-300'>{user.username ? user.username : user.name}</button>}
                        {user && <button className='mr-2 -ml-4 text-gray-400 hover:text-white transition duration-300' onClick={handleLogout}>Logout</button>}
                        {!user && <Link to='/signup' className='mr-2 -ml-4 text-gray-400 hover:text-white transition duration-300'>Sign up</Link>}
                        {!user && <Link to='/login' className='mr-2 -ml-4 text-gray-400 hover:text-white transition duration-300'>Login</Link>}
                    </div>
                </div>
            </div>
        </header>
    )
}
