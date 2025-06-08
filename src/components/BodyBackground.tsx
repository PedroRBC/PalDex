"use client"

import { useType } from "@/contexts/TypeContext"
import { cn } from "@/lib/utils"

const getTypeGradient = (type: string) => {
  const gradients: Record<string, string> = {
    fire: "from-red-500/10 via-orange-500/5 to-yellow-500/10",
    water: "from-blue-500/10 via-cyan-500/5 to-blue-600/10",
    grass: "from-green-500/10 via-emerald-500/5 to-green-600/10",
    electric: "from-yellow-400/10 via-yellow-500/5 to-amber-500/10",
    ice: "from-cyan-400/10 via-blue-300/5 to-indigo-400/10",
    dark: "from-gray-800/10 via-gray-700/5 to-black/10",
    dragon: "from-purple-600/10 via-indigo-500/5 to-purple-700/10",
    neutral: "from-gray-400/10 via-gray-300/5 to-gray-500/10",
    normal: "from-gray-400/10 via-gray-300/5 to-gray-500/10",
  }
  return gradients[type] || gradients.normal
}

export default function BodyBackground() {
  const { currentType } = useType()

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 bg-gradient-to-br",
        getTypeGradient(currentType),
        "transition-colors duration-500"
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
} 