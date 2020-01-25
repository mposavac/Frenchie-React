export interface IOptions {
  adjectives: IChecked;
  nouns: IChecked;
  verbs: IChecked;
  numOfQuestions: number;
}

export interface IChecked {
  checked: boolean;
}

export interface IPropsQRecap {
  show: boolean;
  score: number;
  handleRetake: () => void;
  numOfCorrect: number;
  numOfQuestions: number;
}

export interface IPropsQForm {
  prepareQuestions: (e: any) => void;
  questionsLoaded: boolean;
  options: IOptions;
  handleOptions: (e: any) => void;
}

export interface IPropsQBox {
  question: Readonly<IQuestion>;
  questionIndex: Readonly<number>;
  handleNext: () => void;
  handleScore: (timer: number, isCorrect: boolean) => void;
}

export interface IPropsInputField {
  value: string;
  setter: (e: any) => void;
  id: string;
  text: string;
}

export interface IQuestion {
  word: string;
  incorrect_answers?: Array<string>;
  translation: string;
}

export interface IQuizState {
  questions: IQuestion[];
}
