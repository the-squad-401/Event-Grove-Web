import { useContext } from 'react';
import LoginContext from './context';

export default function useAuth() {
  return useContext(LoginContext);
}