import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { changeUsername, codeRequest, getUserData } from '../api';
import { modalValues } from '../App';
import { getToken, saveEmail, saveToken } from '../utils';

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
  setEmail?: Dispatch<SetStateAction<string | undefined>>;
}

function Modals({ active, setActive, setLogin, setEmail }: IModal) {
  return (
    <div className={`${active} modal flex`}>
      <SettingsModal setActive={setActive} active={active} setEmail={setEmail} />
      <AuthorizationModal setActive={setActive} active={active} setEmail={setEmail} />
      <CodeConfirmationModal setActive={setActive} active={active} setLogin={setLogin} />
    </div>
  );
}

function SettingsModal({ setActive, active }: IModal) {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = getToken();
      // console.log(token);
      await changeUsername(value, token);

      setActive(MODALS.INACTIVE);
      setValue('');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        throw Error;
      }
    }
  };

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
      <form className="settings__form flex" onSubmit={handleSubmit}>
        <input
          className="input input_settings"
          type="text"
          placeholder="Стив"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input className="btn btn_chat btn_settings-submit" type="submit" value="->" />
      </form>
    </div>
  );
}

function AuthorizationModal({ setActive, active, setEmail }: IModal) {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await codeRequest(value);

      saveEmail(value);
      setEmail?.(value);
      setActive(MODALS.CONFIRMATION);
      setValue('');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        throw Error;
      }
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
  const [tokenInput, setTokenInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { email, name } = await getUserData(tokenInput);
      console.log(email, name);

      saveToken(tokenInput);
      setLogin?.(true);

      setActive(MODALS.INACTIVE);
      setTokenInput('');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        throw Error;
      }
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
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
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
