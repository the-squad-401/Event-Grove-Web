import { useContext } from 'react';
import LoginContext from './login-context';

export default function useAuth() {
  return useContext(LoginContext);
}