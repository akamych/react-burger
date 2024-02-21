export type LoginRequestType = {
  email: string;
  password: string;
};

export type SignUpRequestType = LoginRequestType & {
  name: string;
};

export type DataChangeRequestType = SignUpRequestType;

export type ResetPasswordRequestType = {
  email: string;
};

export type ResetPasswordConfirmRequestType = {
  password: string;
  token: string;
};

export type AuthUserType = {
  email: string;
  name: string;
};
