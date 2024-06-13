import React from 'react'
import { IoClose } from 'react-icons/io5'

const ShowDp = ({
      dpUrl,
      onClose,
}) => {
  return (
      <div className="fixed top-0 left-0 bottom-0 z-[100] right-0 bg-slate-200 bg-opacity-70 flex justify-center items-center">
      <div className="relative bg-white p-5">
      <div className='flex justify-center items-center p-4 w-full max-w-md  h-[60vh] '>
        <img src={dpUrl} alt="" className='w-full h-full object-scale-down' />
      </div>
      <button className="hover:text-red-500 text-3xl absolute top-2 right-2 " onClick={onClose}>
        <IoClose />
      </button>
      </div>
    </div>
  )
}

export default ShowDp