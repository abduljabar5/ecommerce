'use client';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from "next-auth/react";
function SignUpForm() {
  const { data: session } = useSession();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <p className='text-2xl mb-6'>Register</p>
                {/* Continue with Google Button */}
                <button className="bg-white ring-1 w-full py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 mb-4 flex items-center justify-center"
                onClick={() => signIn('google')}
                >
                    <FcGoogle className="mr-2" /> Continue with Google
                </button>


                {/* Divider */}
                <hr className="mb-4" />

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="John" className="mt-1 p-2 w-full border rounded-md" value={formData.firstName} onChange={handleChange} />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Doe" className="mt-1 p-2 w-full border rounded-md" value={formData.lastName} onChange={handleChange} />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" id="email" name="email" placeholder="johndoe@example.com" className="mt-1 p-2 w-full border rounded-md" value={formData.email} onChange={handleChange} />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password" id="password" name="password" placeholder="********" className="mt-1 p-2 w-full border rounded-md" value={formData.password} onChange={handleChange} />
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" checked={formData.rememberMe} onChange={handleChange} />
                        <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-gray-500 text-white w-full py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
