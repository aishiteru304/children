import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { BiShow, BiHide } from 'react-icons/bi'
import { toast } from 'react-hot-toast';
import avatarGif from '../asset/login-animation.gif'



export default function Signup() {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });



    const handleOnchange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const validateEmailRegex = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = () => {
        if (data.name && data.email && data.password && data.confirmPassword) {
            if (validateEmailRegex(data.email)) {
                if (data.password === data.confirmPassword) {
                    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}signup`, { data })
                        .then((res) => {
                            if (res.data.message === 'success') {
                                toast("Sign-up successful")
                                setTimeout(() => {
                                    navigate('/login')
                                }, 1000)
                            }
                            else {
                                toast('Email is already register')
                            }
                        })
                        .catch(() => toast("Please try signup again"))

                }
                else {
                    toast("Password and confirm password not equal")
                }

            }
            else {
                toast('Invalid email format')
            }
        }
        else {
            toast("Please enter required fields");
        }
    }

    return (
        <div className='p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img className='w-full' src={avatarGif} alt='' />
                </div>

                <div className="w-full py-3 flex flex-col">
                    <label htmlFor="firstName" className='text-start'>Name</label>
                    <input
                        type={"text"}
                        id="nname"
                        name="name"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.firstName}
                        onChange={handleOnchange}
                    />

                    <label htmlFor="email" className='text-start'>Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.email}
                        onChange={handleOnchange}
                    />

                    <label htmlFor="password" className='text-start'>Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className=" w-full bg-slate-200 border-none outline-none "
                            value={data.password}
                            onChange={handleOnchange}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <label htmlFor="confirmpassword" className='text-start'>Confirm Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmpassword"
                            name="confirmPassword"
                            className=" w-full bg-slate-200 border-none outline-none "
                            value={data.confirmPassword}
                            onChange={handleOnchange}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button onClick={handleSignup} className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Sign up
                    </button>

                    <p className="text-left text-sm mt-3">
                        Already have account ?{" "}
                        <Link to={"/login"} className="text-red-500 underline">
                            Login
                        </Link>
                    </p>


                </div>
            </div>
        </div>
    )
}
