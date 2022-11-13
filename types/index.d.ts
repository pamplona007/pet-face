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

export type AuthContextProps = {
    user: User | null;
    error: Error | null;
    logIn: (credentials: LogIn) => void;
    logOut: () => void;
    createUser: (credentials: SignUp) => void;
};
