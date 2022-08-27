import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../redux/modalSlice';
import { setUser } from '../redux/userSlice';
import { MODALS, saveEmail, saveToken } from '../utils';
import { IStore, IUser } from './interfaces';

function Top() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: IStore) => state.user);

  function handleAuth() {
    if (isAuth) {
      saveToken('');
      saveEmail('');

      const user: IUser = {
        name: '',
        email: '',
        token: '',
        isAuth: false,
      };

      dispatch(setUser(user));
    } else {
      dispatch(setModal(MODALS.AUTHORIZATION));
    }
  }

  return (
    <div className="chat__top flex">
      <button
        className="btn btn_chat btn_settings"
        onClick={() => dispatch(setModal(MODALS.SETTINGS))}
      >
        Настройки
      </button>
      <button className="btn btn_chat btn_log-out" onClick={handleAuth}>
        {isAuth ? 'Выйти' : 'Войти'}
      </button>
    </div>
  );
}

export default Top;
