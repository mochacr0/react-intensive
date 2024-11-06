import { createContext, ReactNode, useContext, useState } from "react";

type CurrentUser = {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

type UserContextType = {
    currentUser: CurrentUser | null;
    setCurrentUser: (user: CurrentUser | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

function getCurrentUserFromStorage(): CurrentUser | null {
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
        return null;
    }
    return JSON.parse(userString);
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(getCurrentUserFromStorage());

    const updateCurrentUser = (user: CurrentUser | null) => {
        setCurrentUser(user);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("currentUser");
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser: updateCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const userCurrentUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error("userCurrentUser must be used within a UserProvider");
    }
    return context;
};
