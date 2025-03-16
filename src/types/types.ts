import { ReactNode } from "react"

export type User = {
    firstName: string
    lastName: string
    email: string
    _id: string
}
export type UserInfo = {
    user: User
    token: string
    loggedIn: boolean
}

export type AuthProviderProps = {
    children: ReactNode; // Type for React children
}

// Define action types
export type AuthAction =
    | { type: 'LOGIN'; payload: UserInfo }
    | { type: 'LOGOUT' };

// Define the context value type
export type AuthContextType = {
    state: UserInfo;
    dispatch: React.Dispatch<AuthAction>;
}