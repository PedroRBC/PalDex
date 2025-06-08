import Image from "next/image"
import Link from "next/link"
import type { Pal } from "@/types/pal"
import { Badge } from "@/components/ui/badge"
import { getTypeVariant } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PalCardProps {
  pal: Pal
}

export default function PalCard({ pal }: PalCardProps) {
  const primaryType = pal.types[0]?.name.toLowerCase() || "normal"

  const getTypeGradient = (type: string) => {
    const gradients: Record<string, string> = {
      fire: "from-red-500/20 via-orange-500/10 to-yellow-500/20",
      water: "from-blue-500/20 via-cyan-500/10 to-blue-600/20",
      grass: "from-green-500/20 via-emerald-500/10 to-green-600/20",
      electric: "from-yellow-400/20 via-yellow-500/10 to-amber-500/20",
      ice: "from-cyan-400/20 via-blue-300/10 to-indigo-400/20",
      dark: "from-gray-800/20 via-gray-700/10 to-black/20",
      dragon: "from-purple-600/20 via-indigo-500/10 to-purple-700/20",
      neutral: "from-gray-400/20 via-gray-300/10 to-gray-500/20",
      normal: "from-gray-400/20 via-gray-300/10 to-gray-500/20",
    }
    return gradients[type] || gradients.normal
  }

  const maxStat = Math.max(pal.stats.speed.run, pal.stats.attack.melee, pal.stats.defense)

  return (
    <Link href={`/pal/${pal.id}`} className="group block">
      <div
        className={cn(
          "relative bg-gradient-to-br",
          getTypeGradient(primaryType),
          "backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl",
          "overflow-hidden transition-all duration-500 ease-out",
          "transform hover:-translate-y-2 hover:scale-[1.02]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        )}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse" />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Image section with enhanced styling */}
        <div className="relative h-52 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
          <Image
            src={`https://paldex-api.pedrorbc.com${pal.image}`}
            alt={pal.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out filter group-hover:drop-shadow-2xl"
          />

          {/* Floating rarity stars */}
          <div className="absolute top-3 right-3 flex items-center gap-0.5">
            {Array.from({ length: pal.rarity }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                <svg
                  className="w-4 h-4 text-yellow-400 drop-shadow-lg filter group-hover:text-yellow-300 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Content section */}
        <div className="relative p-5 bg-gradient-to-t from-black/5 to-transparent backdrop-blur-sm">
          {/* Name */}
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 truncate">
            {pal.name}
          </h3>

          {/* Type badges with enhanced styling */}
          <div className="flex flex-wrap gap-2 mb-3">
            {pal.types.map((type, index) => (
              <Badge
                key={type.name}
                className={cn(
                  "text-xs font-medium px-3 py-1 rounded-full border-0 shadow-md",
                  "transform transition-all duration-300 hover:scale-105",
                  getTypeVariant(type.name),
                  "animate-fade-in",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {type.name}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">{pal.description}</p>

          {/* Enhanced stats section */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {/* Speed */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="p-1.5 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Speed</div>
                <div className="text-sm font-bold">{pal.stats.speed.run}</div>
                <div className="w-full bg-muted/30 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-400"
                    style={{ width: `${(pal.stats.speed.run / maxStat) * 100}%` }}
                  />
                </div>
              </div>

              {/* Attack */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="p-1.5 rounded-full bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
                    <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Attack</div>
                <div className="text-sm font-bold">{pal.stats.attack.melee}</div>
                <div className="w-full bg-muted/30 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-red-500 h-1.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-red-400"
                    style={{ width: `${(pal.stats.attack.melee / maxStat) * 100}%` }}
                  />
                </div>
              </div>

              {/* Defense */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="p-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors duration-300">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Defense</div>
                <div className="text-sm font-bold">{pal.stats.defense}</div>
                <div className="w-full bg-muted/30 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-green-400"
                    style={{ width: `${(pal.stats.defense / maxStat) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-1 rounded-full bg-primary/20">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
