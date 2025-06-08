import { getPalById } from "@/services/palService"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Zap, Shield, Heart, Gauge, Star, Map } from "lucide-react"
import type { Metadata, ResolvingMetadata } from "next"
import { getTypeVariant } from "@/lib/utils"
import { cn } from "@/lib/utils"
import TypeBackground from "@/components/TypeBackground"

function formatName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await params
  const pal = await getPalById(Number.parseInt(id))

  return {
    title: `${pal.name}`,
    description: pal.description,
  }
}

export default async function PalPage({ params }: Props) {
  const { id } = await params
  const pal = await getPalById(Number.parseInt(id))

  const primaryType = pal.types[0]?.name.toLowerCase() || "normal"

  const maxStat = Math.max(
    pal.stats.hp,
    pal.stats.attack.melee,
    pal.stats.attack.ranged,
    pal.stats.defense,
    pal.stats.speed.run,
    pal.stats.stamina,
  )

  const getStatIcon = (statType: string) => {
    switch (statType) {
      case "hp":
        return <Heart className="w-4 h-4 text-red-500" />
      case "attack":
        return <Zap className="w-4 h-4 text-orange-500" />
      case "defense":
        return <Shield className="w-4 h-4 text-blue-500" />
      case "speed":
        return <Gauge className="w-4 h-4 text-green-500" />
      default:
        return <Star className="w-4 h-4 text-purple-500" />
    }
  }

  return (
    <TypeBackground type={primaryType}>
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with enhanced styling */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            asChild
            className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to PalDex
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
          >
            <Link href={pal.wiki} target="_blank" rel="noopener noreferrer">
              View on Wiki
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Enhanced Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hero Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Image section with enhanced styling */}
                <div className="relative h-96 w-full bg-gradient-to-b from-white/5 to-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                  <Image
                    src={`https://paldex-api.pedrorbc.com${pal.image}`}
                    alt={pal.name}
                    fill
                    className="object-contain p-6 hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                  />

                  {/* Floating rarity stars */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {Array.from({ length: pal.rarity }).map((_, i) => (
                      <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                        <svg
                          className="w-6 h-6 text-yellow-400 drop-shadow-lg filter"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info section */}
                <div className="p-6 space-y-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {pal.name}
                  </h1>

                  <div className="flex flex-wrap gap-2">
                    {pal.types.map((type, index) => (
                      <Badge
                        key={type.name}
                        className={cn(
                          "text-sm font-medium px-4 py-2 rounded-full border-0 shadow-lg",
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

                  <p className="text-muted-foreground leading-relaxed text-lg">{pal.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Suitability Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Star className="w-5 h-5 text-blue-500" />
                  </div>
                  Suitability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pal.suitability.map((suit, index) => (
                    <div
                      key={suit.type}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-white/20">
                          <Image
                            src={`https://paldex-api.pedrorbc.com${suit.image}`}
                            alt={suit.type}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-semibold">{formatName(suit.type)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Level:</span>
                        <Badge variant="secondary" className="text-xs">
                          {suit.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spawn Maps Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-emerald-500/20">
                    <Map className="w-5 h-5 text-emerald-500" />
                  </div>
                  Spawn Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {/* Day Map */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-sm font-medium">Day Spawn</span>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20">
                      <Image
                        src={`https://paldex-api.pedrorbc.com${pal.maps.day}`}
                        alt={`${pal.name} day spawn locations`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Night Map */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-sm font-medium">Night Spawn</span>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20">
                      <Image
                        src={`https://paldex-api.pedrorbc.com${pal.maps.night}`}
                        alt={`${pal.name} night spawn locations`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breeding & Drops Cards */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle>Breeding Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-muted-foreground mb-1">Rank</p>
                      <p className="font-bold text-lg">{pal.breeding.rank}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-muted-foreground mb-1">Order</p>
                      <p className="font-bold text-lg">{pal.breeding.order}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-muted-foreground mb-1">Male %</p>
                      <p className="font-bold text-lg">{pal.breeding.male_probability}%</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-muted-foreground mb-1">Child Eligible</p>
                      <p className="font-bold text-lg">{pal.breeding.child_eligble ? "✓" : "✗"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle>Drops</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {pal.drops.map((drop, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 transition-colors duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {formatName(drop)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Enhanced Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Stats Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Gauge className="w-5 h-5 text-purple-500" />
                  </div>
                  Combat Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { label: "HP", value: pal.stats.hp, icon: "hp", color: "red" },
                    { label: "Melee ATK", value: pal.stats.attack.melee, icon: "attack", color: "orange" },
                    { label: "Ranged ATK", value: pal.stats.attack.ranged, icon: "attack", color: "yellow" },
                    { label: "Defense", value: pal.stats.defense, icon: "defense", color: "blue" },
                    { label: "Walk Speed", value: pal.stats.speed.walk, icon: "speed", color: "green" },
                    { label: "Run Speed", value: pal.stats.speed.run, icon: "speed", color: "emerald" },
                    { label: "Ride Speed", value: pal.stats.speed.ride, icon: "speed", color: "teal" },
                    { label: "Stamina", value: pal.stats.stamina, icon: "hp", color: "purple" },
                    { label: "Support", value: pal.stats.support, icon: "hp", color: "pink" },
                    { label: "Food", value: pal.stats.food, icon: "hp", color: "amber" },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {getStatIcon(stat.icon)}
                        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                      </div>
                      <div className="text-xl font-bold mb-2">{stat.value}</div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-1000 ease-out",
                            `bg-${stat.color}-500`,
                          )}
                          style={{ width: `${Math.min((stat.value / maxStat) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Aura Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-indigo-500/20">
                    <Zap className="w-5 h-5 text-indigo-500" />
                  </div>
                  Aura Ability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/20">
                  <h3 className="text-xl font-bold mb-2 text-indigo-300">{formatName(pal.aura.name)}</h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{pal.aura.description}</p>
                  {pal.aura.tech && (
                    <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                      Tech: {pal.aura.tech}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Skills Card */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-emerald-500/20">
                    <Star className="w-5 h-5 text-emerald-500" />
                  </div>
                  Skills & Abilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pal.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-emerald-300">{formatName(skill.name)}</h3>
                        <Badge className={cn("ml-2", getTypeVariant(skill.type))}>{skill.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="text-center p-2 rounded-lg bg-white/10">
                          <p className="text-xs text-muted-foreground mb-1">Level</p>
                          <p className="font-semibold">{skill.level}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white/10">
                          <p className="text-xs text-muted-foreground mb-1">Power</p>
                          <p className="font-semibold">{skill.power}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white/10">
                          <p className="text-xs text-muted-foreground mb-1">Cooldown</p>
                          <p className="font-semibold">{skill.cooldown}s</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white/10">
                          <p className="text-xs text-muted-foreground mb-1">Type</p>
                          <p className="font-semibold text-xs">{skill.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TypeBackground>
  )
}
