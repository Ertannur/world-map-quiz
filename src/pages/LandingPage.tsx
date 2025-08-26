import { Link } from 'react-router-dom';
import { Globe, Target, Trophy, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuthStore } from '../stores/authStore';

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Test Your World Knowledge
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Explore the globe, learn about countries, capitals, and cultures through interactive quizzes.
            Challenge yourself and compete with others!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={isAuthenticated ? "/quiz" : "/auth"}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Start Quiz Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Floating globe animation */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20 hidden lg:block">
          <Globe className="h-64 w-64 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose WorldQuiz?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about the world through fun, interactive quizzes designed to test and expand your geographical knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Interactive World Map</CardTitle>
                <CardDescription>
                  Explore countries with our interactive map powered by real geographical data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Multiple Game Modes</CardTitle>
                <CardDescription>
                  Challenge yourself with world-wide quizzes or focus on specific continents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>
                  Monitor your scores, track improvement, and earn achievements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Compete with Others</CardTitle>
                <CardDescription>
                  Join the leaderboard and see how you rank against other geography enthusiasts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle>Real-Time Data</CardTitle>
                <CardDescription>
                  Questions are generated using live data from the REST Countries API
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Fast & Fun</CardTitle>
                <CardDescription>
                  Quick questions, instant feedback, and addictive gameplay
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of geography enthusiasts and start your world discovery journey today!
          </p>
          <Link to={isAuthenticated ? "/quiz" : "/auth"}>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg">
              {isAuthenticated ? "Go to Quiz" : "Sign Up Free"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
