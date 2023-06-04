import React, { useRef, useState } from 'react'
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { BsCloudUpload } from 'react-icons/bs'
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function NewProduct() {

    const storageUser = JSON.parse(sessionStorage.getItem('user'))
    const userRef = useRef(storageUser)


    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])

        setData((prev) => {
            return {
                ...prev,
                image: data
            }
        })
    }

    const handleSave = () => {
        if (data.category && data.image && data.name && data.price) {
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}uploadProduct`, { data })
                .then(res => {
                    toast(res.data.message)
                    setData({
                        name: "",
                        category: "",
                        image: "",
                        price: "",
                    })
                })
                .catch(() => toast("Please try upload again"))
        }
        else toast("Please enter required fields");

    }

    return (
        <div>
            {
                userRef.current.email === process.env.REACT_APP_USER_ADMIN &&
                <div className="p-4">
                    <div className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white'>
                        <label htmlFor='name'>Name</label>
                        <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

                        <label htmlFor='category'>Category</label>
                        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
                            <option value={"other"}>select category</option>
                            <option value={"fruits"}>Fruits</option>
                            <option value={"vegetable"}>Vegetable</option>
                            <option value={"icream"}>Icream</option>
                            <option value={"dosa"}>Dosa</option>
                            <option value={"pizza"}>Pizza</option>
                            <option value={"rice"}>rice</option>
                            <option value={"cake"}>Cake</option>
                            <option value={"burger"}>Burger</option>
                            <option value={"panner"}>Panner</option>
                            <option value={"sandwich"}>Sandwich</option>
                        </select>

                        <label htmlFor='image'>Image
                            <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
                                {
                                    data.image ? <img src={data.image} className="h-full" alt='' /> : <span className='text-5xl'><BsCloudUpload /></span>
                                }


                                <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
                            </div>
                        </label>


                        <label htmlFor='price' className='my-1'>Price</label>
                        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />


                        <button onClick={handleSave} className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
                    </div>
                </div>
            }

        </div>
    )
}
