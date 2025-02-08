import axios from 'axios';

export interface ScoreboardEntry {
  userId: string;
  totalScore: number;
  username?: string; // Wird später vom Backend kommen
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

// Mock usernames mapping - später vom Backend
const usernames: Record<string, string> = {
  'user-99': 'EcoWarrior',
  'user-36': 'GreenChampion',
  'user-42': 'SustainableHero',
  'user-55': 'EarthGuardian'
};

export const scoreboardService = {
  async getScores(): Promise<ScoreboardEntry[]> {
    try {
      // Später der echte API call
      const mockData = [
        { userId: "user-99", totalScore: 40 },
        { userId: "user-36", totalScore: 106 },
        { userId: "user-42", totalScore: 315 },
        { userId: "user-55", totalScore: 75 }
      ];

      // Sortiere nach Punkten absteigend
      const sortedData = mockData.sort((a, b) => b.totalScore - a.totalScore);
      
      // Füge Usernamen hinzu
      return sortedData.map(entry => ({
        ...entry,
        username: usernames[entry.userId] || 'Anonymous Player'
      }));
    } catch (error) {
      console.error('Error fetching scoreboard:', error);
      throw error;
    }
  }
};