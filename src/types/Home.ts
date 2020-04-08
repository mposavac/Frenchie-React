export interface IPropsHLogin {
  show: boolean;
  isLogin: boolean;
  handleLoginMenu: () => void;
  showBackside: () => void;
}

export interface IPropsHInput {
  type: string;
  id: string;
  value: string;
  name: string;
  icon: string;
  handleInput: (e: any) => void;
}

export interface ISignupActionProps {
  username?: string;
  email: string;
  password: string;
}

export interface IErrorResponse {
  code: string;
  message: string | undefined;
}

export interface IHomeProps {
  isLoading: boolean;
  animateIndex: number | undefined;
  handleAnimation: (e: any) => void;
  isLogin: boolean;
}
