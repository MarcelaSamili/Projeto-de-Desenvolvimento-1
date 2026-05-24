'use client';

import { useEffect, useState } from 'react';
import { getRanking } from '@/features/ranking/getRanking';
import { Button } from '@/components/ui/button';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function Ranking() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const data = await getRanking();
      setUsers(data);
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-emerald-700  from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden p-6 md:p-10">
      {/* GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Button
          className=" text-white mb-6 border rounded-4xl p-2 bg-emerald-600 border-emerald-600"
          onClick={() => router.push('/dashboard')}
        >
          <FaArrowLeftLong />
        </Button>

        {/* HEADER */}
        <div className="mt-10 mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-5">
            🏆 EcoGame Ranking
          </div>

          <h1 className="text-5xl font-black mb-3">Hall dos Campeões</h1>

          <p className="text-white/60 text-lg">
            Os jogadores com mais XP do EcoGame.
          </p>
        </div>

        {/* TOP 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* 2º */}
          {users[1] && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 flex flex-col items-center justify-center mt-10 hover:-translate-y-2 transition-all duration-500">
              <div className="text-6xl mb-4">🥈</div>

              <div className="w-24 h-24 rounded-3xl bg-gray-300 flex items-center justify-center text-4xl mb-5 text-black shadow-2xl">
                ⚡
              </div>

              <h2 className="text-2xl font-black mb-2">
                {users[1].nickname || 'Usuário'}
              </h2>

              <p className="text-white/60 mb-4">2º Lugar</p>

              <div className="bg-white/5 border border-white/10 px-5 py-2 rounded-2xl">
                {users[1].xp} XP
              </div>
            </div>
          )}

          {/* 1º */}
          {users[0] && (
            <div className="bg-gradient-to-br from-yellow-500 to-amber-300 text-black rounded-[40px] p-10 flex flex-col items-center justify-center scale-105 shadow-2xl shadow-yellow-500/20 hover:scale-[1.08] transition-all duration-500">
              <div className="text-7xl mb-4">🥇</div>

              <div className="w-28 h-28 rounded-[32px] bg-black/10 flex items-center justify-center text-5xl mb-6">
                👑
              </div>

              <h2 className="text-3xl font-black mb-2">
                {users[0].nickname || 'Usuário'}
              </h2>

              <p className="text-black/70 mb-5 text-lg">Campeão Global</p>

              <div className="bg-black/10 px-6 py-3 rounded-2xl text-xl font-bold">
                {users[0].xp} XP
              </div>
            </div>
          )}

          {/* 3º */}
          {users[2] && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 flex flex-col items-center justify-center mt-16 hover:-translate-y-2 transition-all duration-500">
              <div className="text-6xl mb-4">🥉</div>

              <div className="w-24 h-24 rounded-3xl bg-orange-400 flex items-center justify-center text-4xl mb-5 text-black shadow-2xl">
                🌱
              </div>

              <h2 className="text-2xl font-black mb-2">
                {users[2].nickname || 'Usuário'}
              </h2>

              <p className="text-white/60 mb-4">3º Lugar</p>

              <div className="bg-white/5 border border-white/10 px-5 py-2 rounded-2xl">
                {users[2].xp} XP
              </div>
            </div>
          )}
        </div>

        {/* LISTA */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black">Ranking Global</h2>

            <div className="text-white/40">{users.length} jogadores</div>
          </div>

          <div className="flex flex-col gap-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center justify-between rounded-3xl p-5 transition-all duration-300 hover:scale-[1.01]
                ${
                  index === 0
                    ? 'bg-yellow-500/10 border border-yellow-500/20'
                    : index === 1
                    ? 'bg-gray-400/10 border border-gray-400/20'
                    : index === 2
                    ? 'bg-orange-500/10 border border-orange-500/20'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black
                    ${
                      index === 0
                        ? 'bg-yellow-500 text-black'
                        : index === 1
                        ? 'bg-gray-300 text-black'
                        : index === 2
                        ? 'bg-orange-400 text-black'
                        : 'bg-white/10'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      {user.nickname || 'Usuário'}
                    </h3>

                    <p className="text-white/50 text-sm">EcoPlayer</p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-black text-green-400">
                    {user.xp}
                  </h3>

                  <p className="text-white/50 text-sm">XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
