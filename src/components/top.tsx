import { Dispatch, SetStateAction } from 'react';

import { getToken, saveToken } from '../utils';
import { MODALS } from './modals';

interface props {
  setActive: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

function Top({ setActive, isLoggedIn, setLogin }: props) {
  const token = getToken();

  const handleAuth = () => {
    if (token) {
      saveToken('');
      setLogin(false);
    } else {
      setActive(MODALS.AUTHORIZATION);
    }
  };

  return (
    <div className="chat__top flex">
      <button
        className="btn btn_chat btn_settings"
        onClick={() => setActive(MODALS.SETTINGS)}
      >
        Настройки
      </button>
      <button className="btn btn_chat btn_log-out" onClick={handleAuth}>
        {isLoggedIn || token ? 'Выйти' : 'Войти'}
      </button>
    </div>
  );
}

export default Top;
