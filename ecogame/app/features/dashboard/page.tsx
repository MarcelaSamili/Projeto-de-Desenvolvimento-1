export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Olá, Usuário 👋</h1>

      <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <p>Nível 1</p>
        <div className="w-full bg-slate-700 h-3 rounded mt-2">
          <div className="bg-green-500 h-3 rounded w-1/3"></div>
        </div>
      </div>

      <button className="bg-green-500 px-4 py-2 rounded-xl">
        Começar Quiz
      </button>
    </main>
  );
}
