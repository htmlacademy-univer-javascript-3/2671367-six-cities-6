import { useSelector } from 'react-redux';
import { getAuthError, getUserAuthData } from '..';

export function useAuthError() {
  return useSelector(getAuthError);
}
export function useUserAuthData() {
  return useSelector(getUserAuthData);
}
