import { format } from 'date-fns';
import Cookies from 'js-cookie';

const COOKIES = {
  TOKEN: 'token',
  EMAIL: 'email',
};

export const userEmail = Cookies.get(COOKIES.EMAIL);
export const token = Cookies.get(COOKIES.TOKEN);

export function getDate(time: string) {
  return format(new Date(time), 'd/M/yy HH:mm');
}

export function jsonData(data: string | object) {
  try {
    if (typeof data === 'string') {
      return JSON.parse(data);
    } else {
      return JSON.stringify(data);
    }
  } catch (e) {
    alert(e);
  }
}

export function saveToken(token: string) {
  Cookies.set(COOKIES.TOKEN, token, { expires: 1 });
}

export function getToken() {
  // if (!token) throw new Error('Вы не авторизованы');
  return Cookies.get(COOKIES.TOKEN);
}
