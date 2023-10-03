'use client';
import { redirect } from 'next/navigation'
import AdminSideNav from '@components/AdminSideNav';
import { useSession } from 'next-auth/react';

const Layout = ({ children }) => {
//   const { data: session } = useSession();

//   // Redirect if the user does not exist or is not an admin
//   if (!session || session.user.role !== "Admin") {
//     redirect('/');
//   }

  return (
    <div className='flex'>
      <AdminSideNav />
      {children}
    </div>
  );
}

export default Layout;

