'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function QuizStart() {
  const router = useRouter();

  const [categoria, setCategoria] = useState('reciclagem');
  const [dificuldade, setDificuldade] = useState('easy');

  function iniciarQuiz() {
    router.push(`/quiz?categoria=${categoria}&dificuldade=${dificuldade}`);
  }

  return (
    <main className="min-h-screen bg-emerald-700 from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden flex items-center justify-center px-6 py-10">
      {/* GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-green-500/10">
        {/* LADO ESQUERDO */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-green-500/10 to-emerald-300/5 border-r border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-3xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                🎮
              </div>

              <div>
                <h1 className="text-3xl font-black">QUIZ MODE</h1>
                <p className="text-white/60">Escolha sua missão sustentável</p>
              </div>
            </div>

            <h2 className="text-5xl font-black leading-tight mb-6">
              Prepare-se
              <span className="block text-green-400">para o desafio.</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Escolha uma categoria, defina a dificuldade e mostre seus
              conhecimentos sobre sustentabilidade.
            </p>
          </div>

          {/* INFO CARDS */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60 mb-1">Recompensa média</p>

              <h3 className="text-3xl font-black text-green-400">+120 XP</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60 mb-1">Dificuldade máxima</p>

              <h3 className="text-3xl font-black text-red-400">HARD</h3>
            </div>
          </div>
        </div>

        {/* CONFIGURAÇÕES */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full mb-6">
              🌿 EcoGame
            </div>

            <h1 className="text-4xl font-black mb-3">Configurar Quiz</h1>

            <p className="text-white/60 text-lg">
              Personalize sua experiência antes de começar.
            </p>
          </div>

          {/* CATEGORIA */}
          <div className="mb-6">
            <label className="text-sm text-white/60 mb-2 block">
              Categoria
            </label>

            <select
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option className="bg-[#0B1D14]" value="reciclagem">
                ♻️ Reciclagem
              </option>

              <option className="bg-[#0B1D14]" value="energia">
                ⚡ Energia
              </option>

              <option className="bg-[#0B1D14]" value="sustentabilidade">
                🌱 Sustentabilidade
              </option>
            </select>
          </div>

          {/* DIFICULDADE */}
          <div className="mb-8">
            <label className="text-sm text-white/60 mb-2 block">
              Dificuldade
            </label>

            <select
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
              value={dificuldade}
              onChange={e => setDificuldade(e.target.value)}
            >
              <option className="bg-[#0B1D14]" value="easy">
                🟢 Fácil
              </option>

              <option className="bg-[#0B1D14]" value="medium">
                🟡 Médio
              </option>

              <option className="bg-[#0B1D14]" value="hard">
                🔴 Difícil
              </option>
            </select>
          </div>

          {/* BOTÃO */}
          <button
            onClick={iniciarQuiz}
            className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-green-500/20 text-lg"
          >
            Começar Quiz
          </button>

          <Button
            className=" mt-3 text-black mb-6 border rounded-4xl p-2 bg-emerald-600 border-emerald-600"
            onClick={() => router.push('/dashboard')}
          >
            <p>Voltar ao Dashborard</p>
          </Button>
          {/* INFO EXTRA */}
          <div className="mt-4 text-center text-sm text-white/40">
            Cada resposta correta aumenta seu XP e streak.
          </div>
        </div>
      </div>
    </main>
  );
}
