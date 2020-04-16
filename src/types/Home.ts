export interface IPropsLoginScreen {
  show: boolean;
  isLogin: boolean;
  handleLoginMenu: () => void;
  showBackside: () => void;
}

export interface IPropsInputField {
  type: string;
  id: string;
  value: string;
  name: string;
  icon: string;
  handleInput: (e: any) => void;
}

export interface IUserData {
  username?: string;
  email: string;
  password: string;
}

export interface IErrorResponse {
  code: string;
  message: string | undefined;
}

export interface IPropsHome {
  isLoading: boolean;
  animateIndex: number | undefined;
  handleAnimation: (e: any) => void;
  isLogin: boolean;
  isMobile: boolean;
}
