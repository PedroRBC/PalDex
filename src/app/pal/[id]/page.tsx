import { getPalById } from '@/services/palService';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { getTypeVariant } from "@/lib/utils";
import { cn } from "@/lib/utils";

function formatName(name: string): string {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = (await params);
  const pal = await getPalById(parseInt(id));
  
  return {
    title: `${pal.name}`,
  };
}

export default async function PalPage({ params }: Props ) {
  const { id } = (await params);
  const pal = await getPalById(parseInt(id));

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            asChild
          >
            <Link href="/" legacyBehavior>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to PalDex
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
          >
            <Link href={pal.wiki} target="_blank" rel="noopener noreferrer" legacyBehavior>
              View on Wiki
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative h-96 w-full bg-muted/20 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`https://paldex-api.pedrorbc.com${pal.image}`}
                    alt={pal.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold">{pal.name}</h1>
                  <div className="flex gap-1">
                    {Array.from({ length: pal.rarity }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {pal.types.map((type) => (
                    <Badge
                      key={type.name}
                      className={cn(getTypeVariant(type.name))}
                    >
                      {type.name}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-muted-foreground">{pal.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suitability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {pal.suitability.map((suit) => (
                    <Card key={suit.type}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src={`https://paldex-api.pedrorbc.com${suit.image}`}
                            alt={suit.type}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                          <span className="font-semibold">{formatName(suit.type)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Level: {suit.level}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breeding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Rank</p>
                    <p className="font-semibold">{pal.breeding.rank}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order</p>
                    <p className="font-semibold">{pal.breeding.order}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Male Probability</p>
                    <p className="font-semibold">{pal.breeding.male_probability}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Child Eligible</p>
                    <p className="font-semibold">{pal.breeding.child_eligble ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pal.drops.map((drop, index) => (
                    <Badge key={index} variant="secondary">
                      {formatName(drop)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-muted-foreground">HP</p>
                    <p className="font-semibold">{pal.stats.hp}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Attack (Melee)</p>
                    <p className="font-semibold">{pal.stats.attack.melee}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Attack (Ranged)</p>
                    <p className="font-semibold">{pal.stats.attack.ranged}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Defense</p>
                    <p className="font-semibold">{pal.stats.defense}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Speed (Walk)</p>
                    <p className="font-semibold">{pal.stats.speed.walk}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Speed (Run)</p>
                    <p className="font-semibold">{pal.stats.speed.run}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Speed (Ride)</p>
                    <p className="font-semibold">{pal.stats.speed.ride}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stamina</p>
                    <p className="font-semibold">{pal.stats.stamina}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Support</p>
                    <p className="font-semibold">{pal.stats.support}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Food</p>
                    <p className="font-semibold">{pal.stats.food}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aura</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">{formatName(pal.aura.name)}</h3>
                <p className="text-muted-foreground">{pal.aura.description}</p>
                {pal.aura.tech && (
                  <p className="text-sm text-muted-foreground mt-1">Tech: {pal.aura.tech}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pal.skills.map((skill, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{formatName(skill.name)}</h3>
                        <p className="text-muted-foreground">{skill.description}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Level: {skill.level}</span>
                          <span>Type: {skill.type}</span>
                          <span>Power: {skill.power}</span>
                          <span>Cooldown: {skill.cooldown}s</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 