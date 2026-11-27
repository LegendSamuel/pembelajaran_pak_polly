export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  badge: string;
  options: QuizOption[];
}

export interface ProductionStep {
  id: number;
  title: string;
  summary: string;
  why: string;
  icon: string;
  tools?: {
    name: string;
    description: string;
    specs: string;
    pros: string;
  }[];
}

export interface Chapter {
  id: string;
  time: number;
  title: string;
  badge: string;
}
