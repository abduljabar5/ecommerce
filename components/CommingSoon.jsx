'use client';
import { useState } from 'react';
import { toast } from 'sonner';
const Page = () => {
    const [Value, setValue] = useState('')
    const handleClick = () => {
        toast(`Thank you ${Value.split('@')[0]}, you will me notified when page is ready!`)
        setValue('')
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
                <p className="text-gray-700 mb-4">We are working hard to bring you something amazing. Stay tuned!</p>
                <input
                    type="email"
                    placeholder="Enter your email to get notified"
                    className="border border-gray-300 p-2 rounded-lg w-2/3 mx-auto mb-4 block"
                    value={Value}
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <button className="bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-700"
                    onClick={() => { handleClick() }}>
                    Notify Me
                </button>
            </div>
        </div>
    );
};

export default Page;
