'use client';

import { useState, useMemo } from 'react';
import { Pal, PalType } from '@/types/pal';
import PalCard from './PalCard';
import SearchAndFilter from './SearchAndFilter';
import { useSearch } from '@/contexts/SearchContext';

interface SearchClientProps {
  pals: Pal[];
}

export default function SearchClient({ pals }: SearchClientProps) {
  const { searchQuery } = useSearch();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);

  const filteredPals = useMemo(() => {
    return pals.filter(pal => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        pal.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Type filter
      const matchesTypes = selectedTypes.length === 0 || 
        pal.types.some(type => selectedTypes.includes(type.name));

      // Rarity filter
      const matchesRarity = selectedRarity === null || 
        pal.rarity === selectedRarity;

      return matchesSearch && matchesTypes && matchesRarity;
    });
  }, [pals, searchQuery, selectedTypes, selectedRarity]);

  const uniqueTypes = useMemo(() => {
    const typeMap = new Map<string, PalType>();
    pals.forEach(pal => {
      pal.types.forEach(type => {
        if (!typeMap.has(type.name)) {
          typeMap.set(type.name, type);
        }
      });
    });
    return Array.from(typeMap.values());
  }, [pals]);

  return (
    <div>
      <SearchAndFilter
        onSearch={() => {}} // This is now handled by the context
        onTypeFilter={setSelectedTypes}
        onRarityFilter={setSelectedRarity}
        types={uniqueTypes}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPals.map((pal) => (
          <PalCard key={pal.id} pal={pal} />
        ))}
      </div>
    </div>
  );
} 