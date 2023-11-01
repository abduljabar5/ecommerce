'use client';
import React, { createContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export const ProfileContext = createContext();

const ProfileData = ({ children }) => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState(undefined);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const id = await session?.user?.id;
        if (id) {
          const response = await fetch(`/api/order/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();

  }, [session?.user]);

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileData;
