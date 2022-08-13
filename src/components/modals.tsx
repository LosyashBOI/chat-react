import { Dispatch, FormEvent, SetStateAction } from 'react';

import { modalValues } from '../App';

const MODALS = {
  INACTIVE: 'inactive',
  SETTINGS: 'settings',
  AUTHORIZATION: 'authorization',
  CONFIRMATION: 'confirmation',
};

interface props {
  active: modalValues;
  setActive: Dispatch<SetStateAction<string>>;
}

function Modals({ active, setActive }: props) {
  return (
    <div className={`${active} modal flex`}>
      <SettingsModal setActive={setActive} active={active} />
      <AuthorizationModal setActive={setActive} active={active} />
      <CodeConfirmationModal setActive={setActive} active={active} />
    </div>
  );
}

function SettingsModal({ setActive, active }: props) {
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

function AuthorizationModal({ setActive, active }: props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActive(MODALS.CONFIRMATION);
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
        <input className="input input_authorization" type="email" />
        <input
          className="btn btn_chat btn_authorization-submit"
          type="submit"
          value="Получить код"
        />
      </form>
    </div>
  );
}

function CodeConfirmationModal({ setActive, active }: props) {
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
      <form className="confirmation__form">
        <input className="input input_confirmation" type="text" />
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
