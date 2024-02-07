import React, { useContext, useEffect } from 'react';
import { userContext } from '../contexts/userContext';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/auth';
import LoadingPage from '../components/partials/Loading';
import { UseGetData } from '../hooks/UsePosAdmin';

function RootLayout(props) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const { user, loadingUser } = useAuth()

    useEffect(() => {
        setuserDetails(user)
        console.log('dets', userDetails)
    }, [user])
    const { Loading} = UseGetData()
    if (loadingUser || Loading) return <LoadingPage />
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default RootLayout;