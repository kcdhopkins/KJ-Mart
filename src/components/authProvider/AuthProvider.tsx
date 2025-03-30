import { useEffect } from 'react';
import { AuthAction, AuthProviderProps, UserInfo } from '../../types/types';
import { AuthContext, initialValue } from './authContext';
import { useReducer } from 'react';
import { callAutoAuth } from '../../api/AccountService/account';

const authReducer = (state: UserInfo, action: AuthAction): UserInfo => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          _id: "",
        },
        token: "",
        loggedIn: false
      }
    default:
      return state;
  }
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialValue);

  const autoAuth = async () => {
    const userInfo = await callAutoAuth()

    if (userInfo.message === 'Login Success') {
      delete userInfo.message
      dispatch({ type: 'LOGIN', payload: userInfo })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      autoAuth()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};