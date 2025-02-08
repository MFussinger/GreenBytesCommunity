import axios from 'axios';

export interface ProfileResponse {
  payableScore: number;
  totalScore: number;
  userId: string;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

export const profileService = {
  async getProfile(): Promise<ProfileResponse> {
    try {
      const { data } = await api.get<ProfileResponse>('/profile');
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};