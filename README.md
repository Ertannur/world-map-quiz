# 🌍 World Map Quiz

A modern, interactive geography quiz web application built with React, TypeScript, and cutting-edge web technologies.

![World Map Quiz](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-teal?logo=tailwindcss)

## ✨ Features

- 🗺️ **Interactive World Map** - Powered by Leaflet.js and OpenStreetMap
- 🎯 **Multiple Quiz Modes** - World quiz or continent-specific challenges
- 🌐 **Real-time Data** - Fetches country data from REST Countries API with fallback
- 🔐 **User Authentication** - Register/login with localStorage simulation
- 📊 **Progress Tracking** - Score history, achievements, and detailed statistics
- 🎨 **Modern UI/UX** - Beautiful gradients, smooth animations, and responsive design
- 🏆 **Achievement System** - Earn badges for different milestones
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Live Demo

Visit the live application: [World Map Quiz](http://localhost:5173) (when running locally)

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with modern features
- **TypeScript 5.8** - Type-safe development
- **Vite 7.1** - Next-generation frontend tooling

### Styling & UI
- **TailwindCSS 4.x** - Utility-first CSS framework
- **ShadCN/ui Components** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library

### State & Data
- **Zustand** - Lightweight state management
- **REST Countries API** - Real country data
- **LocalStorage** - Client-side data persistence

### Maps & Geography
- **Leaflet.js** - Interactive maps
- **react-leaflet** - React integration for Leaflet
- **OpenStreetMap** - Free map tiles

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **React Router DOM** - Client-side routing

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/world-map-quiz.git
   cd world-map-quiz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🎮 How to Play

1. **Create Account** - Sign up with your email and name
2. **Choose Quiz Mode:**
   - **World Quiz** - Random countries from around the globe
   - **Continent Quiz** - Focus on specific continents
3. **Answer Questions** - View countries on the interactive map and guess their capitals
4. **Track Progress** - View your scores, achievements, and improvement over time

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components (Button, Card, Input)
│   └── Navbar.tsx      # Navigation component
├── pages/              # Page components
│   ├── LandingPage.tsx # Hero section and features
│   ├── AuthPage.tsx    # Login/Register forms
│   ├── QuizPage.tsx    # Quiz interface with map
│   └── ProfilePage.tsx # User statistics and achievements
├── stores/             # Zustand state management
│   ├── authStore.ts    # Authentication state
│   └── quizStore.ts    # Quiz game state and country data
├── types/              # TypeScript type definitions
│   └── index.ts        # Global interfaces and types
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions and utilities
└── App.tsx             # Main app with routing
```

## 🎯 Game Modes

### World Quiz
Test your knowledge of countries and capitals from around the entire world. Features:
- Random country selection from all continents
- Diverse geographic coverage
- Challenging mix of well-known and lesser-known countries

### Continent Quiz
Focus your learning on specific regions:
- **Africa** - 54 countries and their capitals
- **Asia** - Diverse countries from the world's largest continent
- **Europe** - European nations and capitals
- **North America** - Countries from Canada to Central America
- **South America** - Nations of the southern continent
- **Oceania** - Australia, New Zealand, and Pacific islands

## 🏆 Achievement System

Earn badges as you progress:
- 🎯 **First Steps** - Complete your first quiz
- 🏆 **Quiz Master** - Complete 10 quizzes
- 🌟 **Geography Expert** - Score 90%+ on any quiz
- 🔥 **Hot Streak** - Achieve 5 consecutive good scores
- 💎 **Consistent Performer** - Maintain 80%+ average score

## 📊 Features Deep Dive

### Interactive Map
- **Real-time positioning** - Countries highlighted on authentic world map
- **Zoom controls** - Focus on specific regions
- **Marker popups** - Additional country information
- **Responsive design** - Works on all screen sizes

### Smart Fallback System
- **API Integration** - Primary data from REST Countries API
- **Fallback Data** - 12 curated countries ensure app always works
- **Error Handling** - Graceful degradation when API is unavailable

### User Experience
- **Intuitive Navigation** - Clear, modern interface
- **Real-time Feedback** - Instant response to answers
- **Progress Indicators** - Visual feedback on quiz progress
- **Accessibility** - Keyboard navigation and screen reader support

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🌐 API Integration

The application integrates with the [REST Countries API](https://restcountries.com/) to fetch real-time country data:

- **Endpoint**: `https://restcountries.com/v3.1/all`
- **Data fetched**: Names, capitals, regions, populations, coordinates
- **Fallback system**: High-quality mock data when API is unavailable

## 🎨 Design System

### Color Palette
- **Primary Blue**: Modern blue gradients for main interface
- **Emerald Green**: Accent color for success states
- **Neutral Grays**: Clean, readable text and backgrounds

### Typography
- **Font Family**: Inter, system fonts for optimal readability
- **Responsive Sizing**: Scales beautifully across all devices

### Components
- **Consistent Spacing**: 8px grid system
- **Smooth Animations**: 0.2s transitions for better UX
- **Hover States**: Interactive feedback on all clickable elements

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Enhanced**: Rich experience on larger screens
- **Touch Friendly**: All interactions work with touch

## 🔧 Configuration Files

- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS with Tailwind plugin
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint rules and settings

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Popular Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Railway/Render**: Connect Git repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **REST Countries API** - Providing comprehensive country data
- **OpenStreetMap** - Free, editable map data
- **ShadCN/ui** - Beautiful, accessible UI components
- **Lucide** - Elegant icon library
- **React Community** - Amazing ecosystem and tools

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/world-map-quiz/issues) page
2. Create a new issue with detailed description
3. Join the discussion in existing threads

---

**Built with ❤️ using modern web technologies for an engaging educational experience!**

⭐ If you found this project helpful, please give it a star on GitHub!
