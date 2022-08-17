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

async function changeUsername(name: string, token: string | undefined) {
  if (!name.trim()) {
    throw new Error('Введите имя');
  } else if (!token) {
    throw new Error('Вы не авторизованы');
  }

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

  if (!response.ok) throw new Error('Не удалось получить данные пользователя');

  return await response.json();
}

export interface message {
  createdAt: string;
  text: string;
  user: {
    name: string;
    email: string;
  };
  _id: string;
}

async function getMessageHistory() {
  const response = await fetch(URL.MESSAGES);

  if (!response.ok) throw new Error('Не удалось получить историю сообщений');

  const { messages }: { messages: message[] } = await response.json();

  return messages;
}

export { changeUsername, codeRequest, getMessageHistory, getUserData };
