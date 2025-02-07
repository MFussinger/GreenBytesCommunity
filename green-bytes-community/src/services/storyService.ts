import axios, { AxiosError } from 'axios';

export interface StoryResponse {
  message?: string;
  text?: string;
  options?: string[];
  currentScene?: string;
  points?: number;
  decisionId?: string;
}

export interface StoryDecision {
  text: string;
  timestamp: number;
  decisionId?: string;
  selectedOption: string;
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

const STORAGE_KEY = 'story_decisions';

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

function extractOptionsFromText(text: string): string[] {
  const options: string[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const match = line.match(/\d+\.\s+\*\*(.*?)\*\*/);
    if (match && match[1]) {
      options.push(match[1].trim());
    }
  }
  
  return options;
}

function loadStoredDecisions(): StoryDecision[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveDecision(decision: StoryDecision) {
  const decisions = loadStoredDecisions();
  decisions.push(decision);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
}

export const storyService = {
  async sendMessage(text: string, storyType?: StoryType): Promise<StoryResponse> {
    try {
      // Erstelle das Request-Payload basierend darauf, ob es die erste Nachricht ist
      const payload = storyType ? {
        text,
        prolog: STORY_PROLOGS[storyType]  // Füge Prolog nur bei der ersten Nachricht hinzu
      } : {
        text
      };

      const response = await api.post<StoryResponse>('/story', payload);
      const storyText = response.data.text || response.data.message || '';
      const options = extractOptionsFromText(storyText);
      
      if (text && text.trim() !== '') {
        saveDecision({
          text: storyText,
          timestamp: Date.now(),
          decisionId: response.data.decisionId,
          selectedOption: text
        });
      }
      
      return {
        message: storyText,
        options: options,
        decisionId: response.data.decisionId
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        if (errorData.error === 'Insufficient funds') {
          throw new InsufficientFundsError();
        }
      }
      throw error;
    }
  },

  getStoredDecisions(): StoryDecision[] {
    return loadStoredDecisions();
  },

  resetStory() {
    localStorage.removeItem(STORAGE_KEY);
  }
};