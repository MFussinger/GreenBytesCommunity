import axios from 'axios';

export interface MarketItem {
  userId: string;
  createdAt: number;
  state: 'available' | 'sold';
  title: string;
  description: string;
  price: number;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-API-KEY': 'Ha9FgzwUZ19rsbXxIs7JL1BhJ49gFF5X35ca4IAk'
  }
});

export const marketService = {
  async getItems(): Promise<MarketItem[]> {
    try {
      const { data } = await api.get('/market/items');
      return data;
    } catch (error) {
      console.error('Error fetching market items:', error);
      throw error;
    }
  },

  async createItem(item: Omit<MarketItem, 'createdAt'>): Promise<MarketItem> {
    try {
      const { data } = await api.post('/market/items', item);
      return data;
    } catch (error) {
      console.error('Error creating market item:', error);
      throw error;
    }
  }
};