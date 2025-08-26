import { Link, useNavigate } from 'react-router-dom';
import { Globe, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from './ui/button';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">WorldQuiz</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/quiz">
                  <Button variant="ghost">Quiz</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
