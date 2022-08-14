import { jsonData } from './utils';

const URL = {
  USER: 'https://mighty-cove-31255.herokuapp.com/api/user',
  CHANGE_NAME: 'https://mighty-cove-31255.herokuapp.com/api/user/me',
  MESSAGES: 'https://mighty-cove-31255.herokuapp.com/api/messages',
};

const HEADERS = {
  JSON: 'application/json;charset=utf-8',
  AUTHORIZATION: (token: string) => `Bearer ${token}`,
};

async function codeRequest(email: string) {
  const jsonEmail = jsonData({ email });

  const response = await fetch(URL.USER, {
    method: 'POST',
    headers: {
      'Content-Type': HEADERS.JSON,
    },
    body: jsonEmail,
  });

  if (!response.ok) {
    throw new Error('Невалидный email'); // ошибка может прилететь от json
  }
}

async function changeUsername(name: string, token: string) {
  const jsonName = jsonData({ name });

  const response = await fetch(URL.USER, {
    method: 'POST',
    headers: {
      'Content-Type': HEADERS.JSON,
      Authorization: HEADERS.AUTHORIZATION(token),
    },
    body: jsonName,
  });

  if (!response.ok) {
    throw new Error('Не удалось поменять никнейм'); // ошибка может прилететь от json
  }
}

async function getUsername(token: string) {
  return await fetch(URL.CHANGE_NAME, {
    headers: {
      Authorization: HEADERS.AUTHORIZATION(token),
    },
  });
}

export { changeUsername, codeRequest, getUsername };
