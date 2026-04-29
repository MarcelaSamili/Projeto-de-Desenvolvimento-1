'use client';

import { useEffect, useState } from 'react';
import { getRanking } from '@/features/ranking/getRanking';
import Navbar from '@/components/Navbar';

export default function Ranking() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRanking();
      setUsers(data);
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">🏆 Ranking</h1>

      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`p-4 rounded-xl flex justify-between items-center ${
              index === 0
                ? 'bg-yellow-500 text-black'
                : index === 1
                ? 'bg-gray-300 text-black'
                : index === 2
                ? 'bg-orange-400 text-black'
                : 'bg-slate-800'
            }`}
          >
            <span>{index + 1}º Lugar</span>

            {/*<span className="text-sm">XP: {user.xp || 0}</span>
            <span className="text-sm">{user.email || 'Usuário'}</span>*/}
            <div>
              <p>{user.nickname || 'Usuário'}</p>
              <p className="text-sm">XP: {user.xp}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
