'use client'

import React, { useEffect, useState } from 'react'
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


export default function SignupPage  () {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user)
      console.log(response.data , "success signup");
      router.push("/seemail")
    } catch (error:any) {
      console.log("Signup Failed",error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    console.log(loading)
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user]);
  return (


    <div className='flex justify-center max-lg:flex-col items-center w-full bg-[#000517]' >
      <div className='w-1/2 '>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
      src="/logo.png"
      width={170}
      height={170}
      alt="LOGO"
      className='mb-10'
    />
    <h1 className='text-4xl mb-4 nunito font-bold'>{loading ? "WAIT.." : "SIGNUP"}</h1>
    <hr />
    <div className='flex flex-col gap-2 w-full max-sm:w-full max-md:w-full max-lg:w-4/6 lg:w-1/2 2xl:w-1/3 '>
    <label htmlFor="username" className=' text-zinc-500'>Username</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black px-4 py-3"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Username"
        />
    <label htmlFor="email" className=' text-zinc-500'>Email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black px-4 py-3"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="Email"
        />
    <label htmlFor="password" className=' text-zinc-500'>Password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black px-4 py-3"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
        />
    </div>    


        <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="py-3 mb-5 px-5 border bg-[#6788ff] border-black rounded-lg focus:outline-none focus:border-gray-600">{buttonDisabled ? "Sign up" : "Sign up"}</button>
        <p>Already have an account ? <Link href="/login" className='text-[#0000EE]'>login</Link></p>
        
    </div>
      </div>
      <div className='lg:w-1/2 max-lg:w-full p-5 bg-[#131e44] h-screen flex flex-col justify-center items-center '>
        <div>
        <h1 className='lg:text-7xl md:text-7xl max-md:text-5xl font-bold font-mono mb-10 nunito '>Join Our Community</h1>
        <p className='text-xl nunito w-full text-left'>Be inspired by Created by designer around the global</p>
      </div>
      </div>
    </div>

  )
}



