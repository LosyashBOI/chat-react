import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeUsername, codeRequest, getUserData } from '../api';
import { setModal } from '../redux/modalSlice';
import { setUser } from '../redux/userSlice';
import { MODALS, saveEmail, saveToken } from '../utils';
import { IStore, IUser } from './interfaces';

function Modals() {
  const activeModal = useSelector((state: IStore) => state.activeModal);

  return (
    <div className={`${activeModal} modal flex`}>
      <SettingsModal />
      <AuthorizationModal />
      <CodeConfirmationModal />
    </div>
  );
}

function SettingsModal() {
  const dispatch = useDispatch();
  const {
    activeModal,
    user: { token },
  } = useSelector((state: IStore) => state);

  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await changeUsername(value, token);

      dispatch(setModal(MODALS.INACTIVE));
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        throw Error;
      }
    }
  };

  return (
    <div className={activeModal === MODALS.SETTINGS ? 'modal__element' : MODALS.INACTIVE}>
      <div className="modal__top flex">
        <h2 className="modal__title">Настройки</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => dispatch(setModal(MODALS.INACTIVE))}
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

function AuthorizationModal() {
  const dispatch = useDispatch();
  const activeModal = useSelector((state: IStore) => state.activeModal);

  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await codeRequest(value);

      dispatch(setModal(MODALS.CONFIRMATION));
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
    <div
      className={
        activeModal === MODALS.AUTHORIZATION ? 'modal__element' : MODALS.INACTIVE
      }
    >
      <div className="modal__top flex">
        <h2 className="modal__title">Авторизация</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => {
            dispatch(setModal(MODALS.INACTIVE));
          }}
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

function CodeConfirmationModal() {
  const dispatch = useDispatch();
  const activeModal = useSelector((state: IStore) => state.activeModal);

  const [tokenInput, setTokenInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { email, name, token } = await getUserData(tokenInput);
      const user: IUser = {
        name: name,
        email: email,
        token: token,
        isAuth: true,
      };

      saveToken(token);
      saveEmail(email);
      dispatch(setUser(user));
      dispatch(setModal(MODALS.INACTIVE));

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
    <div
      className={activeModal === MODALS.CONFIRMATION ? 'modal__element' : MODALS.INACTIVE}
    >
      <div className="modal__top flex">
        <h2 className="modal__title">Подтверждение</h2>
        <button
          className="btn btn_close-modal"
          onClick={() => dispatch(setModal(MODALS.INACTIVE))}
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

export { Modals };
