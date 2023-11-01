'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminSideNav from '@components/AdminSideNav';
import { useRouter } from 'next/navigation';
import { Spinner } from "@material-tailwind/react";
import { toast } from 'sonner';

const Layout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log(status === "unauthenticated");            
        if (status === 'unauthenticated' || (status === 'authenticated' && session.user.role !== "admin")) {
            router.push('/?message=notAdmin'); 
            toast('DONT DO THAT!, You are not Adim');
        } 
    }, [session, status]);
    if (status === 'loading') {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner className="h-16 w-16 text-gray-900/50" />
            </div>
        );
    }
    return (
        <div className='flex'>
            <AdminSideNav />
            {children}
        </div>
    );
}

export default Layout;
