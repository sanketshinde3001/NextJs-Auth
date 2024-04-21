import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
      {/* Left Column */}
      <div className="lg:w-1/2 lg:pr-4 flex items-center flex-col gap-10 justify-center mb-8 lg:mb-0">
        <div className="text-center lg:text-center w-full">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg lg:text-xl w-full">Created by Sanket Shinde</p>
        </div>
        <div>
        <Link href="https://www.linkedin.com/in/sanketshinde04/" rel="noopener noreferrer" target="_blank" className='bg-sky-500 px-5 py-2 rounded-xl mb-4 lg:mb-0 lg:mr-4'> Linkedin </Link>
        <Link href="https://twitter.com/sanketshinde04" rel="noopener noreferrer" target="_blank" className='bg-red-500 px-5 py-2 rounded-xl mb-4 lg:mb-0 lg:mr-4'> Twitter </Link>
        <Link href="https://github.com/sanketshinde3001" rel="noopener noreferrer" target="_blank" className='bg-orange-500 px-5 py-2 rounded-xl mb-4 lg:mb-0 lg:mr-4'> Github </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:w-1/2 lg:pl-4 flex justify-center lg:justify-end">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
          {token ? (
            <Link href="/profile"><span className="bg-purple-500 px-5 py-2 rounded-xl mb-4 lg:mb-0 lg:mr-4">Profile</span></Link>
          ) : (
            <>
              <Link href="/signup"><span className="bg-purple-500 px-5 py-2 rounded-xl mb-4 lg:mb-0 lg:mr-4">Signup</span></Link>
              <Link href="/login"><span className="bg-purple-500 px-5 py-2 rounded-xl">Login</span></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
