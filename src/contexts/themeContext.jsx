import { createContext, useState } from "react"

export const viewContext = createContext()
const ThemeContextProvider = ({ children }) => {
    const [gridView, setgridView] = useState(false);
    return (
        <div>
            <viewContext.Provider value={[gridView, setgridView]}>
                {children}
            </viewContext.Provider>
        </div>
    );
}

export default ThemeContextProvider;