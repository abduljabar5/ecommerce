
import React from 'react';
import AdminSideNav from '@components/AdminSideNav';
import { getSession } from 'next-auth/react';


async function checkUserAuthorization() {
  const { data: session } = getSession();
  
  if (!session || !session.user.role === "Admin") {
    throw new Error('Unauthorized');
  }
  return session;
}

export default async function AdminPage() {
  try {
    const user = await checkUserAuthorization();
    // ... your logic here
    return true;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      window.location.href = '/';
      return null;
    }
    // handle other errors if necessary
    return <div>Error: {error.message}</div>;
  }
}
