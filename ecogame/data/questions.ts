import { Question } from '@/types/Quetions';

export const questions: Question[] = [
  {
    id: '1',
    pergunta: 'Qual destes materiais pode ser reciclado?',
    opcoes: ['Espelho', 'Plástico', 'Guardanapo sujo', 'Papel engordurado'],
    resposta: 'Plástico',
    explicacao: 'O plástico pode ser reciclado.',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '2',
    pergunta: 'Qual fonte de energia é renovável?',
    opcoes: ['Carvão', 'Petróleo', 'Solar', 'Gás natural'],
    resposta: 'Solar',
    explicacao: 'Energia solar é limpa e renovável.',
    categoria: 'energia',
    dificuldade: 'medium',
  },
  {
    id: '3',
    pergunta: 'O que é sustentabilidade?',
    opcoes: [
      'Consumir mais rápido',
      'Preservar recursos para o futuro',
      'Evitar tecnologia',
      'Usar tudo sem controle',
    ],
    resposta: 'Preservar recursos para o futuro',
    explicacao: 'Sustentabilidade garante o futuro.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },
];
