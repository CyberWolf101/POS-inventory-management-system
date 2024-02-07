import React, { useState } from 'react';
import { createContext } from 'react';
import useAuth from '../hooks/auth';

export const userContext = createContext()


function UserContextProvider({ children }) {
    // const { user } = useAuth()
    // const { user: value } = useAuth()
    const [userDetails, setuserDetails] = useState({})


    return (
        <userContext.Provider value={[userDetails, setuserDetails]} >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;