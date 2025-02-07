import axios from 'axios';

export interface ChatResponse {
    actionTime: number;
    score: number;
    userId: string;
    title: string;
    description: string;
    scoreReason: string;
  }
  
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

export const chatService = {
  async sendMessage(text: string): Promise<ChatResponse> {
    try {
      const response = await api.post<ChatResponse>('/actions', { text });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};