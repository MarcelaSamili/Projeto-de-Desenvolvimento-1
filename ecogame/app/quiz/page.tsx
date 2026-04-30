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
import { getQuestions } from '@/features/quiz/getQuestions';
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

  const router = useRouter();

  const perguntaAtual = perguntas[index];

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
  }, [categoria, dificuldade]);
  if (!perguntas.length && categoria && dificuldade) {
    return <p className="text-white p-6">Carregando perguntas...</p>;
  }

  function selecionarResposta(opcao: string) {
    if (respostaSelecionada) return;

    setRespostaSelecionada(opcao);

    if (opcao === perguntaAtual.resposta) {
      setAcertos(acertos + 1);
      setFeedback('✅ Resposta correta!');
    } else {
      setFeedback('❌ Resposta incorreta.');
    }
  }

  async function proximaPergunta() {
    if (index + 1 < perguntas.length) {
      setIndex(index + 1);
      setRespostaSelecionada(null);
      setFeedback('');
    } else {
      setFinalizado(true);

      // cálculo de XP
      const xp = acertos * 10;

      if (auth.currentUser) {
        await addXP(auth.currentUser.uid, xp);
      }
    }
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
