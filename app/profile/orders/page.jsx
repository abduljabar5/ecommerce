'use client';
import React, { useState, useEffect, useContext } from 'react';
import { ProfileContext } from '@components/ProfileData';

const OrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 mb-4 shadow-sm rounded-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-bold">Order ID: {order._id}</div>
        <div className="text-gray-800">{isOpen ? 'Hide Details' : 'View Details'}</div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <div className="font-bold mb-2">Items:</div>
          <ul className="list-disc ml-4">
            {order.Data.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
                <div className="text-sm text-gray-600">{item.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const page = () => {
  const [loading, setLoading] = useState(true);
  const profileData = useContext(ProfileContext);

  useEffect(() => {
    console.log("🚀 ~ file: page.jsx:6 ~ page ~ profileData:", profileData);
    if (profileData) {
      setLoading(false);
    }
  }, [profileData]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        [...profileData].reverse().map(order => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default page;
