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

const cleanStoryText = (text: string): string => {
  // Entferne den kompletten Optionen-Block inklusive Einleitung
  text = text.replace(/(?:die KI dir mehrere Optionen anbietet:)[\s\S]*$/, '');
  
  // Alternative Einleitungen für Optionen falls vorhanden
  text = text.replace(/(?:Deine Optionen sind:)[\s\S]*$/, '');
  text = text.replace(/(?:Du hast folgende Optionen:)[\s\S]*$/, '');
  text = text.replace(/(?:Du hast die Wahl:)[\s\S]*$/, '');
  text = text.replace(/(?:Du hast folgende Entscheidungen:)[\s\S]*$/, '');
  
  // Entferne überschüssige Leerzeilen am Ende
  text = text.replace(/\n+$/, '');
  
  return text;
};

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

      // Finde den Index der letzten System-Nachricht
      let lastSystemMessageIndex = -1;
      for (let i = data.length - 1; i >= 0; i--) {
        if (i % 2 === 0) { // System-Nachricht
          lastSystemMessageIndex = i;
          break;
        }
      }

      // Konvertiere das Array von Strings in StoryMessage-Objekte
      return data.map((text, index) => {
        const isUserMessage = index % 2 !== 0;
        
        if (!isUserMessage) {
          // System-Nachricht
          if (index === lastSystemMessageIndex) {
            // Letzte System-Nachricht: Behalte Optionen
            return {
              text: text,
              isUser: false,
              options: extractOptionsFromText(text)
            };
          } else {
            // Andere System-Nachrichten: Entferne Optionen
            return {
              text: cleanStoryText(text),
              isUser: false
            };
          }
        } else {
          // User-Nachricht
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