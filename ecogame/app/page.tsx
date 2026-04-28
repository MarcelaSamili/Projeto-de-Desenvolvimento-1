export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-4">EcoGame 🌱</h1>

      <p className="text-center max-w-md text-slate-300 mb-6">
        Aprenda sustentabilidade jogando, ganhe XP e ajude o planeta.
      </p>

      <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold">
        Começar
      </button>
    </main>
  );
}
