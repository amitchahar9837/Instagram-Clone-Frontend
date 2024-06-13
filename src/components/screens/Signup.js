import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import summaryApi from '../../API';
import { IoCameraOutline } from "react-icons/io5";
const fileSize = 2_000_000;
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dpPublicId,setDpPublicId] = useState('opjujso3dr4bn0w9mo82');
    const navigate = useNavigate();
    const [url, setUrl] = useState(undefined);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
      
    const uploadDp = (image) => {
        if(image.size <= fileSize){
            uploadDpCloudinary(image);
        }else{
            toast.error("file size less than 2mb");
        }
    }
    const uploadDpCloudinary = (image)=>{
        toast.info("Uploading DP it may take time depend on your internet and size")
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Insta Clone");
        data.append("cloud_name", "ascoder");
        fetch(summaryApi.uploadPhoto.url, {
            method: summaryApi.uploadPhoto.method,
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
                setDpPublicId(data.public_id);
                console.log(data.public_id);
            })
            .catch((err) => {
                toast.error(err);
            });
    }
    const signupData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            toast.error("Invalid email")
            return
        }
        fetch(summaryApi.signup.url, {
            method: summaryApi.signup.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                dp: url,
                dpPublicId
            })
        }).then(res => res.json())
            .then(data => {
                if (data.err) {
                    toast.error(data.err)
                } else {
                    toast.success(data.msg)
                    navigate('/signin');

                }
            }).catch(err => console.log(err))
    }
    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="flex flex-col items-center gap-4 w-[80%] sm:w-[400px] ">
                <h2 className='text-4xl font-medium'>Instagram</h2>
                <div className='flex justify-center items-center'>
                    <div className='w-[90px] h-[90px] relative'>
                        <img src={url ? url : 'https://res.cloudinary.com/ascoder/image/upload/v1711302086/opjujso3dr4bn0w9mo82.png'} alt="" className='w-full h-full object-cover rounded-full' />
                        <div className='absolute bottom-0 right-0'>
                            <label className=''>
                                <IoCameraOutline className="text-3xl font-bold bg-white rounded-full cursor-pointer p-1" />
                                <input type="file" className="hidden" onChange={(e) => uploadDp(e.target.files[0])} />
                            </label>
                        </div>
                    </div>
                </div>
                <input className='border-2 border-gray-300 py-2 px-4 outline-none w-full focus:border-blue-500 rounded-md' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />

                <input className='border-2 border-gray-300 py-2 px-4 outline-none w-full focus:border-blue-500 rounded-md' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='relative w-full'>
                    <input className='border-2 border-gray-300 py-2 pr-12 px-4 outline-none w-full focus:border-blue-500 rounded-md' type={showPassword ? `text` : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    {showPassword ? <BiSolidHide className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl cursor-pointer opacity-60 " title='Hide Password' onClick={() => setShowPassword(prev => !prev)} /> : <BiSolidShow className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl cursor-pointer opacity-60 " title='Show Password' onClick={() => setShowPassword(prev => !prev)} />}
                </div>
                <button className='w-full bg-blue-400 py-2 text-md font-medium rounded-sm hover:bg-blue-500 duration-300 tracking-wide' onClick={() => signupData()}>Signup</button>

                <h5>Already have an account? <Link to={'/signin'} className='text-blue-500 hover:underline'>Sign In</Link></h5>
            </div>
        </div>
    )
}

export default Signup