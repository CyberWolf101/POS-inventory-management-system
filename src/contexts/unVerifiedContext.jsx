import React, { useState } from 'react';
import { createContext } from 'react';

export const unVerifiedContext = createContext()


function UnverifiedContextProvider({ children }) {
    const [unVerifiedShops, setUnverifiedShops] = useState([])


    return (
        <unVerifiedContext.Provider value={[unVerifiedShops, setUnverifiedShops]} >
            {children}
        </unVerifiedContext.Provider>
    );
}

export default UnverifiedContextProvider;