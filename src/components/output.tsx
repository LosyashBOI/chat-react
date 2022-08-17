import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { getMessageHistory, message } from '../api';
import { getDate } from '../utils';

interface destructedMessage {
  time: string;
  text: string;
  name: string;
  email: string;
  id?: string;
}

interface IOutput {
  currentEmail: string | undefined;
  isLoggedIn: boolean;
}

function Output({ currentEmail, isLoggedIn }: IOutput) {
  const [messages, setMessages] = useState<Array<destructedMessage>>([]);

  useEffect(() => {
    console.log('Fetching messages');

    (async () => {
      if (isLoggedIn) {
        const result = await getMessageHistory();
        const data = result
          .filter((_item, index) => index < 20)
          .map((item) => messagesData(item));

        console.log(data);
        setMessages(data);
      }
    })();

    return () => {};
  }, [isLoggedIn]);

  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        {messages.map((item) => {
          const { id, name, text, time, email } = item;
          return (
            <Message
              key={id}
              name={name}
              text={text}
              time={getDate(time)}
              email={email}
              currentEmail={currentEmail}
            />
          );
        })}
      </div>
    </div>
  );
}

interface email {
  currentEmail: string | undefined;
}

function Message({ name, text, time, email, currentEmail }: destructedMessage & email) {
  const isCurrentUserMessage = email === currentEmail;

  const messageClass = classNames({
    message: true,
    message_me: isCurrentUserMessage,
    message_companion: !isCurrentUserMessage,
    message_sent: isCurrentUserMessage,
    message_delivered: !isCurrentUserMessage,
  });

  return (
    <div className={messageClass}>
      <p className="message__text">
        {name}: {text}
      </p>
      <time className="message__time">{time}</time>
    </div>
  );
}

function messagesData(data: message) {
  const {
    createdAt: time,
    text,
    user: { name, email },
    _id: id,
  } = data;

  return { time, text, name, email, id };
}

export default Output;
