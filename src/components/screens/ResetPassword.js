import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import summaryApi from '../../API';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';


const ResetPassword = () => {
      const {state} = useLocation();
    const [token,setToken] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);

const navigate = useNavigate();

useEffect(()=>{
  window.scrollTo(0,0)
},[])
    //postData function 
    const postData = ()=>{
        fetch(summaryApi.resetPassword.url,{
          method:summaryApi.resetPassword.method,
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            token,
            password,
          })
        }).then(res => res.json())
        .then(data => {
            if(data.err){
              toast.error(data.err)
            }else{
                  toast.success(data.msg)
                  navigate('/signin');
            }
        }).catch(err => toast.error(err))
      }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 w-[80%] sm:w-[400px] '>
            <h2 className='text-4xl font-medium'>Instagram</h2>
            <h4 className='text-2xl font-medium'>Reset Password</h4>
            <p className='text-md font-light'>Enter your token and password to reset password. we have sent token to your email <span className='font-bold'>{state?.email}</span> <Link to={'/forgot-password'} className='text-red-400'>wrong email?</Link> </p>
            <input className='border-2 border-gray-300 py-2 px-4 outline-none w-full focus:border-blue-500 rounded-md' type="text" placeholder='Token' value={token} onChange={(e)=>setToken(e.target.value)} />

            <div className='relative w-full'>
            <input className='border-2 border-gray-300 py-2 pr-12 px-4 outline-none w-full focus:border-blue-500 rounded-md' type={showPassword ? `text` : 'password'} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />

            {showPassword ? <BiSolidHide className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl cursor-pointer opacity-60 " title='Hide Password' onClick={()=>setShowPassword(prev=>!prev)}/> : <BiSolidShow className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl cursor-pointer opacity-60 " title='Show Password' onClick={()=>setShowPassword(prev=>!prev)}/>}
            </div>
            

            <button className='w-full bg-blue-400 text-white py-2 text-md font-medium rounded-md hover:bg-blue-500 duration-300 tracking-wide' onClick={() => postData()}>Reset Password</button>
        </div>
    </div>
  )
}

export default ResetPassword