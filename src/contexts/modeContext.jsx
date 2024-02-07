import React, { useState } from 'react';
import { createContext } from 'react';

export const modelContext = createContext()


function ModelContextProvider({ children }) {
    const [modelFile, setModelFile] = useState({})


    return (
        <modelContext.Provider value={[modelFile, setModelFile]} >
            {children}
        </modelContext.Provider>
    );
}

export default ModelContextProvider;