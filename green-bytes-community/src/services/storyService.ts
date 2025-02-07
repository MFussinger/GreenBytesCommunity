import axios, { AxiosError } from 'axios';

export interface StoryResponse {
  message: string;
  options?: string[];
  currentScene?: string;
  points?: number;
}

export interface ErrorResponse {
  error: string;
}

export type StoryType = 'cyberpunk' | 'fantasy' | 'space';

export const STORY_PROLOGS = {
  cyberpunk: `Unser Protagonist bewegt sich durch Tor X und landet in einer dystopischen Cyberpunk Welt.
Das Tor öffnet sich und plötzlich stolperte er dahinter fast über einen Cyberpsycho der mit einer virtual Reality Brille zappelnd auf der blinkenden walk forward Markierung des Gehwegs lag. Die KI sagte ihm dann...`,
  
  fantasy: `Unser Protagonist bewegt sich durch Tor X und landet in einer Mittelalterlichen Fantasy-Welt.
Unser Herr durchschreitet das Tor und befindet sich plötzlich direkt vor einen nächsten Tor, dieses mal aber ein altes spartanisch gebautes Steintor, um ihn herum war die Luft stickig und es roch nach Unrat..Die KI empfahl ihm...`,
  
  space: `Unser Protagonist bewegt sich durch Tor X  und befand sich tief im weiten Weltall - ganz allein.
Im Portal plötzlich beschleunigte sich seine geschwindkeit und um ihn herum entstand ein Raumschiff. Dann schoss er mit dem SlipStream Antrieb durch die unendlichen Weiten eines Universums...KI steuer bitte den nächsten habitablen Planet im Äther an.`
};

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

export class InsufficientFundsError extends Error {
  constructor() {
    super('Insufficient funds');
    this.name = 'InsufficientFundsError';
  }
}

export const storyService = {
  async sendMessage(text: string): Promise<StoryResponse> {
    try {
      const response = await api.post<StoryResponse>('/story', { text });
      return response.data;
    } catch (error) {
      // Prüfe ob es sich um einen Axios Error handelt
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        
        // Prüfe auf "Insufficient funds" Fehler
        if (errorData.error === 'Insufficient funds') {
          throw new InsufficientFundsError();
        }
      }
      
      // Wenn es ein anderer Fehler ist, wirf ihn weiter
      throw error;
    }
  }
};