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
    children: ReactNode; 
}

export type AuthAction =
    | { type: 'LOGIN'; payload: UserInfo }
    | { type: 'LOGOUT' };

export type AuthContextType = {
    state: UserInfo;
    dispatch: React.Dispatch<AuthAction>;
}