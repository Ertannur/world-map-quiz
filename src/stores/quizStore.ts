import { create } from 'zustand';
import type { Country, QuizQuestion, GameState } from '../types';

interface QuizState extends GameState {
  countries: Country[];
  questionHistory: QuizQuestion[];
  setCountries: (countries: Country[]) => void;
  startGame: (mode: 'world' | 'continent', continent?: string) => void;
  nextQuestion: () => void;
  submitAnswer: (answer: string) => boolean;
  endGame: () => void;
  resetGame: () => void;
  loadCountries: () => Promise<void>;
  generateQuestion: () => QuizQuestion | null;
}

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

// Shuffle array utility
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  // Game state
  currentQuestion: null,
  questionIndex: 0,
  score: 0,
  totalQuestions: 10,
  gameMode: null,
  selectedContinent: null,
  isPlaying: false,
  timeLeft: 30,

  // Data
  countries: [],
  questionHistory: [],

  setCountries: (countries) => set({ countries }),

  loadCountries: async () => {
    try {
      // Try the basic endpoint with a timeout and retry logic
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://restcountries.com/v3.1/all', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        throw new Error('API response is not an array');
      }
      
      // Filter out countries without capitals and transform the data
      const validCountries = data
        .filter((country: unknown) => {
          const c = country as any;
          return c.capital && 
            Array.isArray(c.capital) && 
            c.capital.length > 0 &&
            c.latlng &&
            Array.isArray(c.latlng) &&
            c.latlng.length === 2;
        })
        .map((country: unknown) => {
          const c = country as any;
          return {
            name: {
              common: c.name?.common || 'Unknown',
              official: c.name?.official || 'Unknown'
            },
            capital: c.capital,
            region: c.region || 'Unknown',
            subregion: c.subregion || 'Unknown',
            population: c.population || 0,
            flag: c.flag || '🏳️',
            cca2: c.cca2 || '',
            cca3: c.cca3 || '',
            latlng: [c.latlng[0], c.latlng[1]] as [number, number]
          };
        });
      
      console.log(`✅ Successfully loaded ${validCountries.length} countries from REST Countries API`);
      set({ countries: validCountries });
    } catch (error) {
      console.warn('⚠️  REST Countries API unavailable, using fallback data:', error instanceof Error ? error.message : 'Unknown error');
      
      // Fallback to mock data
      const mockCountries: Country[] = [
        {
          name: { common: 'France', official: 'French Republic' },
          capital: ['Paris'],
          region: 'Europe',
          subregion: 'Western Europe',
          population: 67391582,
          flag: '🇫🇷',
          cca2: 'FR',
          cca3: 'FRA',
          latlng: [46.0, 2.0]
        },
        {
          name: { common: 'Germany', official: 'Federal Republic of Germany' },
          capital: ['Berlin'],
          region: 'Europe',
          subregion: 'Central Europe',
          population: 83240525,
          flag: '🇩🇪',
          cca2: 'DE',
          cca3: 'DEU',
          latlng: [51.0, 9.0]
        },
        {
          name: { common: 'Japan', official: 'Japan' },
          capital: ['Tokyo'],
          region: 'Asia',
          subregion: 'Eastern Asia',
          population: 125836021,
          flag: '🇯🇵',
          cca2: 'JP',
          cca3: 'JPN',
          latlng: [36.0, 138.0]
        },
        {
          name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
          capital: ['Brasília'],
          region: 'Americas',
          subregion: 'South America',
          population: 215313498,
          flag: '🇧🇷',
          cca2: 'BR',
          cca3: 'BRA',
          latlng: [-10.0, -55.0]
        },
        {
          name: { common: 'Australia', official: 'Commonwealth of Australia' },
          capital: ['Canberra'],
          region: 'Oceania',
          subregion: 'Australia and New Zealand',
          population: 25687041,
          flag: '🇦🇺',
          cca2: 'AU',
          cca3: 'AUS',
          latlng: [-27.0, 133.0]
        },
        {
          name: { common: 'Canada', official: 'Canada' },
          capital: ['Ottawa'],
          region: 'Americas',
          subregion: 'North America',
          population: 38008005,
          flag: '🇨🇦',
          cca2: 'CA',
          cca3: 'CAN',
          latlng: [60.0, -95.0]
        },
        {
          name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
          capital: ['London'],
          region: 'Europe',
          subregion: 'Northern Europe',
          population: 67886011,
          flag: '🇬🇧',
          cca2: 'GB',
          cca3: 'GBR',
          latlng: [54.0, -2.0]
        },
        {
          name: { common: 'United States', official: 'United States of America' },
          capital: ['Washington, D.C.'],
          region: 'Americas',
          subregion: 'North America',
          population: 331893745,
          flag: '🇺🇸',
          cca2: 'US',
          cca3: 'USA',
          latlng: [38.0, -97.0]
        },
        {
          name: { common: 'China', official: 'People\'s Republic of China' },
          capital: ['Beijing'],
          region: 'Asia',
          subregion: 'Eastern Asia',
          population: 1439323776,
          flag: '🇨🇳',
          cca2: 'CN',
          cca3: 'CHN',
          latlng: [35.0, 105.0]
        },
        {
          name: { common: 'India', official: 'Republic of India' },
          capital: ['New Delhi'],
          region: 'Asia',
          subregion: 'Southern Asia',
          population: 1380004385,
          flag: '🇮🇳',
          cca2: 'IN',
          cca3: 'IND',
          latlng: [20.0, 77.0]
        },
        {
          name: { common: 'South Africa', official: 'Republic of South Africa' },
          capital: ['Cape Town'],
          region: 'Africa',
          subregion: 'Southern Africa',
          population: 59308690,
          flag: '🇿🇦',
          cca2: 'ZA',
          cca3: 'ZAF',
          latlng: [-29.0, 24.0]
        },
        {
          name: { common: 'Egypt', official: 'Arab Republic of Egypt' },
          capital: ['Cairo'],
          region: 'Africa',
          subregion: 'Northern Africa',
          population: 102334403,
          flag: '🇪🇬',
          cca2: 'EG',
          cca3: 'EGY',
          latlng: [27.0, 30.0]
        }
      ];
      
      console.log('🎯 Using high-quality mock data with', mockCountries.length, 'countries');
      set({ countries: mockCountries });
    }
  },

  generateQuestion: () => {
    const { countries, selectedContinent } = get();
    
    if (countries.length === 0) return null;

    let availableCountries = countries;
    
    // Filter by continent if needed
    if (selectedContinent) {
      availableCountries = countries.filter(country => {
        // Map our UI continent names to API region names
        const regionMapping: { [key: string]: string[] } = {
          'North America': ['Americas'],
          'South America': ['Americas'],
          'Europe': ['Europe'],
          'Asia': ['Asia'],
          'Africa': ['Africa'],
          'Oceania': ['Oceania']
        };
        
        const validRegions = regionMapping[selectedContinent] || [selectedContinent];
        return validRegions.includes(country.region);
      });
    }

    if (availableCountries.length < 4) return null;

    // Select random country
    const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    
    // Generate wrong options
    const wrongOptions = shuffleArray(
      availableCountries
        .filter(c => c.cca3 !== randomCountry.cca3 && c.capital)
        .map(c => c.capital![0])
    ).slice(0, 3);

    const correctAnswer = randomCountry.capital![0];
    const allOptions = shuffleArray([correctAnswer, ...wrongOptions]);

    return {
      country: randomCountry,
      options: allOptions,
      correctAnswer,
      type: 'capital' as const
    };
  },

  startGame: (mode, continent) => {
    const question = get().generateQuestion();
    set({
      gameMode: mode,
      selectedContinent: continent || null,
      currentQuestion: question,
      questionIndex: 0,
      score: 0,
      isPlaying: true,
      timeLeft: 30,
      questionHistory: []
    });
  },

  nextQuestion: () => {
    const { questionIndex, totalQuestions } = get();
    
    if (questionIndex + 1 >= totalQuestions) {
      get().endGame();
      return;
    }

    const question = get().generateQuestion();
    set({
      currentQuestion: question,
      questionIndex: questionIndex + 1,
      timeLeft: 30
    });
  },

  submitAnswer: (answer: string) => {
    const { currentQuestion, score, questionHistory } = get();
    
    if (!currentQuestion) return false;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const newHistory = [...questionHistory, currentQuestion];
    
    set({
      score: isCorrect ? score + 1 : score,
      questionHistory: newHistory
    });

    return isCorrect;
  },

  endGame: () => {
    const { score, totalQuestions, gameMode, selectedContinent } = get();
    
    // Save score to localStorage
    const currentUser = JSON.parse(localStorage.getItem('quiz-token') || '{}');
    if (currentUser.userId) {
      const userId = currentUser.userId;
      const savedScores = localStorage.getItem(`quiz-scores-${userId}`);
      const userScores = savedScores ? JSON.parse(savedScores) : [];
      
      const newScore = {
        id: Date.now().toString(),
        userId,
        score,
        totalQuestions,
        completedAt: new Date().toISOString(),
        gameMode: gameMode!,
        continent: selectedContinent
      };
      
      userScores.push(newScore);
      localStorage.setItem(`quiz-scores-${userId}`, JSON.stringify(userScores));
    }
    
    set({
      isPlaying: false,
      currentQuestion: null
    });
  },

  resetGame: () => {
    set({
      currentQuestion: null,
      questionIndex: 0,
      score: 0,
      gameMode: null,
      selectedContinent: null,
      isPlaying: false,
      timeLeft: 30,
      questionHistory: []
    });
  }
}));
