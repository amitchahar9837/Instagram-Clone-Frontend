import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import summaryApi from '../../API';


const ForgotPassword = () => {
    const [email,setEmail] = useState('');
const navigate = useNavigate();

useEffect(()=>{
  window.scrollTo(0,0)
},[])
    //postData function 
    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email")
          return
        }
        fetch(summaryApi.forgotPassword.url,{
          method:summaryApi.forgotPassword.method,
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            email,
          })
        }).then(res => res.json())
        .then(data => {
            if(data.err){
              toast.error(data.err)
            }else{
                  toast.success(data.msg)
                  navigate('/reset-password',{state:{email}});
            }
        }).catch(err => toast.error(err))
      }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 w-[80%] sm:w-[400px] '>
            <h2 className='text-4xl font-medium'>Instagram</h2>
            <h4 className='text-2xl font-medium'>Reset Password</h4>
            <p className='text-md font-light'>Enter you email to reset password</p>
            <input className='border-2 border-gray-300 py-2 px-4 outline-none w-full focus:border-blue-500 rounded-md' type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <div className='w-full flex justify-between items-center'>
            <Link to={'/signin'} className='px-3 bg-slate-200 text-red-400 py-2 text-md font-medium rounded-md hover:bg-slate-300 duration-300 tracking-wide'>Back</Link>

            <button className='px-3 bg-blue-400 text-white py-2 text-md font-medium rounded-md hover:bg-blue-500 duration-300 tracking-wide' onClick={() => postData()}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword