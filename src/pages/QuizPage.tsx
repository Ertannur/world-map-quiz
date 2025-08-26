import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { useQuizStore } from '../stores/quizStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Globe, Clock, Trophy, Target } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icons with Vite
import L from 'leaflet';

// Use CDN-hosted icons to avoid Vite bundling issues
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Map component to handle map updates
function MapController({ country }: { country: { name: { common: string }, latlng: [number, number] } | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (country && country.latlng) {
      map.setView(country.latlng, 6);
    }
  }, [country, map]);

  return null;
}

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);
  
  const {
    currentQuestion,
    score,
    questionIndex,
    totalQuestions,
    isPlaying,
    gameMode,
    selectedContinent,
    loadCountries,
    startGame,
    submitAnswer,
    nextQuestion,
    endGame,
    resetGame
  } = useQuizStore();

  // Handler functions
  const handleNextQuestion = useCallback(() => {
    if (questionIndex + 1 >= totalQuestions) {
      endGame();
    } else {
      nextQuestion();
      setSelectedAnswer('');
      setShowFeedback(false);
      setTimer(30);
    }
  }, [questionIndex, totalQuestions, endGame, nextQuestion]);

  const handleTimeUp = useCallback(() => {
    if (!showFeedback) {
      setShowFeedback(true);
      setIsCorrect(false);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  }, [showFeedback, handleNextQuestion]);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    const correct = submitAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying && timer > 0 && !showFeedback) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timer, showFeedback, handleTimeUp]);

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const handleStartGame = (mode: 'world' | 'continent', continent?: string) => {
    startGame(mode, continent);
    setTimer(30);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  if (!isPlaying && !gameMode) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Quiz Mode</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge of world geography with our interactive quiz modes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStartGame('world')}>
            <CardHeader className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>World Quiz</CardTitle>
              <CardDescription>
                Test your knowledge of countries and capitals from around the entire world
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full">Start World Quiz</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Continent Quiz</CardTitle>
              <CardDescription>
                Focus on a specific continent and master its geography
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'].map(continent => (
                <Button 
                  key={continent}
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleStartGame('continent', continent)}
                >
                  {continent}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isPlaying && gameMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Card>
          <CardHeader>
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription className="text-xl">
              Your final score: {score}/{totalQuestions} ({Math.round((score/totalQuestions) * 100)}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Button onClick={() => handleStartGame(gameMode!, selectedContinent || undefined)}>
                Play Again
              </Button>
              <Button variant="outline" onClick={resetGame}>
                Choose Different Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-xl text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const mapCenter: LatLngExpression = currentQuestion.country.latlng || [0, 0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {gameMode === 'world' ? 'World Quiz' : `${selectedContinent} Quiz`}
          </h1>
          <div className="text-sm text-gray-600">
            Question {questionIndex + 1} of {totalQuestions}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">{score}/{totalQuestions}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className={`font-medium ${timer <= 10 ? 'text-red-500' : ''}`}>
              {timer}s
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle>Find this country on the map</CardTitle>
            <CardDescription>
              The highlighted country is: <strong>{currentQuestion.country.name.common}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter}>
                  <Popup>
                    <strong>{currentQuestion.country.name.common}</strong>
                    <br />
                    Population: {currentQuestion.country.population.toLocaleString()}
                  </Popup>
                </Marker>
                <MapController country={currentQuestion.country} />
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Question Section */}
        <Card>
          <CardHeader>
            <CardTitle>What is the capital of {currentQuestion.country.name.common}?</CardTitle>
            <CardDescription>
              Choose the correct capital city from the options below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant={
                  showFeedback
                    ? option === currentQuestion.correctAnswer
                      ? "default"
                      : option === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : selectedAnswer === option
                    ? "secondary"
                    : "outline"
                }
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
              >
                {option}
                {showFeedback && option === currentQuestion.correctAnswer && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {showFeedback && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </Button>
            ))}
            
            {showFeedback && (
              <div className={`p-4 rounded-lg text-center ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? '🎉 Correct!' : `❌ Wrong! The correct answer is ${currentQuestion.correctAnswer}`}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
