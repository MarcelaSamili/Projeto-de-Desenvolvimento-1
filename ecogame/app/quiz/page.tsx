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
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Resultado 🎉</h1>

        <p className="mb-4">
          Você acertou {acertos} de {perguntas.length}
        </p>

        <button
          onClick={() => router.push('/dashboard')}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Voltar ao Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      {/* VIDAS NA TELA */}
      <div className="flex gap-2 mb-4 text-2xl">
        {[...Array(vidas)].map((_, i) => (
          <span key={i}>❤️</span>
        ))}
      </div>
      {/* STREAKS */}
      <div className="mb-4 text-xl">
        {streak >= 3 ? (
          <p className="text-yellow-400 font-bold">🔥🔥🔥 COMBO x{streak}</p>
        ) : (
          <p>🔥 Streak: {streak}</p>
        )}
      </div>

      {/* PROGRESSO */}
      <div className="mb-6">
        <p className="mb-2">
          Pergunta {index + 1} de {questions.length}
        </p>

        <div className="w-full bg-slate-700 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-2">
        {perguntaAtual.categoria} • {perguntaAtual.dificuldade}
      </p>
      {/* TIMER*/}
      <div className="mb-4">
        <p className="text-lg">⏱️ Tempo restante: {tempo}s</p>
      </div>
      <div className="w-full bg-slate-700 h-2 rounded mb-6">
        <div
          className="bg-yellow-400 h-2 rounded transition-all"
          style={{
            width: `${(tempo / 15) * 100}%`,
          }}
        />
      </div>
      {/* PERGUNTA */}
      <h1 className="text-xl mb-6">{perguntaAtual.pergunta}</h1>

      {/* OPÇÕES */}
      <div className="flex flex-col gap-3">
        {perguntaAtual.opcoes.map(opcao => {
          let estilo = 'bg-slate-800';

          if (respostaSelecionada) {
            if (opcao === perguntaAtual.resposta) {
              estilo = 'bg-green-600';
            } else if (opcao === respostaSelecionada) {
              estilo = 'bg-red-600';
            }
          }

          return (
            <button
              key={opcao}
              onClick={() => selecionarResposta(opcao)}
              className={`${estilo} p-3 rounded-xl`}
            >
              {opcao}
            </button>
          );
        })}
      </div>

      {respostaSelecionada && (
        <div className="mt-4">
          <p>{feedback}</p>
          <p className="text-sm text-slate-400 mt-2">
            {perguntaAtual.explicacao}
          </p>
        </div>
      )}

      {/* BOTÃO PRÓXIMA */}
      {respostaSelecionada && (
        <button
          onClick={proximaPergunta}
          className="mt-6 bg-blue-500 px-4 py-2 rounded"
        >
          Próxima →
        </button>
      )}
    </main>
  );
}
