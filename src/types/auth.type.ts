export type LoginRequestType = {
  email: string;
  password: string;
};

export type SignUpRequestType = LoginRequestType & {
  name: string;
};

export type ResetPasswordRequestType = {
  email: string;
};

export type AuthUserType = {
  email: string;
  name: string;
};
