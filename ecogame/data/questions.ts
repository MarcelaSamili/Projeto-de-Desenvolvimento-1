import { Question } from '@/types/Quetions';

export const questions: Question[] = [
  //Reciclagem

  {
    id: '1',
    pergunta: 'Qual dos biomas abaixo não fica no Brasil?',
    opcoes: ['Caatinga', ' Mata Atlântica', 'Tundra', 'Pantanal'],
    resposta: 'Tundra',
    explicacao: '',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '2',
    pergunta: ' Como preservar árvores e florestas?',
    opcoes: [
      'Construindo uma casa na árvore',
      'Reciclando papéis, jornais e revistas',
      'Reutilizando metais e vidros',
      'Indo a parques',
    ],
    resposta: 'Construindo uma casa na árvore',
    explicacao: '',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '3',
    pergunta: ' Ao solicitar um delivery, qual a embalagem mais sustentável?',
    opcoes: ['De plástico', 'De papel reciclado'],
    resposta: 'De papel reciclado',
    explicacao: '',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },
  {
    id: '4',
    pergunta: ' Como separar corretamente seu lixo?',
    opcoes: [
      'Juntar tudo na lixeira, pois os prédios já fazem o trabalho de separação.',
      'Separar o lixo orgânico (restos de alimentos, papel sujo e lixo sanitário) dos resíduos sólidos (como plástico, vidro, papel, metal e embalagens longa vida).',
      'Deixar plásticos sujos junto com lixo orgânico.',
      'Juntar todo tipo de lixo e descartar em ponto de coleta.',
    ],
    resposta:
      'Separar o lixo orgânico (restos de alimentos, papel sujo e lixo sanitário) dos resíduos sólidos (como plástico, vidro, papel, metal e embalagens longa vida).',
    explicacao: '',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '5',
    pergunta: 'Os lixos coletados não podem ser levados para:',
    opcoes: [
      'Aterros sanitários',
      'Empresa recicladora',
      'Terrenos baldios',
      'Todas alternativa acima',
    ],
    resposta: 'Terrenos baldios',
    explicacao: '',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
];
