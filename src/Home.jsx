import React, { useContext, useEffect } from 'react';
import useAuth from './hooks/auth';
import { useNavigate } from 'react-router-dom';
import { userContext } from './contexts/userContext';

function Home(props) {
    const {user} = useAuth()
    const nav = useNavigate()
    const [userDetails, setuserDetails] = useContext(userContext)

    useEffect(()=>{
        nav('/profile/pos-admin/' + userDetails.id)
    })
    return (
        <div>
            home
        </div>
    );
}

export default Home;