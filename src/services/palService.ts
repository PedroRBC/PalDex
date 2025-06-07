import { Pal, PalRequest } from '@/types/pal';
import axios from 'axios';

const API_BASE_URL = 'https://paldex-api.pedrorbc.com';

const api = axios.create({
  baseURL: API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAllPals(): Promise<Pal[]> {
  try {
    const { data } = await api.get<PalRequest>('');
    return data.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch pals: ${error.message}`);
    }
    throw error;
  }
}

export async function getPalById(id: number): Promise<Pal> {
  try {
    const { data } = await api.get<{ content: Pal }>(`/${id}`);
    return data.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch pal: ${error.message}`);
    }
    throw error;
  }
}

export async function searchPalByName(query: string): Promise<Pal[]> {
  try {
    const { data } = await api.get<PalRequest>('/search/' + query)
    return data.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to search pals: ${error.message}`);
    }
    throw error;
  }
} 