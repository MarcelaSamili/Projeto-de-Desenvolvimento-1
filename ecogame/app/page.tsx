'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-400 mb-4">EcoGame 🌱</h1>
      <p className="text-center max-w-md text-slate-300 mb-6">
        Aprenda sustentabilidade jogando, ganhe XP e ajude o planeta.
      </p>
      <button
        onClick={() => router.push('/login')}
        className="bg-green-500 px-6 py-3 rounded-xl"
      >
        Começar
      </button>
    </main>
  );
}
