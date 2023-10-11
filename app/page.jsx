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
const theme = {
  drawer: {
    defaultProps: {
      size: 300,
      overlay: true,
      placement: "left",
      overlayProps: undefined,
      className: "",
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    styles: {
      base: {
        drawer: {
          position: "fixed",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-white",
          boxSizing: "box-border",
          width: "w-full",
          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "fixed",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
};
const page = () => {
  return (
    <ThemeProvider value={theme}>
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