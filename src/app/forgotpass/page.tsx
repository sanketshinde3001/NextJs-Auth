"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';


export default function VerifyEmailPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email:"",
        password:"",
      });
      
    const [token, setToken] = useState("");
    const [emailupdate, setEmailupdate] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserPassword = async () => {
        try {
            const data = await axios.post('/api/users/forgotpass', {token})
            // console.log(data.data.email)
            setUser({...user, email:data.data.email})
            setVerified(true);
            setEmailupdate(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse);            
        }
    }

    const onupdate = async() => {
        try {
          const response = await axios.post("/api/users/passupdate",user)
          console.log(response.data , "success signup");
          router.push("/login")
        } catch (error:any) {
          console.log("Password Update Failed",error);
          toast.error(error.response.data.message);
        }
      }



    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken);
        setToken(urlToken || "");
       
    }, []);

    


return (
<div className=" flex items-center w-full justify-center min-h-screen bg-[#000517]">
    <div className=" bg-gray-900  px-24 py-10 rounded-lg shadow-2xl shadow-indigo-500/50 ">
        <p className="flex items-center justify-center">
            

        {!verified && error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        )}
        {!verified && !error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
        )}

        {verified && !error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        )}

        
        
        </p>
        
        <div>
        {!emailupdate ?
            (<div><h1 className="text-center text-3xl mt-4 text-white mb-4 font-semibold">Forgot Password</h1></div>):(
                <div><h1 className="text-center text-3xl mt-4 text-white mb-4 font-semibold">Update Password</h1></div>      
            )
        }
        {!emailupdate ?
            (        <div className="text-gray-300 mb-6 text-xl text-center">
            No worries, we've got you covered. To reset your password, click the button below
            </div>):(<div>
                <div className="text-center">Your Email is - </div>
                <div className="text-center">{user.email}</div>
            </div>
                      
            )
        }
        </div>



        <br />
        <div className="flex flex-col items-center">
            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}
            <br />
            {verified ? (
                <div className="mb-6 flex flex-col items-center justify-center">
                        <div className='flex flex-col gap-2 w-full items-center justify-center'>

    <label htmlFor="password" className=' text-zinc-500'>Password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black px-4 py-3 w-48"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
        />
    </div>    


        <button
        onClick={onupdate}
        className="py-3 mb-5 px-5 border bg-[#6788ff] border-black rounded-lg focus:outline-none focus:border-gray-600">Update</button>
        <p>Already have an account ? <Link href="/login" className='text-[#0000EE]'>login</Link></p>
      
                </div>
            ) : (
                <button className=" px-6 py-3 bg-blue-500 rounded-xl text-xl mb-6 border border-slate-300 hover:border-slate-400 " onClick={verifyUserPassword}>Verify</button>
            )}
            <br />
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-600 text-black px-10 py-3 rounded-2xl">The link has either expired or has already been used.</h2>
                </div>
            )}
        </div>
    </div>
</div>

);
};