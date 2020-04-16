export interface IOptions {
  adjectives: IChecked;
  nouns: IChecked;
  verbs: IChecked;
  custom_words: IChecked;
  numOfQuestions: number;
}

export interface IChecked {
  checked: boolean;
}

export interface IPropsQuizRecap {
  show: boolean;
  score: number;
  handleRetake: () => void;
  numOfCorrect: number;
  numOfQuestions: number;
}

export interface IPropsQuestionForm {
  prepareQuestions: (e: any) => void;
  questionsLoaded: boolean;
  options: IOptions;
  handleOptions: (e: any) => void;
}

export interface IPropsQuestionBox {
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

export interface IPropsRadioBtnInput {
  isChecked: boolean;
  option: string;
  title?: string;
  handleOptions: (e: any) => void;
}
