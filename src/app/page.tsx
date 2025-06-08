import { getPals } from './actions';
import SearchClient from '@/components/SearchClient';
import { PalType } from '@/types/pal';

export default async function Home() {
  const pals = await getPals();
  
  // Extract unique types using a Map to ensure uniqueness by type name
  const typesMap = new Map<string, PalType>();
  pals.forEach(pal => {
    pal.types.forEach(type => {
      if (!typesMap.has(type.name)) {
        typesMap.set(type.name, type);
      }
    });
  });


  return (
    <main className="min-h-screen">
      <SearchClient  pals={pals} />
    </main>
  );
}
