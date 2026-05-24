export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category = 'reciclagem' | 'energia' | 'sustentabilidade';

export type Question = {
  id: string;
  pergunta: string;
  opcoes: string[];
  resposta: string;
  explicacao: string;
  categoria: Category;
  dificuldade: Difficulty;
};
