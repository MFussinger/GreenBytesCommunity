// storyHistoryService.ts
import axios from 'axios';

export interface StoryMessage {
  text: string;
  isUser: boolean;
  options?: string[];
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

const extractOptionsFromText = (text: string): string[] => {
  const options: string[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const match = line.match(/\d+\.\s+\*\*(.*?)\*\*/);
    if (match && match[1]) {
      options.push(match[1].trim());
    }
  }
  
  return options;
};

export const storyHistoryService = {
  async getStoryHistory(): Promise<StoryMessage[]> {
    try {
      const { data } = await api.get<string[]>('/story');
      
      if (!data || data.length === 0) {
        return [];
      }

      // Konvertiere das Array von Strings in StoryMessage-Objekte
      return data.map((text, index) => {
        const isUserMessage = index % 2 !== 0;
        
        if (!isUserMessage) {
          // System-Nachricht (gerade Index)
          const options = extractOptionsFromText(text);
          return {
            text: text,  // Behalte den kompletten Text
            isUser: false,
            options: options
          };
        } else {
          // User-Nachricht (ungerade Index)
          return {
            text: text,
            isUser: true
          };
        }
      });
    } catch (error) {
      console.error('Error fetching story history:', error);
      return [];
    }
  }
};