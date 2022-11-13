import { User } from 'firebase/auth';

export {};

declare global {
  interface Window {
    PasswordCredential?: FunctionConstructor<{
        id: string;
        password: string;
    }>;
  }
}

export type AuthStorageProps = {
    children: React.ReactNode;
}

export type LogIn = {
    email: string;
    password: string;
}

export type SignUp = {
    email: string;
    password: string;
    name: string;
}

export type UserContext = {
    user: User | null;
    profile: UserProfile | undefined;
}

export type AuthContextProps = {
    user: UserContext | null;
    error: unknown | null;
    logIn: (user: LogIn) => Promise<UserContext>
    logOut: () => Promise<void>;
    createUser: (user: SignUp, profile?: UserProfile) => Promise<UserContext>;
    hasInitialized: boolean;
    isLoading: boolean;
};

export type UserProfile = {
    name?: string;
    nickname?: string;
    avatar?: string;
}
