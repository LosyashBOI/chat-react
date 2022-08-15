import { getDate } from '../utils';

interface IOutput {
  name: string;
}

function Output({ name }: IOutput) {
  return (
    <div className="chat__middle">
      <div className="chat__output flex">
        <Message name={name} />
      </div>
    </div>
  );
}

function Message({ name }: IOutput) {
  return (
    <div className="message message_me message_sent">
      <p className="message__text">{name}: i</p>
      <time className="message__time">{getDate(Date.now())}</time>
    </div>
  );
}

export default Output;
