
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
    name: string;
    email: string;
}

interface UserContextType {
    user: UserProfile | null;
    isLoggedIn: boolean;
    login: (name: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('user_profile');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Failed to load user profile', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (name: string, email: string) => {
        const profile = { name, email };
        try {
            await AsyncStorage.setItem('user_profile', JSON.stringify(profile));
            setUser(profile);
        } catch (error) {
            console.error('Failed to save user profile', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user_profile');
            setUser(null);
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <UserContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            logout,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
