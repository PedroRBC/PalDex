'use server';

import { getAllPals, searchPalByName } from '@/services/palService';
import { Pal } from '@/types/pal';

export async function getPals(): Promise<Pal[]> {
  try {
    const data = await getAllPals();
    return data;
  } catch (error) {
    console.error('Failed to fetch pals:', error);
    throw error;
  }
}

export async function searchPals(query: string): Promise<Pal[]> {
  try {
    if (!query.trim()) {
      return await getPals();
    }
    const results = await searchPalByName(query);
    return results;
  } catch (error) {
    console.error('Failed to search pals:', error);
    throw error;
  }
} 