import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';

import { getMessageHistory, message, URL } from '../api';
import { getDate } from '../utils';
import { IStore } from './interfaces';

function Output() {
  const { isAuth, token } = useSelector((state: IStore) => state.user);
  const [isFetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<Array<message>>([]);

  useEffect(() => {
    if (isAuth) {
      (async () => {
        setFetching(true);
        try {
          const data = await getMessageHistory();
          setMessages(data);
        } catch (e) {
          alert(e);
        } finally {
          setFetching(false);
        }
      })();
    } else {
      setMessages([]);
    }
  }, [isAuth]);

  const { lastJsonMessage } = useWebSocket(URL.SOCKET + token, {
    // eslint-disable-next-line no-unused-vars
    shouldReconnect: (closeEvent) => isAuth,
    retryOnError: isAuth,
  });

  useEffect(() => {
    const hasMessage =
      lastJsonMessage !== null && JSON.stringify(lastJsonMessage) !== '{}';

    if (hasMessage) {
      setMessages((current) => current.concat(lastJsonMessage));
    }
  }, [lastJsonMessage]);

  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        <RotatingLines
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={isFetching}
        />
        {messages.map((item: message) => {
          const { _id: id, text, createdAt: time, user } = item;

          return (
            <Message
              key={id}
              name={user.name}
              text={text}
              time={getDate(time)}
              email={user.email}
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
}

function Message({ name, text, time, email }: destructedMessage) {
  const { email: currentEmail } = useSelector((state: IStore) => state.user);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const isCurrentUserMessage = email === currentEmail;

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
