'use client';

import { useState } from 'react';
import { questions } from '@/data/questions';
import { addXP } from '@/features/quiz/addXP';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { shuffleArray } from '@/utils/shuffle';
import { useEffect } from 'react';
import { Question } from '@/types/Quetions';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
//import { getQuestions } from "@/features/quiz/getQuestions";
export default function Quiz() {
  const searchParams = useSearchParams();

  const categoria = searchParams.get('categoria');
  const dificuldade = searchParams.get('dificuldade');

  const [index, setIndex] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(
    null
  );

  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [perguntas, setPerguntas] = useState<Question[]>([]);
  const [vidas, setVidas] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [tempo, setTempo] = useState(15);
  const [streak, setStreak] = useState(0);

  const router = useRouter();

  const perguntaAtual = perguntas[index];

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const timeoutSound = useRef<HTMLAudioElement | null>(null);
  const finishSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSound.current = new Audio(
      '/sounds/mixkit-winning-a-coin-video-game-2069.wav'
    );
    wrongSound.current = new Audio(
      '/sounds/mixkit-player-losing-or-failing-2042.wav'
    );
    timeoutSound.current = new Audio('/sounds/mixkit-game-level-music-689.wav');
    finishSound.current = new Audio(
      '/sounds/mixkit-completion-of-a-level-2063'
    );
    // VOLUME
    if (correctSound.current) correctSound.current.volume = 0.2;

    if (wrongSound.current) wrongSound.current.volume = 0.2;

    if (timeoutSound.current) timeoutSound.current.volume = 0.2;

    if (finishSound.current) finishSound.current.volume = 0.5;
  }, []);

  {
    /* substitua o useEffect atual caso queira puxar as perguntas do firebase
  useEffect(() => {
  async function carregarPerguntas() {
    if (!categoria || !dificuldade) return;

    const todas = await getQuestions();

    const filtradas = todas.filter(q => {
      return (
        q.categoria.toLowerCase() === categoria.toLowerCase() &&
        q.dificuldade.toLowerCase() === dificuldade.toLowerCase()
      );
    });

    const embaralhadas = shuffleArray(
      filtradas.map(q => ({
        ...q,
        opcoes: shuffleArray(q.opcoes),
      }))
    );

    setPerguntas(embaralhadas);
  }

  carregarPerguntas();
}, [categoria, dificuldade]);*/
  }

  //SISTEMA DE TEMPO + STREAK
  useEffect(() => {
    if (respostaSelecionada || finalizado || gameOver) return;
    // Toca o som quando o tempo estiver menor ou igual a 14
    if (tempo >= 1) {
      timeoutSound.current?.play();
    } else if (tempo <= 0) {
      timeoutSound.current?.pause();
    }
    // Ação quando o tempo se esgota
    if (tempo <= 0) {
      setFeedback('Tempo esgotado!');
      setVidas(prev => prev - 1);
      setStreak(0); // PARA O ETREAK VOLTAR A 0 CASO O TEMPO SE ESGOTE

      setTimeout(() => {
        proximaPergunta();
      }, 1500);
      return;
    }
    // Decrementa o tempo a cada 1 segundo
    const timer = setInterval(() => {
      setTempo(prev => prev - 1);
    }, 1000);
    // Limpeza do intervalo para evitar duplicação ou vazamento de memória
    return () => clearInterval(timer);
  }, [tempo, respostaSelecionada, finalizado, gameOver]);

  //SISTEMA DE VIDAS
  useEffect(() => {
    if (vidas <= 0) {
      setGameOver(true);
    }
  }, [vidas]);

  //SISTEMA DE DIFICULDADE DAS PERGUNTAS
  useEffect(() => {
    if (!categoria || !dificuldade) return;

    const filtradas = questions.filter(q => {
      return (
        q.categoria.toLowerCase() === categoria?.toLowerCase() &&
        q.dificuldade.toLowerCase() === dificuldade?.toLowerCase()
      );
    });

    const embaralhadas = shuffleArray(
      filtradas.map(q => ({
        ...q,
        opcoes: shuffleArray(q.opcoes),
      }))
    );

    setPerguntas(embaralhadas);
  }, [categoria, dificuldade]);
  if (!perguntas.length && categoria && dificuldade) {
    return <p className="text-white p-6">Carregando...</p>;
  }

  //SISTEMA DE SELECAO DE PERGUNTAS
  function selecionarResposta(opcao: string) {
    setTempo(15);
    setFeedback('');
    if (respostaSelecionada) return;

    setRespostaSelecionada(opcao);

    if (opcao === perguntaAtual.resposta) {
      correctSound.current?.play();
      setAcertos(prev => prev + 1);

      setStreak(prev => prev + 1);

      setFeedback('✅ Resposta correta!');
    } else {
      setFeedback('❌ Resposta incorreta.');
      wrongSound.current?.play();

      setVidas(prev => prev - 1);
      setStreak(0);
    }
  }

  //SISTEMA DE MUDANCA DE PERGUNTAS
  async function proximaPergunta() {
    if (index + 1 < perguntas.length) {
      setIndex(index + 1);
      setRespostaSelecionada(null);
      setFeedback('');
    } else {
      setFinalizado(true);
      finishSound.current?.play();

      // cálculo de XP
      const bonus = streak >= 3 ? streak * 5 : 0;

      const xp = acertos * 10 + bonus;

      if (auth.currentUser) {
        await addXP(auth.currentUser.uid, xp);
      }
    }
  }

  if (gameOver) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-4">💀 Game Over</h1>

        <p className="mb-6">Você ficou sem vidas!</p>

        <button
          onClick={() => router.push('/dashboard')}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Voltar ao Dashboard
        </button>
      </main>
    );
  }

  if (finalizado) {
    const porcentagem = Math.round((acertos / perguntas.length) * 100);

    return (
      <main className="min-h-screen bg-linear-to-br from-[#08140F] via-[#0B1D14] to-[#10271B] text-white overflow-hidden relative flex items-center justify-center px-6">
        {/* GLOWS */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full" />

        <div className="relative z-10 w-full max-w-2xl">
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 md:p-14 text-center shadow-2xl">
            {/* TROFÉU */}
            <div className="w-32 h-32 mx-auto rounded-[35px] bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-6xl shadow-2xl shadow-green-500/20 mb-8">
              🏆
            </div>

            {/* TITULO */}
            <h1 className="text-5xl font-black mb-4">Quiz Finalizado!</h1>

            <p className="text-white/60 text-lg mb-10">
              Você concluiu o desafio do EcoGame 🌱
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-white/50 text-sm mb-2">Acertos</p>

                <h2 className="text-4xl font-black text-green-400">
                  {acertos}
                </h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-white/50 text-sm mb-2">Precisão</p>

                <h2 className="text-4xl font-black text-cyan-300">
                  {porcentagem}%
                </h2>
              </div>
            </div>

            {/* XP */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 mb-10">
              <p className="text-green-300 text-sm mb-2">XP GANHO</p>

              <h2 className="text-5xl font-black text-green-400">
                +{acertos * 10} XP
              </h2>
            </div>

            {/* MENSAGEM DINÂMICA */}
            <div className="mb-10">
              {porcentagem >= 80 && (
                <p className="text-green-300 text-lg">
                  🌟 Excelente desempenho!
                </p>
              )}

              {porcentagem >= 50 && porcentagem < 80 && (
                <p className="text-yellow-300 text-lg">
                  🚀 Bom trabalho, continue evoluindo!
                </p>
              )}

              {porcentagem < 50 && (
                <p className="text-red-300 text-lg">
                  📚 Continue praticando para melhorar!
                </p>
              )}
            </div>

            {/* BOTÕES */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => router.push('/quiz/start')}
                className="flex-1 bg-linear-to-r from-green-400 to-emerald-500 text-black font-black py-5 rounded-3xl text-lg hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-green-500/20"
              >
                Jogar Novamente 🎮
              </button>

              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold py-5 rounded-3xl text-lg hover:bg-white/10 transition-all duration-300"
              >
                Dashboard 🏠
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-emerald-600 from-[#53ca98] via-[#388f63] to-[#6cffb3] text-white overflow-hidden relative">
      {/* GLOWS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* TOP HUD */}
        <div className="flex flex-col gap-5 mb-10">
          {/* TOP INFO */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* VIDAS */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-2">
              <span className="text-red-400 text-xl">❤️</span>

              <span className="font-bold text-lg">{vidas}</span>
            </div>

            {/* STREAK */}
            <div className="bg-orange-500/10 border border-orange-500/20 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-2">
              <span className="text-orange-400 text-xl">🔥</span>

              <span className="font-bold text-lg">{streak}</span>
            </div>

            {/* TIMER */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-2">
              <span className="text-cyan-300 text-xl">⏱</span>

              <span className="font-bold text-lg">{tempo}</span>
            </div>
          </div>

          {/* PROGRESS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/60 text-sm">
                Pergunta {index + 1} de {perguntas.length}
              </p>

              <p className="text-green-400 text-sm font-bold">
                {Math.round(((index + 1) / perguntas.length) * 100)}%
              </p>
            </div>

            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-linear-to-r from-green-400 to-emerald-500 transition-all duration-500"
                style={{
                  width: `${((index + 1) / perguntas.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* QUIZ CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-2xl">
          {/* CATEGORY */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full mb-6">
            🌱 {perguntaAtual.categoria} • {perguntaAtual.dificuldade}
          </div>

          {/* QUESTION */}
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-10">
            {perguntaAtual.pergunta}
          </h1>

          {/* OPTIONS */}
          <div className="flex flex-col gap-4">
            {perguntaAtual.opcoes.map(opcao => {
              let estilo =
                'bg-white/5 border-white/10 hover:border-green-400 hover:bg-green-500/10';

              if (respostaSelecionada) {
                if (opcao === perguntaAtual.resposta) {
                  estilo =
                    'bg-green-500 border-green-400 text-black scale-[1.02]';
                } else if (opcao === respostaSelecionada) {
                  estilo = 'bg-red-500 border-red-400 text-white';
                } else {
                  estilo = 'bg-white/5 border-white/5 opacity-50';
                }
              }

              return (
                <button
                  key={opcao}
                  onClick={() => selecionarResposta(opcao)}
                  className={`${estilo} border backdrop-blur-xl rounded-3xl p-5 text-left transition-all duration-300`}
                >
                  <span className="text-lg font-semibold">{opcao}</span>
                </button>
              );
            })}
          </div>

          {/* FEEDBACK */}
          {respostaSelecionada && (
            <div
              className={`mt-8 p-5 rounded-3xl border ${
                feedback.includes('correta')
                  ? 'bg-green-500/10 border-green-500/20 text-green-300'
                  : 'bg-red-500/10 border-red-500/20 text-red-300'
              }`}
            >
              <p className="font-bold text-lg mb-2">{feedback}</p>

              <p className="text-white/70">{perguntaAtual.explicacao}</p>
            </div>
          )}

          {/* NEXT BUTTON */}
          {respostaSelecionada && (
            <button
              onClick={proximaPergunta}
              className="mt-8 w-full bg-linear-to-r from-green-400 to-emerald-500 text-black font-black py-5 rounded-3xl text-lg hover:scale-[1.01] transition-all duration-300 shadow-2xl shadow-green-500/20"
            >
              Próxima Pergunta →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
