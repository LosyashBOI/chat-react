import { MODALS } from '../utils';

type modalKeys = keyof typeof MODALS;
type modalValues = typeof MODALS[modalKeys];

interface IUser {
  name: string;
  email: string;
  token: string;
  isAuth: boolean;
}

interface IStore {
  user: IUser;
  activeModal: modalValues;
}

export type { IStore, IUser };
