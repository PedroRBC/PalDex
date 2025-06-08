import { useState } from 'react';
import { PalType } from '@/types/pal';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTypeVariant } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onTypeFilter: (types: string[]) => void;
  onRarityFilter: (rarity: number | null) => void;
  types: PalType[];
}

export default function SearchAndFilter({ onTypeFilter, onRarityFilter, types }: SearchAndFilterProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);

  const handleTypeToggle = (typeName: string) => {
    const newTypes = selectedTypes.includes(typeName)
      ? selectedTypes.filter(t => t !== typeName)
      : [...selectedTypes, typeName];
    setSelectedTypes(newTypes);
    onTypeFilter(newTypes);
  };

  const handleRarityChange = (rarity: number | null) => {
    setSelectedRarity(rarity);
    onRarityFilter(rarity);
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Type Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Types</h3>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Badge
                key={type.name}
                className={cn(
                  "cursor-pointer transition-opacity",
                  getTypeVariant(type.name),
                  selectedTypes.includes(type.name) ? 'opacity-100' : 'opacity-50'
                )}
                onClick={() => handleTypeToggle(type.name)}
              >
                {type.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rarity Filter */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Rarity</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((rarity) => (
              <Button
                key={rarity}
                onClick={() => handleRarityChange(selectedRarity === rarity ? null : rarity)}
                variant={selectedRarity === rarity ? "default" : "secondary"}
                size="sm"
                className="rounded-full"
              >
                {rarity}★
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 