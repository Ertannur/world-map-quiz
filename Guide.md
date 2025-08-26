# 🌍 World Map Quiz Web App

A modern, interactive web application built with React, Vite, Zustand, TailwindCSS, and Leaflet for testing geographical knowledge through quizzes.

## 🚀 Features

- **Interactive World Map**: Powered by Leaflet.js and OpenStreetMap
- **Multiple Game Modes**: World quiz or continent-specific quizzes
- **Real-time Data**: Questions generated from REST Countries API
- **User Authentication**: LocalStorage-based authentication system
- **Progress Tracking**: Score history, achievements, and statistics
- **Modern UI**: Beautiful interface with TailwindCSS and ShadCN components
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Bundler**: Vite
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Components**: ShadCN/ui
- **Map**: Leaflet.js + react-leaflet
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Data Source**: REST Countries API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components (Button, Card, Input)
│   └── Navbar.tsx      # Navigation component
├── pages/              # Page components
│   ├── LandingPage.tsx # Home page with hero and features
│   ├── AuthPage.tsx    # Login/Register page
│   ├── QuizPage.tsx    # Quiz interface with map
│   └── ProfilePage.tsx # User profile and statistics
├── stores/             # Zustand state management
│   ├── authStore.ts    # Authentication state
│   └── quizStore.ts    # Quiz game state
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types and interfaces
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── App.tsx             # Main app component with routing
```

## 🎮 How to Play

1. **Sign Up/Login**: Create an account or sign in
2. **Choose Mode**: Select World Quiz or a specific continent
3. **Answer Questions**: View the country on the map and guess its capital
4. **Track Progress**: View your scores, achievements, and statistics
5. **Compete**: Try to improve your scores and earn badges

## 🏆 Game Features

### Quiz Modes
- **World Quiz**: Random countries from around the globe
- **Continent Quiz**: Focus on specific continents (Africa, Asia, Europe, etc.)

### Scoring & Progress
- Real-time scoring during quizzes
- Detailed statistics tracking
- Achievement badges for milestones
- Quiz history with timestamps

### Achievements
- 🎯 **First Steps**: Complete your first quiz
- 🏆 **Quiz Master**: Complete 10 quizzes  
- 🌟 **Geography Expert**: Score 90%+ on a quiz
- 🔥 **Hot Streak**: 5 quiz winning streak
- 💎 **Consistent Performer**: Maintain 80%+ average score

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 API Integration

The app uses the [REST Countries API](https://restcountries.com/) to fetch real-time country data including:
- Country names and capitals
- Geographic coordinates
- Population data
- Regional information

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Eye-catching blue-to-emerald gradients
- **Interactive Map**: Click and zoom functionality with country markers
- **Responsive Layout**: Optimized for desktop and mobile
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 💾 Data Storage

- **User Authentication**: Simulated JWT tokens in localStorage
- **User Profiles**: Stored locally with email, name, and creation date
- **Quiz Scores**: Persistent score history per user
- **Settings**: User preferences and game state

## 🔧 Technical Highlights

- **Type Safety**: Full TypeScript implementation
- **State Management**: Efficient Zustand stores with persistence
- **Modern React**: Hooks-based architecture with latest React 19
- **Build Optimization**: Vite for fast development and production builds
- **Code Quality**: ESLint configuration for consistent code style

## 📱 Responsive Design

- Mobile-first approach with TailwindCSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface on mobile devices
- Optimized map interactions for touch screens

## 🚀 Future Enhancements

- **Multiplayer Mode**: Real-time quiz battles
- **Leaderboards**: Global and friend-based rankings
- **Timer Challenges**: Speed-based quiz modes
- **Country Facts**: Educational content about countries
- **Social Features**: Share scores and challenge friends
- **Offline Mode**: PWA capabilities for offline play

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies for an engaging educational experience!
