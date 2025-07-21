import logo from './logo.svg';
import './App.css';
import "@fontsource/inria-sans/300.css"; // Light
import "@fontsource/inria-sans/400.css"; // Regular
import "@fontsource/inria-sans/700.css"; // Bold
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUp';
import SignUpQuestions from './pages/signUpQuestions';

import HistoryPage from './pages/historyPage';




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-questions" element={<SignUpQuestions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          
          
        </Routes>
      </Router>

      


    </div>
  );
}

export default App;
