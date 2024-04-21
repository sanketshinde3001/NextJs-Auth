"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/profile')
        console.log(res.data);
        setData(res.data.data.username)
    }

    return (
        <div className="bg-[#000517] text-white min-h-screen flex flex-col items-center justify-center">
            <div className="bg-[#111827] p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <hr className="border-gray-600 mb-4" />
                <p className="text-lg mb-6">Welcome to your profile page. <br />Click User Details Button. <br /> Then Click on your Name for info.</p>
                <div className="flex items-center justify-center">
                    <h2 className="py-3 px-6 rounded bg-green-500 text-lg">
                        {data === 'nothing' ? "" : <Link href={`/profile/${data}`} className="text-white">{data}</Link>}
                    </h2>
                </div>
                <hr className="border-gray-600 mt-6 mb-4" />
                <button
                    onClick={logout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
                >
                    Logout
                </button>

                <button
                    onClick={getUserDetails}
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    User Details
                </button>
            </div>
        </div>
    );
}