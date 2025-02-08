import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Landing from './pages/Landing';
import LifePoints from './pages/LifePoints';
import Journey from './pages/Journey';
import Scoreboard from './pages/Scoreboard';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-100">
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/lifepoints" element={<LifePoints />} />
            <Route path="/journey" element={<Journey />} /> 
            <Route path="/scoreboard" element={<Scoreboard />} /> 
            <Route path="/profile" element={<Profile />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;