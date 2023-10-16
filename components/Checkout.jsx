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
                    onClick={() => { status === 'authenticated' ? handleCheckout() : toast('Login') }}
                >
                    {isLoading ? 'Loading' : 'Checkout'}

                </button>}</>
    );
};

export default Checkout;
