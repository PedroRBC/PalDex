import Image from 'next/image';
import Link from 'next/link';
import { Pal } from '@/types/pal';
import { Badge } from "@/components/ui/badge";
import { getTypeVariant } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PalCardProps {
  pal: Pal;
}

export default function PalCard({ pal }: PalCardProps) {
  return (
    <Link href={`/pal/${pal.id}`}>
      <div className="group bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 w-full bg-muted/20">
          <Image
            src={`https://paldex-api.pedrorbc.com${pal.image}`}
            alt={pal.name}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold truncate">{pal.name}</h3>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: pal.rarity }).map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {pal.types.map((type) => (
              <Badge
                key={type.name}
                className={cn("text-xs", getTypeVariant(type.name))}
              >
                {type.name}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{pal.description}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {pal.stats.speed.run} Speed
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {pal.stats.attack.melee} ATK
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {pal.stats.defense} DEF
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 