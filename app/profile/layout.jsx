import ProfileCard from '@components/ProfileCard';
import ProfileData from '@components/ProfileData';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className='flex justify-between'>
            <ProfileData>
                <div className='w-3/5'>{children}</div>
                <div className='w-2/5'>
                    <ProfileCard />
                </div>
            </ProfileData>
        </div>
    );
};

export default Layout;
