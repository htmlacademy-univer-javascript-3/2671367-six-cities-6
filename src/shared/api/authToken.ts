import Cookies from 'js-cookie';
import { COOKIE_ACCESS_TOKEN_KEY } from '../../consts';

export function getAccessToken() {
  return Cookies.get(COOKIE_ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  Cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken);
}

export function removeAccessToken() {
  Cookies.remove(COOKIE_ACCESS_TOKEN_KEY);
}
