import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';

import { URL } from '../api';
import { IStore } from './interfaces';

function Bottom() {
  const [text, setText] = useState('');
  const { token, isAuth } = useSelector((state: IStore) => state.user);
  const { sendJsonMessage } = useWebSocket(URL.SOCKET + token, {
    // eslint-disable-next-line no-unused-vars
    shouldReconnect: (closeEvent) => true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      sendJsonMessage({ text });
      setText('');
    }
  };

  return (
    <div className="chat__bottom">
      <form className="chat__form flex" onSubmit={handleSubmit}>
        <input
          className="input input_message"
          type="text"
          placeholder="сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!isAuth}
        />
        <input
          className="btn btn_chat btn_message-submit"
          type="submit"
          value="->"
          disabled={!isAuth}
        />
      </form>
    </div>
  );
}

export default Bottom;
