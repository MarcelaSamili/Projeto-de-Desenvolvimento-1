'use client';

import { useState } from 'react';
import { addXP } from '@/features/quiz/addXP';
import { auth } from '@/services/firebase';

const pergunta = {
  pergunta: 'Qual destes materiais pode ser reciclado?',
  opcoes: ['Papel', 'Espelho', 'Guardanapo sujo', 'Plástico'],
  resposta: 'Plástico',
};

export default function Quiz() {
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(
    null
  );
  const [acertou, setAcertou] = useState<boolean | null>(null);

  const handleResposta = async (opcao: string) => {
    setRespostaSelecionada(opcao);

    const isCorrect = opcao === pergunta.resposta;
    setAcertou(isCorrect);

    // se acertou, ganha XP
    if (isCorrect && auth.currentUser) {
      await addXP(auth.currentUser.uid, 10);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-xl mb-6">{pergunta.pergunta}</h1>

      <div className="flex flex-col gap-3">
        {pergunta.opcoes.map(opcao => {
          let estilo = 'bg-slate-800';

          if (respostaSelecionada) {
            if (opcao === pergunta.resposta) {
              estilo = 'bg-green-600';
            } else if (opcao === respostaSelecionada) {
              estilo = 'bg-red-600';
            }
          }

          return (
            <button
              key={opcao}
              onClick={() => handleResposta(opcao)}
              className={`${estilo} p-3 rounded-xl`}
              disabled={!!respostaSelecionada}
            >
              {opcao}
            </button>
          );
        })}
      </div>

      {acertou !== null && (
        <div className="mt-6 text-lg">
          {acertou ? '✅ Correto! +10 XP' : '❌ Errado!'}
        </div>
      )}
    </main>
  );
}
