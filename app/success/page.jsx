'use client';
import {useEffect, useRef, useState} from 'react'
import {getCartItems, clearCartItems} from '@utils/idb'
const page = () => {
    const [loading, setLoading] = useState(true);
    const handleData = async () => {
        try {
            const Data = await getCartItems();
            
            const response = await fetch('/api/order/new',{
                method: 'POST',
                body: JSON.stringify({
                    Data
                })
            })
            if (response.ok){
                await clearCartItems();
            }
            setLoading(false);
        } catch (error){
        console.log(error);
    }
    } 
    const didRun = useRef(true); 

    useEffect(() => {
      if (didRun.current) {
        handleData(); 
        didRun.current = false;
      }
    }, []);
    
    
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center">
            <svg className="w-16 h-16 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Payment Successful!</h2>
        <p className="text-center text-gray-600 mb-4">Thank you for your purchase. Your transaction has been completed successfully.</p>
        <div className="mx-auto mt-6">
            {loading ? <div>Loading...</div> : <a href="/" className="text-blue-500 hover:underline">Return to Homepage</a>}
            
        </div>
    </div>
</div>
  )
}

export default page