'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/features/user/getUserData';
import { logout } from '@/features/auth/logout';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [dados, setDados] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);

        const data = await getUserData(user.uid);
        setDados(data);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!dados) {
    return <p className="text-white p-6">Carregando...</p>;
  }

  const xp = dados.xp || 0;
  const level = dados.level || 1;

  // regra simples de nível
  const xpParaProximoNivel = level * 100;
  const progresso = (xp / xpParaProximoNivel) * 100;

  return (
    <main className="min-h-screen bg-linear-to-br from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden p-6 md:p-10">
      {/* GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full mb-4">
              🌿 EcoGame Dashboard
            </div>

            <h1 className="text-5xl font-black mb-2">Olá 👋</h1>

            <p className="text-white/60 text-lg">{dados.nick || user?.email}</p>
          </div>

          {/* PROFILE CARD */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 min-w-70">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-3xl bg-green-500 flex items-center justify-center text-3xl shadow-2xl shadow-green-500/20">
                🌱
              </div>

              <div>
                <p className="text-white/60 text-sm">Nível atual</p>

                <h2 className="text-3xl font-black text-green-400">{level}</h2>

                <p className="text-sm text-white/60 mt-1">Guardião Verde</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* XP */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">XP Total</h3>

              <span className="text-3xl">⚡</span>
            </div>

            <h2 className="text-5xl font-black text-green-400 mb-4">{xp}</h2>

            <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-green-400 to-emerald-300 h-4 rounded-full transition-all duration-700"
                style={{ width: `${progresso}%` }}
              />
            </div>

            <p className="text-sm text-white/60 mt-3">
              {xp} / {xpParaProximoNivel} XP
            </p>
          </div>

          {/* STREAK */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Streak</h3>

              <span className="text-3xl">🔥</span>
            </div>

            <h2 className="text-5xl font-black text-orange-400">
              {dados.streak || 0}
            </h2>

            <p className="text-white/60 mt-3">dias consecutivos</p>
          </div>

          {/* VIDAS */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Vidas</h3>

              <span className="text-3xl">❤️</span>
            </div>

            <h2 className="text-5xl font-black text-red-400">
              {dados.vidas || 5}
            </h2>

            <p className="text-white/60 mt-3">vidas disponíveis</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* QUIZ */}
          <button
            onClick={() => router.push('/quiz/start')}
            className="group bg-linear-to-br from-green-500 to-emerald-400 text-black rounded-[32px] p-8 text-left transition-all duration-500 hover:scale-[1.03] shadow-2xl shadow-green-500/20"
          >
            <div className="text-5xl mb-6 transition-transform duration-500 group-hover:rotate-12">
              🎮
            </div>

            <h2 className="text-3xl font-black mb-3">Começar Quiz</h2>

            <p className="text-black/70 text-lg">Ganhe XP e suba no ranking.</p>
          </button>

          {/* RANKING */}
          <button
            onClick={() => router.push('/ranking')}
            className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-left transition-all duration-500 hover:bg-white/10 hover:-translate-y-2"
          >
            <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">
              🏆
            </div>

            <h2 className="text-3xl font-black mb-3">Ranking</h2>

            <p className="text-white/60 text-lg">Veja os melhores jogadores.</p>
          </button>

          {/* PERFIL */}
          <button
            onClick={() => router.push('/profile')}
            className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-left transition-all duration-500 hover:bg-white/10 hover:-translate-y-2"
          >
            <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">
              👤
            </div>

            <h2 className="text-3xl font-black mb-3">Perfil</h2>

            <p className="text-white/60 text-lg">Personalize sua conta.</p>
          </button>
        </div>

        {/* LOGOUT */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={async () => {
              await logout();
              router.push('/');
            }}
            className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-3 rounded-2xl hover:bg-red-500/20 transition-all duration-300"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </main>
  );
}
