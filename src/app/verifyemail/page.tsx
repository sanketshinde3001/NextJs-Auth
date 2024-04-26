"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            console.log("just start")
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse);            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken);
        setToken(urlToken || "");
       
    }, []);


return (
<div className=" flex items-center justify-center min-h-screen bg-[#000517]">
    <div className=" bg-gray-900  px-8 py-10 rounded-lg shadow-2xl shadow-indigo-500/50">
        <p className="flex items-center justify-center">
            

        {!verified && error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-x"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/></svg>
        )}
        {!verified && !error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        )}

        {verified && !error && (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
        )}

        
        
        </p>
        <h1 className="text-center text-3xl text-white mb-4 font-semibold">VERIFY EMAIL</h1>
        
        <p className="text-gray-300 mb-6 text-xl text-center">
            To complete your registration, please verify your email by clicking the button below.
        </p>
        <br />
        <div className="flex flex-col items-center">
            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}
            <br />
            {verified ? (
                <div className="mb-6 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-green-400 mb-2">Email Verified</h2>
                    <br />
                    <Link href="/login">
                    <button className=" px-6 py-3 bg-blue-500 rounded-xl text-xl mb-6 border border-slate-300 hover:border-slate-400 ">Login</button>
                    </Link>
                </div>
            ) : (
                <button className=" px-6 py-3 bg-blue-500 rounded-xl text-xl mb-6 border border-slate-300 hover:border-slate-400 " onClick={verifyUserEmail}>Verify Email</button>
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