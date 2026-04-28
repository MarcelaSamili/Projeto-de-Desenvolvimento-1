const pergunta = {
  pergunta: 'Qual destes materiais pode ser reciclado?',
  opcoes: ['Papel', 'Espelho', 'Guardanapo sujo', 'Plástico'],
  resposta: 'Plástico',
};

export default function Quiz() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-xl mb-6">{pergunta.pergunta}</h1>

      <div className="flex flex-col gap-3">
        {pergunta.opcoes.map(opcao => (
          <button
            key={opcao}
            className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700"
          >
            {opcao}
          </button>
        ))}
      </div>
    </main>
  );
}
