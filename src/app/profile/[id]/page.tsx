"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }: any) {
  const [userData, setUserData] = useState(null); // Set initial value to null

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/profile');
      setUserData(res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="bg-[#000517] min-h-screen flex flex-col justify-center items-center py-12">
      <h1 className="text-4xl font-bold text-white mb-6">USER PROFILE</h1>
      <div className="bg-[#000520] rounded-lg shadow-md w-full max-w-md overflow-hidden p-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="p-3 text-white font-semibold">Username:</td>
              <td className="p-3 text-white">{userData ? userData.username : "Loading..."}</td>
            </tr>
            <tr>
              <td className="p-3 text-white font-semibold">Email:</td>
              <td className="p-3 text-white">{userData ? userData.email : ""}</td>
            </tr>
            <tr>
              <td className="p-3 text-white font-semibold">User is verified:</td>
              <td className="p-3 text-white">{userData ? (userData.isVerified ? 'Yes' : 'No') : ""}</td>
            </tr>
            <tr>
              <td className="p-3 text-white font-semibold">User is admin:</td>
              <td className="p-3 text-white">{userData ? (userData.isAdmin ? 'Yes' : 'No') : ""}</td>
            </tr>
            <tr>
              <td className="p-3 text-white font-semibold">ID:</td>
              <td className="p-3 text-white">{userData ? userData._id : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
