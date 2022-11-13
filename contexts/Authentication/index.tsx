import React, { createContext, useCallback, useEffect, useState } from 'react';

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
    signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, firestore } from '../../services/firebase';
import { AuthContextProps, AuthStorageProps, LogIn, SignUp, UserContext, UserProfile } from '../../types';

export const AuthenticationContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthenticationStorage: React.FC<AuthStorageProps> = ({ children }) => {
    const [user, setUser] = useState<UserContext | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkUserProfile: (user: User, profile?: Partial<UserProfile>) => Promise<UserProfile | undefined> = async (user, profile) => {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, profile || {});
            return profile;
        }

        return userDoc.data() as UserProfile;
    };

    const updateCurrentUser: (user: User, profile?: Partial<UserProfile>) => Promise<UserContext> = useCallback(async (user, profile) => {
        const currentProfile = await checkUserProfile(user, profile);

        const newUser = {
            user,
            profile: currentProfile,
        };

        setUser(newUser);

        return newUser;
    }, []);

    const logIn = async ({ email, password }: LogIn) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return await updateCurrentUser(userCredential.user);
        } catch (error: unknown) {
            setError(error);
            throw new Error();
        } finally {
            setIsLoading(false);
        }
    };

    const logOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error: unknown) {
            setError(error);
            throw new Error();
        } finally {
            setIsLoading(false);
        }
    };

    const createUser = async ({ email, password }: SignUp, profile?: Partial<UserProfile>) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return await updateCurrentUser(userCredential.user, profile);
        } catch (error: unknown) {
            setError(error);
            throw new Error();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasInitialized(true);

            if (user) {
                void updateCurrentUser(user);
            } else {
                setUser(null);
            }
        });
    }, [updateCurrentUser]);

    return (
        <AuthenticationContext.Provider
            value={{
                logOut,
                logIn,
                createUser,
                user,
                error,
                hasInitialized,
                isLoading,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationStorage;
