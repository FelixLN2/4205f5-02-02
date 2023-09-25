import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  typeCompte: null,
  login: () => {},
  logout: () => {}
});