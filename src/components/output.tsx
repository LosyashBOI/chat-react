import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { getMessageHistory, message } from '../api';
import { getDate } from '../utils';

interface IOutput {
  currentEmail: string | undefined;
  isLoggedIn: boolean;
}

// function filterMessages(messages: message[], count: number) {
//   if (count >= messages.length) return;
//
//   const start = messages.length - count;
//   const end = messages.length;
//
//   return messages.slice(start, end);
// }

function Output({ currentEmail, isLoggedIn }: IOutput) {
  const [messages, setMessages] = useState<Array<message>>([]);
  // const [messageCount, setMessageCount] = useState(20);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('Fetching messages');

      (async () => {
        const data = await getMessageHistory();
        setMessages(data);
      })();
    }
  }, [isLoggedIn]);

  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        {messages?.map((item: message) => {
          const { _id: id, text, createdAt: time, user } = item;

          return (
            <Message
              key={id}
              name={user.name}
              text={text}
              time={getDate(time)}
              email={user.email}
              currentEmail={currentEmail}
            />
          );
        })}
      </div>
    </div>
  );
}

interface destructedMessage {
  time: string;
  text: string;
  name: string;
  email: string;
  currentEmail: string | undefined;
  id?: string;
}

function Message({ name, text, time, email, currentEmail }: destructedMessage) {
  const isCurrentUserMessage = email === currentEmail;

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const messageClass = classNames({
    message: true,
    message_me: isCurrentUserMessage,
    message_companion: !isCurrentUserMessage,
  });

  return (
    <div className={messageClass} ref={ref}>
      <p className="message__text">
        {name}: {text}
      </p>
      <time className="message__time">{time}</time>
    </div>
  );
}

export default Output;
