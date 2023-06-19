import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiShow, BiHide } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import avatarGif from '../asset/login-animation.gif'
import parentLogo from '../asset/parent-logo.png'
import forge from 'node-forge';
import { decryptAES } from '../utility/decryptAES'
import bigInt from "big-integer";


// const SERVER_URL = 'http://localhost:8080'
let isProcess = true

export default function Login() {

    const [showPassword, setShowPassword] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: ""
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

    const handleLogin = () => {
        if (data.email && data.password) {
            if (validateEmailRegex(data.email)) {
                axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}login`, { data })
                    .then((res) => {
                        const { token } = res.data
                        if (token) {
                            toast('Login success.')
                            localStorage.setItem('token', token)
                            setTimeout(() => {
                                window.location.href = '/'
                            }, 1000)
                        }
                        else {
                            toast('Email or password is invalid')
                        }
                    })
            }
            else {
                toast('Invalid email format')
            }
        }
        else {
            toast("Please enter required fields");
        }
    }

    // Phần đăng nhập bằng main website
    const handleMainLogin = () => {

        axios.get('http://localhost:8080/getMainKey')
            .then(res => {
                const mainKey = bigInt(res.data.key)
                const bigPrime = bigInt(res.data.prime)
                const privateKey = bigInt(process.env.REACT_APP_PRIVATE_KEY)

                const sharedKey = mainKey.modPow(privateKey, bigPrime);
                sessionStorage.setItem('sharedKey', sharedKey.value)
            })
            .catch()

        // const width = 500;
        // const height = 600;
        // const left = window.screen.width / 2 - width / 2;
        // const top = window.screen.height / 2 - height / 2;

        // const popup = window.open('http://localhost:3000/auth', 'Login', `width=${width}, height=${height}, left=${left}, top=${top}`);

        const popup = window.open(`http://localhost:3000/auth`, 'Login');
        const timer = setInterval(() => {
            if (popup.closed) {
                clearInterval(timer);
            }
        }, 500);

    };

    // Lắng nghe sự kiện message từ cửa sổ popup
    window.addEventListener('message', (event) => {
        if (event.origin !== `http://localhost:3000`) {
            return;
        }

        if (isProcess) {
            isProcess = false
            // Xử lý token nhận được từ cửa sổ popup
            if (event.data === 'null') {
                toast("Tài khoản chưa đăng kí SmartSec")
            }
            else if (event.data) {
                const sharedKey = sessionStorage.getItem('sharedKey')

                if (sharedKey) {
                    const dataJson = JSON.parse(decryptAES(event.data, sharedKey))
                    const { name, sex, birth, phone, email, signature } = dataJson

                    // Xác thực chữ kí số 
                    const publicKey = forge.pki.publicKeyFromPem(process.env.REACT_APP_PUBLIC_KEY_SIGNATURE);
                    const md2 = forge.md.sha256.create();
                    md2.update(name + sex + birth + phone + email, 'utf8');
                    const verified = publicKey.verify(md2.digest().bytes(), signature);

                    if (verified) {
                        sessionStorage.setItem('user', JSON.stringify(dataJson))
                        toast('Login success.')
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000)
                    }
                    else toast("Xác thực chữ kí không thành công")
                }
            }

            setTimeout(() => {
                isProcess = true
            }, 1000)
        }


    });



    return (
        <div className='p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img className='w-full' src={avatarGif} alt='' />
                </div>

                <div className="w-full py-3 flex flex-col">

                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.email}
                        onChange={handleOnchange}
                    />

                    <label htmlFor="password">Password</label>
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


                    <button onClick={handleLogin} className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Login
                    </button>

                    <div className='h-10 flex bg-slate-200 rounded-md px-4 items-center cursor-pointer mt-4' onClick={handleMainLogin}>
                        <img className='w-9 h-8 rounded-full mr-10' src={parentLogo} alt='' />
                        <span className='h-full leading-10'>Continue with SmartSec</span>
                    </div>

                    <p className="text-left text-sm mt-3">
                        Don't have account ?{" "}
                        <Link to={"/signup"} className="text-red-500 underline">
                            Sign up
                        </Link>
                    </p>


                </div>
            </div>
        </div>

    )
}
