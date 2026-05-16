import React, { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [headerData, setHeaderData] = useState({
        title: "Dashboard",
        description: "Welcome back!",
        actions: null
    });

    return (
        <HeaderContext.Provider value={{ headerData, setHeaderData }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
};
