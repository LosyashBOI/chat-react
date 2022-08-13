import { Dispatch, SetStateAction } from 'react';

interface props {
  setActive: Dispatch<SetStateAction<string>>;
}

function Top({ setActive }: props) {
  return (
    <div className="chat__top flex">
      <button className="btn btn_chat btn_settings" onClick={() => setActive('settings')}>
        Настройки
      </button>
      <button
        className="btn btn_chat btn_log-out"
        onClick={() => setActive('authorization')}
      >
        Войти
      </button>
    </div>
  );
}

export default Top;
