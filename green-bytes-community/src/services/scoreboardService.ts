import axios from 'axios';

export interface ScoreboardEntry {
  userId: string;
  totalScore: number;
  username?: string;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

// Konstante Usernames für die Darstellung
const usernames: Record<string, string> = {
  'user-99': 'EcoWarrior',
  'user-36': 'GreenChampion',
  'user-42': 'SustainableHero',
  'user-55': 'EarthGuardian'
};

// Fallback Usernames für neue, unbekannte User-IDs
const fallbackUsernames = [
  'NatureDefender',
  'ClimateGuardian',
  'EnviroHero',
  'GreenInnovator',
  'EarthProtector',
  'SustainabilityPro',
  'EcoChampion',
  'PlanetSaver'
];

let fallbackUsernameIndex = 0;

export const scoreboardService = {
  async getScores(): Promise<ScoreboardEntry[]> {
    try {
      const { data } = await api.get<ScoreboardEntry[]>('/scoreboard');
      
      // Sortiere nach Punkten absteigend
      const sortedData = data.sort((a, b) => b.totalScore - a.totalScore);
      
      // Füge Usernamen hinzu
      return sortedData.map(entry => {
        // Wenn wir einen vordefinierten Username haben, nutze diesen
        if (usernames[entry.userId]) {
          return {
            ...entry,
            username: usernames[entry.userId]
          };
        }
        
        // Sonst vergebe einen Fallback-Username
        const fallbackUsername = fallbackUsernames[fallbackUsernameIndex];
        fallbackUsernameIndex = (fallbackUsernameIndex + 1) % fallbackUsernames.length;
        
        return {
          ...entry,
          username: fallbackUsername
        };
      });
    } catch (error) {
      console.error('Error fetching scoreboard:', error);
      throw error;
    }
  }
};