export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  flag: string;
  cca2: string;
  cca3: string;
  latlng: [number, number];
}

export interface QuizQuestion {
  country: Country;
  options: string[];
  correctAnswer: string;
  type: 'capital' | 'country' | 'flag';
}

export interface QuizScore {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  gameMode: 'world' | 'continent';
  continent?: string;
}

export interface GameState {
  currentQuestion: QuizQuestion | null;
  questionIndex: number;
  score: number;
  totalQuestions: number;
  gameMode: 'world' | 'continent' | null;
  selectedContinent: string | null;
  isPlaying: boolean;
  timeLeft: number;
}
