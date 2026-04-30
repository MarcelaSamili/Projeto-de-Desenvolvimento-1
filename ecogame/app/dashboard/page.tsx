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
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-2">Olá 👋</h1>

      <p className="text-slate-400 mb-6">{user?.email}</p>

      {/* CARD DE PROGRESSO */}
      <div className="bg-slate-800 p-4 rounded-xl mb-6">
        <p className="mb-2">Nível {level}</p>

        <div className="w-full bg-slate-700 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          {xp} XP / {xpParaProximoNivel} XP
        </p>
      </div>

      {/* BOTÃO QUIZ */}
      <button
        onClick={() => router.push('/quiz/start')}
        className="bg-green-500 px-4 py-2 rounded-xl mb-4"
      >
        Começar Quiz 🎮
      </button>

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await logout();
          router.push('/login');
        }}
        className="bg-red-500 px-4 py-2 rounded-xl"
      >
        Sair
      </button>
      {/* RANKING */}
      <button
        onClick={() => router.push('/ranking')}
        className="bg-blue-500 px-4 py-2 rounded-xl ml-2"
      >
        Ver Ranking 🏆
      </button>
      {/* PROFILE */}
      <button
        onClick={() => router.push('/profile')}
        className="bg-purple-500 px-4 py-2 rounded-xl ml-2"
      >
        Perfil 👤
      </button>
    </main>
  );
}
