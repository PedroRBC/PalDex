export interface PalRequest {
    content: Pal[];
}

export interface Pal {
    id: number;
    key: string;
    image: string;
    name: string;
    wiki: string;
    types: PalType[];
    imageWiki: string;
    suitability: Suitability[];
    drops: string[];
    aura: Aura;
    description: string;
    skills: Skill[];
    stats: Stats;
    asset: string;
    genus: string;
    rarity: number;
    price: number;
    size: string;
    maps: Maps;
    breeding: Breeding;
}

export interface PalType {
    name: string;
    image: string;
}
  
interface Suitability {
    type: string;
    image: string;
    level: number;
}
  
interface Aura {
    name: string;
    description: string;
    tech: string | null;
}
  
interface Skill {
    level: number;
    name: string;
    type: string;
    cooldown: number;
    power: number;
    description: string;
}
  
interface AttackStats {
    melee: number;
    ranged: number;
}
  
interface SpeedStats {
    ride: number;
    run: number;
    walk: number;
}
  
interface Stats {
    hp: number;
    attack: AttackStats;
    defense: number;
    speed: SpeedStats;
    stamina: number;
    support: number;
    food: number;
}
  
interface Maps {
    day: string;
    night: string;
}
  
interface Breeding {
    rank: number;
    order: number;
    child_eligble: boolean;
    male_probability: number;
}