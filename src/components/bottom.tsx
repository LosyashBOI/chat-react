import { useState } from 'react';

function Bottom() {
  const [text, setText] = useState('');

  return (
    <div className="chat__bottom">
      <form className="chat__form flex">
        <input
          className="input input_message"
          type="text"
          placeholder="сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input className="btn btn_chat btn_message-submit" type="submit" value="->" />
      </form>
    </div>
  );
}

export default Bottom;
