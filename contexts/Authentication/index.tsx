import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
    signOut
} from "firebase/auth";
import { AuthContextProps, AuthStorageProps, LogIn, SignUp } from '../../types';
import { app } from '../../services/firebase';

export const AuthenticationContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthenticationStorage: React.FC<AuthStorageProps> = ({ children }) => {
    const auth = useMemo(() => getAuth(app), []);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);

    const logIn = async ({ email, password }: LogIn) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error: any) {
            setError(error);
            throw new Error(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error: any) {
            setError(error);
            throw new Error(error);
        }
    };

    const createUser = async ({ email, password }: SignUp) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error: any) {
            setError(error);
            throw new Error(error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [auth]);

    return (
        <AuthenticationContext.Provider
            value={{
                logOut,
                logIn,
                createUser,
                user,
                error
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationStorage;