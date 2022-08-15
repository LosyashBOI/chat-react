import { jsonData } from './utils';

const URL = {
  USER: 'https://mighty-cove-31255.herokuapp.com/api/user',
  GET_USER_DATA: 'https://mighty-cove-31255.herokuapp.com/api/user/me',
  MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages',
};

const HEADERS = {
  JSON: 'application/json;charset=utf-8',
  AUTHORIZATION: (token: string) => `Bearer ${token}`,
};

async function codeRequest(email: string) {
  if (!email.trim()) throw new Error('Введите email');

  const jsonEmail = jsonData({ email });

  const response = await fetch(URL.USER, {
    method: 'POST',
    headers: {
      'Content-Type': HEADERS.JSON,
    },
    body: jsonEmail,
  });

  if (!response.ok) {
    throw new Error('Невалидный email');
  }
}

async function changeUsername(name: string, token: string) {
  if (!name.trim()) throw new Error('Введите имя');

  const jsonName = jsonData({ name });

  const response = await fetch(URL.USER, {
    method: 'PATCH',
    headers: {
      'Content-Type': HEADERS.JSON,
      Authorization: HEADERS.AUTHORIZATION(token),
    },
    body: jsonName,
  });

  if (!response.ok) {
    throw new Error('Не удалось поменять никнейм');
  }
}

async function getUserData(token: string) {
  if (!token.trim()) throw new Error('Введите код');

  const response = await fetch(URL.GET_USER_DATA, {
    headers: {
      Authorization: HEADERS.AUTHORIZATION(token),
    },
  });

  if (!response.ok) throw new Error('Не удалось получить данные');

  return await response.json();
}

export { changeUsername, codeRequest, getUserData };
