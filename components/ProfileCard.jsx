'use client';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from './ProfileData';
import { useSession } from "next-auth/react";
import { BsFillCartCheckFill } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'

const ProfileCard = () => {
  const { data: session, status } = useSession();
  const profileData = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData || profileData === undefined) {
      setLoading(false);
    }
  }, [profileData]);

  if (!session && status !== 'loading') {
    return <div>Log in</div>;
  }

  if (loading || status === 'loading') {
    return<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-10 w-3/4">
    <div className="flex justify-center items-center p-6">
        <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>
    </div>
    <div className="py-4 px-6">
        <div className="h-6 w-3/4 bg-gray-200 mb-4 animate-pulse mx-auto"></div>
        <div className="flex items-center mt-4">
            <div className="w-6 h-6 bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex items-center mt-4">
            <div className="w-6 h-6 bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex items-center mt-4">
            <div className="w-6 h-6 bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
        </div>
    </div>
</div>
;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-10 w-3/4">
      <div className="flex justify-center items-center p-6">
        <img className="h-24 w-24 rounded-full" src={session?.user.image} alt={`${session?.user.name}'s profile`} />
      </div>
      <div className="py-4 px-6">
        <h1 className="text-2xl text-center uppercase font-semibold text-gray-800">{session?.user.name}</h1>
        {/* <p className="py-2 text-lg text-gray-700">{data.about}</p> */}
        <div className="flex items-center mt-4 text-gray-700">
          <BsFillCartCheckFill />
          <h1 className="px-2 text-sm">Orders: {profileData === undefined ? 0 : profileData?.length || 0}</h1>
        </div>
        <div className="flex items-center mt-4 text-gray-700">
          <IoLocation />
          <h1 className="px-2 text-sm">Shipping Address: {session?.user.shippingAddress || 'Minneapolis,MN'}</h1>
        </div>
        <div className="flex items-center mt-4 text-gray-700">
          <MdEmail />
          <h1 className="px-2 text-sm">Email: {session?.user.email}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
