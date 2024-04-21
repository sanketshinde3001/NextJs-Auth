import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-[#000517]">
    <div className="bg-gray-900 shadow-2xl shadow-indigo-500/50 px-8 py-6 rounded-lg  w-4/5 sm:w-3/4 md:w-2/3 lg:w-[40%]">
        <div className="flex flex-col items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
        <br />
            <h1 className="text-2xl sm:text-3xl text-white text-center font-semibold ">Check Your Email</h1>
        </div>

        <p className="text-gray-300 mb-6 text-center text-lg">
            Please check your email inbox for a verification link. 
            <br />Click on the link to verify your email and complete the signup process.
        </p>
        <br />
        <div className='flex items-center justify-center'>
        <Link href="/">
                    <button className=" px-6 py-3 bg-blue-500 rounded-xl text-xl mb-6 border border-slate-300 hover:border-slate-400 ">Home</button>
        </Link>
        </div>

    </div>
</div>


  )
}

export default page
