import { createContext, useContext } from "react";
import { AuthContextType, UserInfo } from "../../types/types";

export const initialValue: UserInfo = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    street: "",
    city: "",
    state: "",
    zip: "",
    _id: "",
  },
  token: "",
  loggedIn: false
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};