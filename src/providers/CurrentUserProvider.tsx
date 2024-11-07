import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CurrentUser = {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

type CurrentUserContextType = {
    currentUser: CurrentUser | null;
    setCurrentUser: (user: CurrentUser | null) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(getCurrentUserFromStorage());
    const contextValue = useMemo(() => ({ currentUser, setCurrentUser: updateCurrentUser }), [currentUser]);

    function updateCurrentUser(user: CurrentUser | null) {
        setCurrentUser(user);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("currentUser");
        }
    }

    return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};

export const useCurrentUserContext = (): CurrentUserContextType => {
    const context = useContext(CurrentUserContext);
    if (context === null) {
        throw new Error("userCurrentUser must be used within a UserProvider");
    }
    return context;
};

function getCurrentUserFromStorage(): CurrentUser | null {
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
        return null;
    }
    return JSON.parse(userString);
}
