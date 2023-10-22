'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { deleteFromCart, getCartItems, updateCartItem } from '@utils/idb';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import Loading from './Loading';
// Load Stripe outside of the component to avoid loading it on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC_KEY);

const Checkout = () => {
    const { data: userSession, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const handleCheckout = async () => {
        setIsLoading(true);
        
        try {
            const email = userSession?.user?.email
        console.log("🚀 ~ file: Checkout.jsx:18 ~ handleCheckout ~ email:", email)
            const items = await getCartItems();
            const stripe = await stripePromise;
            if (!stripe) throw new Error("Stripe has not loaded properly.");
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, email }),
            });

            if (response.ok) {
                const session = await response.json();
                const result = await stripe.redirectToCheckout({ sessionId: session.id });
                setIsLoading(false);
                if (result.error) throw new Error(result.error.message);
            } else {
                throw new Error("Response not OK");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
        }
    };
    return (
        <>
            {status === 'loading' ? <div>Loading</div> :
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                    onClick={() => { status === 'authenticated' ? handleCheckout() : toast( <div className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto mt-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Access Restricted</h2>
                        <p className="text-gray-600 mt-2">Please login to continue.</p>
                      </div>
                      <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.61 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <button className="bg-blue-600 text-white mt-4 p-2 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                      Login
                    </button>
                  </div>, { duration: 5000 }) }}
                >
                    {isLoading ? 'Loading' : 'Checkout'}

                </button>}</>
    );
};

export default Checkout;
