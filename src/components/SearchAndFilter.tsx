"use client"

import { useState } from "react"
import type { PalType } from "@/types/pal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { getTypeVariant } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { X, Filter, Sparkles } from "lucide-react"

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onTypeFilter: (types: string[]) => void
  onRarityFilter: (rarity: number | null) => void
  types: PalType[]
  maxRarity?: number
}

export default function SearchAndFilter({
  onSearch,
  onTypeFilter,
  onRarityFilter,
  types,
  maxRarity = 10,
}: SearchAndFilterProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [rarityRange, setRarityRange] = useState<number[]>([1, maxRarity])
  const [searchQuery, setSearchQuery] = useState("")

  const handleTypeToggle = (typeName: string) => {
    const newTypes = selectedTypes.includes(typeName)
      ? selectedTypes.filter((t) => t !== typeName)
      : [...selectedTypes, typeName]
    setSelectedTypes(newTypes)
    onTypeFilter(newTypes)
  }

  const handleRarityChange = (values: number[]) => {
    setRarityRange(values)
    // If the range covers all rarities, pass null (no filter)
    if (values[0] === 1 && values[1] === maxRarity) {
      onRarityFilter(null)
    } else {
      // For now, we'll use the minimum value as the filter
      // You might want to modify your parent component to handle ranges
      onRarityFilter(values[0])
    }
  }


  const clearAllFilters = () => {
    setSelectedTypes([])
    setRarityRange([1, maxRarity])
    setSearchQuery("")
    onTypeFilter([])
    onRarityFilter(null)
    onSearch("")
  }

  const hasActiveFilters =
    selectedTypes.length > 0 || rarityRange[0] !== 1 || rarityRange[1] !== maxRarity || searchQuery.length > 0

  return (
    <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-lg mb-6">
      <div className="px-4 space-y-4">
  

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Types */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-medium text-muted-foreground">Types</span>
              {selectedTypes.length > 0 && (
                <Badge className="h-4 text-xs bg-blue-500/20 text-blue-300">{selectedTypes.length}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {types.map((type) => {
                const isSelected = selectedTypes.includes(type.name)
                return (
                  <Badge
                    key={type.name}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105 text-xs px-2 py-1",
                      getTypeVariant(type.name),
                      isSelected ? "opacity-100 ring-1 ring-white/30" : "opacity-50 hover:opacity-75",
                    )}
                    onClick={() => handleTypeToggle(type.name)}
                  >
                    {type.name}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Rarity Slider */}
          <div className="sm:w-48">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-medium text-muted-foreground">Rarity</span>
              <span className="text-xs text-yellow-400">
                {rarityRange[0] === rarityRange[1] ? `${rarityRange[0]}★` : `${rarityRange[0]}★ - ${rarityRange[1]}★`}
              </span>
            </div>
            <div className="px-2">
              <Slider
                value={rarityRange}
                onValueChange={handleRarityChange}
                max={maxRarity}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1★</span>
                <span>{maxRarity}★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-3 h-3 mr-1" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
