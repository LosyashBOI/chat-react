import { getDate } from '../utils';

function Output() {
  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        <Message />
      </div>
    </div>
  );
}

function Message() {
  return (
    <div className="message message_me message_sent">
      <p className="message__text">i: i</p>
      <time className="message__time">{getDate(Date.now())}</time>
    </div>
  );
}

export default Output;
