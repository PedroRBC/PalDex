import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function Header() {
  return (
    <Card className="mb-8">
      <CardHeader className="text-center">
        <CardTitle className="text-5xl font-bold">PalDex</CardTitle>
        <p className="text-xl text-muted-foreground mt-2">
          Discover and learn about all Pals in Palworld
        </p>
      </CardHeader>
    </Card>
  );
}