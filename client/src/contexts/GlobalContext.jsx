import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()
export const GlobalProvider = ({children}) => {
    const [light, setLight] = useState(true)
    const toggleTheme = () => {
        setLight(!light)
        console.log(light)
    }
    return (
        <GlobalContext.Provider value={{light, toggleTheme}}>
            {children}
        </GlobalContext.Provider>
    )
    
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}