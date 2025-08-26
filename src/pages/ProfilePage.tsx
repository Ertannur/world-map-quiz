import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trophy, Target, Calendar, Award, User } from 'lucide-react';
import type { QuizScore } from '../types';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    streak: 0
  });

  useEffect(() => {
    if (user) {
      // Load scores from localStorage
      const savedScores = localStorage.getItem(`quiz-scores-${user.id}`);
      const userScores: QuizScore[] = savedScores ? JSON.parse(savedScores) : [];
      setScores(userScores);

      // Calculate stats
      if (userScores.length > 0) {
        const totalQuizzes = userScores.length;
        const bestScore = Math.max(...userScores.map(s => (s.score / s.totalQuestions) * 100));
        const totalCorrect = userScores.reduce((sum, s) => sum + s.score, 0);
        const totalQuestions = userScores.reduce((sum, s) => sum + s.totalQuestions, 0);
        const averageScore = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

        setStats({
          totalQuizzes,
          bestScore,
          averageScore,
          totalCorrect,
          totalQuestions,
          streak: calculateStreak(userScores)
        });
      }
    }
  }, [user]);

  const calculateStreak = (scores: QuizScore[]) => {
    if (scores.length === 0) return 0;
    
    // Sort by completion date (most recent first)
    const sortedScores = [...scores].sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    let streak = 0;
    for (const score of sortedScores) {
      if ((score.score / score.totalQuestions) >= 0.7) { // 70% or better
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getBadges = () => {
    const badges = [];
    
    if (stats.totalQuizzes >= 1) badges.push({ name: 'First Steps', icon: '🎯', description: 'Complete your first quiz' });
    if (stats.totalQuizzes >= 10) badges.push({ name: 'Quiz Master', icon: '🏆', description: 'Complete 10 quizzes' });
    if (stats.bestScore >= 90) badges.push({ name: 'Geography Expert', icon: '🌟', description: 'Score 90%+ on a quiz' });
    if (stats.streak >= 5) badges.push({ name: 'Hot Streak', icon: '🔥', description: '5 quiz winning streak' });
    if (stats.averageScore >= 80) badges.push({ name: 'Consistent Performer', icon: '💎', description: 'Maintain 80%+ average score' });
    
    return badges;
  };

  const getRecentScores = () => {
    return [...scores]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 5);
  };

  if (!user) return null;

  const badges = getBadges();
  const recentScores = getRecentScores();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Quizzes</CardDescription>
              <Target className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Best Score</CardDescription>
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bestScore.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Average Score</CardDescription>
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Current Streak</CardDescription>
              <Award className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges you've earned</CardDescription>
          </CardHeader>
          <CardContent>
            {badges.length > 0 ? (
              <div className="space-y-4">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-sm text-gray-600">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Complete your first quiz to start earning badges!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>Your latest quiz results</CardDescription>
          </CardHeader>
          <CardContent>
            {recentScores.length > 0 ? (
              <div className="space-y-4">
                {recentScores.map((score) => (
                  <div key={score.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {score.gameMode === 'world' ? 'World Quiz' : `${score.continent} Quiz`}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(score.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {score.score}/{score.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-600">
                        {((score.score / score.totalQuestions) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-4">No quiz history yet!</p>
                <Button onClick={() => window.location.href = '/quiz'}>
                  Start Your First Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
