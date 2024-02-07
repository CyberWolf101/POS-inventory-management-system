import { createContext, useState } from "react"

export const subContext = createContext()
const SubContextProvider = ({ children }) => {
    const [userSub, setuserSub] = useState(false);
    return (
        <div>
            <subContext.Provider value={[userSub, setuserSub]}>
                {children}
            </subContext.Provider>
        </div>
    );
}

export default SubContextProvider;