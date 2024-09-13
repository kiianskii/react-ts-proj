import { RootState } from "../redux/store";

export interface User {
  data: {
    token: string;
    user: {
      username: string;
      email: string;
    };
  };
}
export interface AsyncThunkConfig {
  state: RootState;
  rejectValue: string;
}

export interface Data {
  res: {
    username: string;
    email: string;
  };
}

export type regCredentials = {
  username: string;
  email: string;
  password: string;
};

export type logCredentials = {
  email: string;
  password: string;
};

export type refreshRes = {
  username: string;
  email: string;
};
