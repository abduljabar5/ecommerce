'use client';
import React from 'react'
import { ThemeProvider, } from "@material-tailwind/react";
import GetProduct from '@components/GetProduct';
import Hero from '@components/Hero';
const page = () => {
  return (
    <ThemeProvider>
      <div>
      <Hero/>
    </div>
    <div>
        {/* <Featured /> */}
        <div className='lg:m-24 sm:m-6'>
          <h1 className='my-12 mx-auto text-4xl md:text-5xl lg:text-4xl tracking-wide font-semibold text-gray-900'>
            Products
          </h1>
          <GetProduct view='user' />
        </div>
      </div>

    </ThemeProvider>
  )
}

export default page