import React, { useState, useEffect } from 'react';
import { Loader2, Trophy, Medal } from 'lucide-react';
import MainNav from '../components/MainNav';
import { scoreboardService, ScoreboardEntry } from '../services/scoreboardService';

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState<ScoreboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await scoreboardService.getScores();
        setScores(data);
        setError(null);
      } catch (err) {
        setError('Failed to load scoreboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const getMedalColor = (index: number): string => {
    switch (index) {
      case 0:
        return 'text-yellow-500'; // Gold
      case 1:
        return 'text-gray-400';   // Silver
      case 2:
        return 'text-amber-700';  // Bronze
      default:
        return 'text-gray-600';   // Others
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-xl shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-red-700" />
          <p className="mt-2 text-gray-600">Loading scoreboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white/85 p-8 rounded-xl shadow-lg">
        <MainNav />
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <Trophy className="h-8 w-8 text-red-700" />
          <h1 className="text-3xl font-bold text-gray-800">Scoreboard</h1>
        </div>

        <div className="space-y-4">
          {scores.map((score, index) => (
            <div
              key={score.userId}
              className="bg-white/80 rounded-lg p-4 shadow-md flex items-center justify-between transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center">
                  {index < 3 ? (
                    <Medal className={`h-6 w-6 ${getMedalColor(index)}`} />
                  ) : (
                    <span className="text-gray-600 font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">{score.username}</h3>
                  <p className="text-sm text-gray-600">{score.userId}</p>
                </div>
              </div>
              
              <div className="bg-red-700 text-white px-4 py-2 rounded-full font-bold">
                {score.totalScore} Points
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;