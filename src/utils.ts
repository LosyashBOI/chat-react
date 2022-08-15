import { format } from 'date-fns';
import Cookies from 'js-cookie';

const COOKIES = {
  TOKEN: 'token',
  USER: 'user',
};

export const user = Cookies.get(COOKIES.USER);

export function getDate(time: number) {
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
  const token = Cookies.get(COOKIES.TOKEN);

  if (!token) throw new Error('Вы не авторизованы');
  return token;
}
