'use client';
import React from 'react'
import { ThemeProvider,} from "@material-tailwind/react";
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