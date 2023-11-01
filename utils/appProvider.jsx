'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const add2Cart = (number) => setCartItemCount(prev => prev + number);
  const addNotification = (number) => setNotificationCount(prev => prev + number);

  return (
    <AppContext.Provider value={{
      cartItemCount, 
      add2Cart, 
      notificationCount, 
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};
