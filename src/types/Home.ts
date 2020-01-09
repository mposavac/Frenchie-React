export interface IPropsHLogin {
  show: boolean;
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
