'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuizStart() {
  const router = useRouter();

  const [categoria, setCategoria] = useState('reciclagem');
  const [dificuldade, setDificuldade] = useState('easy');

  function iniciarQuiz() {
    router.push(`/quiz?categoria=${categoria}&dificuldade=${dificuldade}`);
  }

  return (
    <main className="min-h-screen bg-emerald-500 text-white flex flex-col items-center justify-center">
      <div className="border-2 p-5 rounded-2xl flex flex-col items-center">
        <h1 className="text-2xl mb-6">Configurar Quiz 🎮</h1>

        {/* CATEGORIA */}
        <select
          className="mb-4 p-4 text-black border-2 rounded-2xl"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        >
          <option value="reciclagem">Reciclagem</option>
          <option value="energia">Energia</option>
          <option value="sustentabilidade">Sustentabilidade</option>
        </select>

        {/* DIFICULDADE */}
        <select
          className="mb-6 p-4 text-black border-2 rounded-2xl "
          value={dificuldade}
          onChange={e => setDificuldade(e.target.value)}
        >
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>

        <button
          onClick={iniciarQuiz}
          className="bg-green-500 px-6 py-2 rounded-2xl border-2"
        >
          Começar 🚀
        </button>
      </div>
    </main>
  );
}
