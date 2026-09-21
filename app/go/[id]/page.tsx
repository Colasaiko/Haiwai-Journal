import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Redirector from './Redirector';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  }
};

// Tell Next.js to pre-render all known IDs
export function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'ordered_airports.json');
  try {
    const airports = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return airports.map((a: { id: string }) => ({
      id: a.id,
    }));
  } catch {
    return [];
  }
}

export default function GoPage({ params }: { params: { id: string } }) {
  const dataPath = path.join(process.cwd(), 'ordered_airports.json');
  let airports: { id: string, name: string, link: string }[] = [];
  try {
    airports = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error("Failed to load airports", e);
  }

  const airport = airports.find(a => a.id === params.id);
  
  if (!airport || !airport.link || airport.link === '#') {
    notFound();
  }

  return (
    <Redirector url={airport.link} name={airport.name} />
  );
}
