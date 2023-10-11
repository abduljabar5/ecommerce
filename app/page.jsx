'use client';
import React from 'react'
import { ThemeProvider, } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import {
  EyeIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
import Featured from '@components/Featured';
import GetProduct from '@components/GetProduct';
const page = () => {
  return (
    <ThemeProvider>
      <div>
      <div className="relative flex flex-col items-center justify-center h-screen bg-center bg-cover" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/top-view-decorative-halloween-pumpkins_23-2148276194.jpg?w=1800&t=st=1697061021~exp=1697061621~hmac=2eeaa81695b641f7211c6f3c7570408b01a2ea52fe639260bfded608b79e3d9f)` }}>
      <h1 className="text-sm sm:text-sm md:text-lg lg:text-xl font-extrabold mb-auto mt-24">
        Special Offer
      </h1>
      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-500 mb-4" style={{fontFamily: "'Creepster', cursive"}}>
        Happy<br/>Halloween
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-6">
        Up to 70% off sitewide
      </p>
      <button className="py-2 mb-auto px-6 sm:py-3 sm:px-8 md:py-4 md:px-12 lg:py-5 lg:px-16 border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out">
        Shop Now
      </button>
    </div>
        <Featured />
        <div className='lg:m-24 sm:m-6'>
          <h1 className='my-16 mx-auto text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-gray-900'>
            Products
          </h1>
          <GetProduct view='user' />
        </div>
      </div>

    </ThemeProvider>
  )
}

export default page