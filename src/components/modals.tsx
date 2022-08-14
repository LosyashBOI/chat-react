import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { codeRequest, getUsername } from '../api';
import { modalValues } from '../App';
import { saveToken } from '../utils';

const MODALS = {
  INACTIVE: 'inactive',
  SETTINGS: 'settings',
  AUTHORIZATION: 'authorization',
  CONFIRMATION: 'confirmation',
};

interface IModal {
  active: modalValues;
  setActive: Dispatch<SetStateAction<string>>;
  setLogin?: Dispatch<SetStateAction<boolean>>;
}

function Modals({ active, setActive, setLogin }: IModal) {
  return (
    <div className={`${active} modal flex`}>
      <SettingsModal setActive={setActive} active={active} />
      <AuthorizationModal setActive={setActive} active={active} />
      <CodeConfirmationModal setActive={setActive} active={active} setLogin={setLogin} />
    </div>
  );
}

function SettingsModal({ setActive, active }: IModal) {
  return (
    <div className={active === MODALS.SETTINGS ? 'modal__element' : MODALS.INACTIVE}>
      <div className="modal__top flex">
        <h2 className="modal__title">Настройки</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => setActive(MODALS.INACTIVE)}
        >
          +
        </button>
      </div>
      <p className="chat-name">Имя в чате</p>
      <form className="settings__form flex">
        <input className="input input_settings" type="text" placeholder="Стив" />
        <input className="btn btn_chat btn_settings-submit" type="submit" value="->" />
      </form>
    </div>
  );
}

function AuthorizationModal({ setActive, active }: IModal) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!email.trim()) return;

      await codeRequest(email);
      setActive(MODALS.CONFIRMATION);
      setEmail('');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={active === MODALS.AUTHORIZATION ? 'modal__element' : MODALS.INACTIVE}>
      <div className="modal__top flex">
        <h2 className="modal__title">Авторизация</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => setActive(MODALS.INACTIVE)}
        >
          +
        </button>
      </div>
      <h3 className="form-title">Почта:</h3>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input
          className="input input_authorization"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="btn btn_chat btn_authorization-submit"
          type="submit"
          value="Получить код"
        />
      </form>
    </div>
  );
}

function CodeConfirmationModal({ setActive, active, setLogin }: IModal) {
  const [token, setToken] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!token.trim()) return;

      const userData = await getUsername(token);
      console.log(userData);
      saveToken(token);
      setLogin?.(true);

      setActive(MODALS.INACTIVE);
      setToken('');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={active === MODALS.CONFIRMATION ? 'modal__element' : MODALS.INACTIVE}>
      <div className="modal__top flex">
        <h2 className="modal__title">Подтверждение</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => setActive(MODALS.INACTIVE)}
        >
          +
        </button>
      </div>
      <h3 className="form-title">Код:</h3>
      <form className="confirmation__form" onSubmit={handleSubmit}>
        <input
          className="input input_confirmation"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          className="btn btn_chat btn_confirmation-submit"
          type="submit"
          value="Войти"
        />
      </form>
    </div>
  );
}

export { MODALS, Modals };
