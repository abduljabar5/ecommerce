import React, { useEffect } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import CartCard from "@components/CartCard";

export default function DrawerDefault({ closeDrawerRight, openRight }) {

    useEffect(() => {
        // If the drawer is open, disable scrolling on the body
        if (openRight) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        // Cleanup function: Enable scrolling when component is unmounted or when it is closed
        return () => {
          document.body.style.overflow = '';
        };
      }, [openRight]); // Dependency array: Re-run effect when openRight changes

  return (
    <React.Fragment>
    <Drawer
      placement="right"
      open={openRight}
      onClose={closeDrawerRight}
      className={openRight ? 'p-4 mx-4 my-4 rounded-xl' : 'p-4 my-4 rounded-xl'}
      size='450px'
    >
      <div className="mb-6 flex items-center justify-between">
          <h1 className='text-2xl font-bold'> Shopping Cart</h1>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawerRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
        <CartCard />

    </Drawer> 
  </React.Fragment>
  
  );
}
