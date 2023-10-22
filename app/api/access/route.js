
import React from 'react';
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
    return true;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      window.location.href = '/';
      return null;
    }
    return <div>Error: {error.message}</div>;
  }
}
