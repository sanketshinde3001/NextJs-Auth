'use client'

import React, { useEffect, useState } from 'react'
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


export default function LoginPage  () {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user)
      console.log(response.data , "success login");
      router.push("/profile")
    } catch (error:any) {
      console.log("Login Failed",error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && !loading){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user, loading]);
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
    <h1 className='text-4xl mb-4 nunito font-bold'>{loading ? "WAIT.." : "Login"}</h1>
    <hr />
    <div className='flex flex-col gap-2 w-full max-sm:w-full max-md:w-full max-lg:w-4/6 lg:w-1/2 2xl:w-1/3 '>
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
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="py-3 mb-5 px-5 border bg-[#6788ff] border-black rounded-lg focus:outline-none focus:border-gray-600">{buttonDisabled ? "Login" : "Login"}</button>
        <p>Create new account ? <Link href="/signup" className='text-[#0000EE]'>Signup</Link></p>
        
    </div>
      </div>
      <div className='lg:w-1/2 max-lg:w-full p-5 bg-[#131e44] h-screen flex flex-col justify-center items-center '>
        <div className='w-2/3'>
        <h1 className='lg:text-7xl md:text-7xl max-md:text-5xl font-bold font-mono mb-10 nunito '>Welcome Back ..</h1>
        <p className='text-xl nunito w-full text-left'>Log in to your account to continue accessing our community and be inspired by designers around the globe.</p>
      </div>
      </div>
    </div>

  )
}



