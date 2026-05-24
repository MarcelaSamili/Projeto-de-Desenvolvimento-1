import { Question } from '@/types/Quetions';

export const questions: Question[] = [
  //Reciclagem

  {
    id: '1',
    pergunta:
      'Qual cor normalmente representa a coleta de papel na reciclagem?',
    opcoes: ['Azul', 'Verde', 'Vermelho', 'Amarelo'],
    resposta: 'Azul',
    explicacao: 'Na coleta seletiva, a cor azul representa materiais de papel.',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '2',
    pergunta: ' Ao solicitar um delivery, qual a embalagem mais sustentável?',
    opcoes: ['De plástico', 'De papel reciclado'],
    resposta: 'De papel reciclado',
    explicacao: '',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },
  {
    id: '3',
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
    id: '4',
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
  {
    id: '5',
    pergunta: 'Separar o lixo reciclável ajuda principalmente a:',
    opcoes: [
      'Aumentar a poluição',
      'Facilitar a reciclagem',
      'Produzir mais lixo',
      'Gastar mais energia',
    ],
    resposta: 'Facilitar a reciclagem',
    explicacao:
      'Separar corretamente os resíduos facilita o trabalho de reciclagem.',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  {
    id: '6',
    pergunta: 'Reciclar ajuda a preservar:',
    opcoes: [
      'Os recursos naturais',
      'O desperdício',
      'A poluição',
      'Os lixões',
    ],
    resposta: 'Os recursos naturais',
    explicacao: 'A reciclagem reduz a extração de matérias-primas da natureza.',
    categoria: 'reciclagem',
    dificuldade: 'easy',
  },
  //Reciclagem medium

  {
    id: '7',
    pergunta:
      'O que acontece quando o plástico é descartado incorretamente na natureza?',
    opcoes: [
      'Ele desaparece rapidamente',
      'Pode poluir rios e oceanos',
      'Vira adubo instantaneamente',
      'Melhora o solo',
    ],
    resposta: 'Pode poluir rios e oceanos',
    explicacao:
      'O descarte incorreto do plástico causa grande impacto ambiental.',
    categoria: 'reciclagem',
    dificuldade: 'medium',
  },
  {
    id: '8',
    pergunta: 'Qual é uma das principais vantagens da reciclagem do alumínio?',
    opcoes: [
      'Aumentar o lixo urbano',
      'Economizar energia',
      'Produzir mais fumaça',
      'Destruir aterros',
    ],
    resposta: 'Economizar energia',
    explicacao:
      'Reciclar alumínio consome muito menos energia do que produzi-lo novamente.',
    categoria: 'reciclagem',
    dificuldade: 'medium',
  },

  {
    id: '9',
    pergunta: 'A coleta seletiva é importante porque:',
    opcoes: [
      'Mistura todos os resíduos',
      'Ajuda na separação correta dos materiais',
      'Impede a reciclagem',
      'Aumenta a poluição',
    ],
    resposta: 'Ajuda na separação correta dos materiais',
    explicacao:
      'A coleta seletiva facilita o reaproveitamento e reciclagem dos resíduos.',
    categoria: 'reciclagem',
    dificuldade: 'medium',
  },

  {
    id: '10',
    pergunta:
      'Qual destes resíduos deve ser descartado em local apropriado por conter substâncias tóxicas?',
    opcoes: [
      'Pilhas e baterias',
      'Papelão',
      'Garrafa PET',
      'Vidro transparente',
    ],
    resposta: 'Pilhas e baterias',
    explicacao:
      'Pilhas e baterias possuem componentes tóxicos que podem contaminar o meio ambiente.',
    categoria: 'reciclagem',
    dificuldade: 'medium',
  },

  {
    id: '11',
    pergunta: 'O conceito dos 3Rs da sustentabilidade significa:',
    opcoes: [
      'Reciclar, reutilizar e reduzir',
      'Recolher, rasgar e reciclar',
      'Reutilizar, remover e reduzir',
      'Reciclar, remover e reaproveitar',
    ],
    resposta: 'Reciclar, reutilizar e reduzir',
    explicacao:
      'Os 3Rs representam práticas importantes para diminuir os impactos ambientais.',
    categoria: 'reciclagem',
    dificuldade: 'medium',
  },
  {
    id: '16',
    pergunta: 'Qual processo transforma resíduos orgânicos em adubo natural?',
    opcoes: ['Compostagem', 'Incineração', 'Fundição', 'Filtragem química'],
    resposta: 'Compostagem',
    explicacao:
      'A compostagem é um processo biológico que transforma resíduos orgânicos em fertilizante natural.',
    categoria: 'reciclagem',
    dificuldade: 'hard',
  },

  {
    id: '17',
    pergunta: 'O chorume produzido em lixões pode causar:',
    opcoes: [
      'Contaminação do solo e da água',
      'Purificação dos rios',
      'Melhoria da vegetação',
      'Aumento da oxigenação do solo',
    ],
    resposta: 'Contaminação do solo e da água',
    explicacao:
      'O chorume possui substâncias tóxicas que podem contaminar lençóis freáticos e o solo.',
    categoria: 'reciclagem',
    dificuldade: 'hard',
  },

  {
    id: '18',
    pergunta:
      'Qual material reciclável demora mais tempo para se decompor na natureza?',
    opcoes: ['Vidro', 'Papel', 'Casca de fruta', 'Algodão'],
    resposta: 'Vidro',
    explicacao:
      'O vidro pode levar milhares de anos para se decompor no meio ambiente.',
    categoria: 'reciclagem',
    dificuldade: 'hard',
  },

  {
    id: '19',
    pergunta: 'A reciclagem mecânica do plástico consiste em:',
    opcoes: [
      'Triturar e reutilizar o material',
      'Queimar o plástico para gerar energia',
      'Enterrar o plástico em aterros',
      'Transformar plástico em combustível nuclear',
    ],
    resposta: 'Triturar e reutilizar o material',
    explicacao:
      'Na reciclagem mecânica, o plástico é separado, triturado e transformado em novos produtos.',
    categoria: 'reciclagem',
    dificuldade: 'hard',
  },

  {
    id: '20',
    pergunta:
      'Qual destes materiais exige maior economia de energia quando reciclado em comparação à produção original?',
    opcoes: ['Alumínio', 'Vidro', 'Papel', 'Plástico'],
    resposta: 'Alumínio',
    explicacao:
      'A reciclagem do alumínio economiza até cerca de 95% da energia usada na produção inicial.',
    categoria: 'reciclagem',
    dificuldade: 'hard',
  },
  //ENERGIA
  {
    id: '21',
    pergunta: 'Qual destas fontes é considerada energia renovável?',
    opcoes: ['Energia solar', 'Carvão mineral', 'Petróleo', 'Gasolina'],
    resposta: 'Energia solar',
    explicacao:
      'A energia solar utiliza a luz do sol, uma fonte natural e renovável.',
    categoria: 'energia',
    dificuldade: 'easy',
  },

  {
    id: '22',
    pergunta: 'A energia eólica é produzida através:',
    opcoes: ['Dos ventos', 'Do petróleo', 'Do carvão', 'Da gasolina'],
    resposta: 'Dos ventos',
    explicacao:
      'A energia eólica utiliza a força dos ventos para gerar eletricidade.',
    categoria: 'energia',
    dificuldade: 'easy',
  },

  {
    id: '23',
    pergunta: 'Painéis solares servem para:',
    opcoes: [
      'Captar energia do sol',
      'Produzir plástico',
      'Armazenar lixo',
      'Produzir petróleo',
    ],
    resposta: 'Captar energia do sol',
    explicacao:
      'Os painéis solares transformam a luz solar em energia elétrica.',
    categoria: 'energia',
    dificuldade: 'easy',
  },

  {
    id: '24',
    pergunta: 'Qual destas energias polui menos o meio ambiente?',
    opcoes: ['Energia solar', 'Carvão mineral', 'Diesel', 'Gasolina'],
    resposta: 'Energia solar',
    explicacao:
      'A energia solar gera eletricidade com baixo impacto ambiental.',
    categoria: 'energia',
    dificuldade: 'easy',
  },

  {
    id: '25',
    pergunta: 'A água pode ser usada para gerar:',
    opcoes: ['Energia hidrelétrica', 'Energia nuclear', 'Gasolina', 'Carvão'],
    resposta: 'Energia hidrelétrica',
    explicacao:
      'Usinas hidrelétricas utilizam a força da água para gerar energia.',
    categoria: 'energia',
    dificuldade: 'easy',
  },

  {
    id: '26',
    pergunta: 'Uma vantagem da energia renovável é:',
    opcoes: [
      'Menor emissão de poluentes',
      'Maior produção de fumaça',
      'Aumento da poluição',
      'Maior uso de petróleo',
    ],
    resposta: 'Menor emissão de poluentes',
    explicacao:
      'As energias renováveis ajudam a reduzir os impactos ambientais.',
    categoria: 'energia',
    dificuldade: 'medium',
  },

  {
    id: '27',
    pergunta: 'A biomassa é produzida a partir de:',
    opcoes: ['Matéria orgânica', 'Plástico', 'Vidro', 'Petróleo'],
    resposta: 'Matéria orgânica',
    explicacao: 'A biomassa utiliza resíduos orgânicos para gerar energia.',
    categoria: 'energia',
    dificuldade: 'medium',
  },

  {
    id: '28',
    pergunta: 'Qual destas fontes NÃO é renovável?',
    opcoes: [
      'Petróleo',
      'Energia solar',
      'Energia eólica',
      'Energia hidrelétrica',
    ],
    resposta: 'Petróleo',
    explicacao:
      'O petróleo é um combustível fóssil e não se renova rapidamente.',
    categoria: 'energia',
    dificuldade: 'medium',
  },

  {
    id: '29',
    pergunta: 'As turbinas eólicas geralmente são instaladas em locais:',
    opcoes: [
      'Com muito vento',
      'Sem circulação de ar',
      'Debaixo da terra',
      'Dentro de rios',
    ],
    resposta: 'Com muito vento',
    explicacao:
      'Locais com ventos fortes aumentam a eficiência da geração eólica.',
    categoria: 'energia',
    dificuldade: 'medium',
  },

  {
    id: '30',
    pergunta: 'A principal função de uma usina hidrelétrica é:',
    opcoes: [
      'Transformar a força da água em energia',
      'Produzir petróleo',
      'Queimar carvão',
      'Armazenar lixo',
    ],
    resposta: 'Transformar a força da água em energia',
    explicacao:
      'Usinas hidrelétricas convertem energia da água em eletricidade.',
    categoria: 'energia',
    dificuldade: 'medium',
  },

  {
    id: '31',
    pergunta:
      'Qual gás do efeito estufa é mais emitido pela queima de combustíveis fósseis?',
    opcoes: ['Dióxido de carbono', 'Oxigênio', 'Nitrogênio', 'Hidrogênio'],
    resposta: 'Dióxido de carbono',
    explicacao:
      'O CO₂ é um dos principais gases responsáveis pelo aquecimento global.',
    categoria: 'energia',
    dificuldade: 'hard',
  },

  {
    id: '32',
    pergunta: 'A energia geotérmica utiliza:',
    opcoes: [
      'O calor interno da Terra',
      'A força dos oceanos',
      'A luz da Lua',
      'O petróleo',
    ],
    resposta: 'O calor interno da Terra',
    explicacao:
      'A energia geotérmica aproveita o calor existente no interior do planeta.',
    categoria: 'energia',
    dificuldade: 'hard',
  },

  {
    id: '33',
    pergunta: 'Qual é um dos principais desafios da energia solar?',
    opcoes: [
      'Dependência da luz solar',
      'Produção excessiva de fumaça',
      'Uso obrigatório de carvão',
      'Poluição sonora intensa',
    ],
    resposta: 'Dependência da luz solar',
    explicacao:
      'A geração solar depende da incidência de luz solar para funcionar bem.',
    categoria: 'energia',
    dificuldade: 'hard',
  },

  {
    id: '34',
    pergunta: 'A matriz energética brasileira destaca-se pelo uso de:',
    opcoes: [
      'Fontes renováveis',
      'Carvão mineral',
      'Energia exclusivamente nuclear',
      'Gasolina',
    ],
    resposta: 'Fontes renováveis',
    explicacao:
      'O Brasil possui grande participação de fontes renováveis em sua matriz energética.',
    categoria: 'energia',
    dificuldade: 'hard',
  },

  {
    id: '35',
    pergunta: 'A energia maremotriz é gerada a partir:',
    opcoes: [
      'Do movimento das marés',
      'Da queima do petróleo',
      'Dos ventos solares',
      'Do carvão mineral',
    ],
    resposta: 'Do movimento das marés',
    explicacao:
      'A energia maremotriz utiliza a força das marés para gerar eletricidade.',
    categoria: 'energia',
    dificuldade: 'hard',
  },
  //SUSTENTABILIDADE
  {
    id: '36',
    pergunta: 'O que significa sustentabilidade?',
    opcoes: [
      'Usar recursos de forma consciente',
      'Produzir mais lixo',
      'Desmatar florestas',
      'Aumentar a poluição',
    ],
    resposta: 'Usar recursos de forma consciente',
    explicacao:
      'Sustentabilidade é utilizar os recursos naturais sem prejudicar as futuras gerações.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },

  {
    id: '37',
    pergunta: 'Qual atitude ajuda na sustentabilidade?',
    opcoes: [
      'Economizar água',
      'Desperdiçar energia',
      'Jogar lixo no chão',
      'Queimar plástico',
    ],
    resposta: 'Economizar água',
    explicacao: 'Economizar água ajuda a preservar os recursos naturais.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },

  {
    id: '38',
    pergunta: 'Apagar as luzes ao sair de um cômodo ajuda a:',
    opcoes: [
      'Economizar energia',
      'Gastar mais eletricidade',
      'Aumentar a poluição',
      'Produzir lixo',
    ],
    resposta: 'Economizar energia',
    explicacao: 'Desligar luzes desnecessárias reduz o consumo de energia.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },

  {
    id: '39',
    pergunta: 'Usar sacolas reutilizáveis ajuda a diminuir:',
    opcoes: [
      'O uso de plástico',
      'A reciclagem',
      'A energia solar',
      'A produção de papel',
    ],
    resposta: 'O uso de plástico',
    explicacao:
      'Sacolas reutilizáveis reduzem o consumo de plástico descartável.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },

  {
    id: '40',
    pergunta: 'Plantar árvores contribui para:',
    opcoes: [
      'Melhorar o meio ambiente',
      'Aumentar a poluição',
      'Destruir rios',
      'Produzir lixo',
    ],
    resposta: 'Melhorar o meio ambiente',
    explicacao:
      'As árvores ajudam na qualidade do ar e no equilíbrio ambiental.',
    categoria: 'sustentabilidade',
    dificuldade: 'easy',
  },

  {
    id: '41',
    pergunta: 'Consumir apenas o necessário é uma prática de:',
    opcoes: [
      'Consumo consciente',
      'Desperdício',
      'Poluição industrial',
      'Queimada ambiental',
    ],
    resposta: 'Consumo consciente',
    explicacao:
      'O consumo consciente evita desperdícios e reduz impactos ambientais.',
    categoria: 'sustentabilidade',
    dificuldade: 'medium',
  },

  {
    id: '42',
    pergunta: 'O reaproveitamento de materiais ajuda a:',
    opcoes: [
      'Reduzir resíduos',
      'Aumentar a poluição',
      'Produzir mais lixo',
      'Destruir recursos naturais',
    ],
    resposta: 'Reduzir resíduos',
    explicacao: 'Reaproveitar materiais diminui a quantidade de lixo gerado.',
    categoria: 'sustentabilidade',
    dificuldade: 'medium',
  },

  {
    id: '43',
    pergunta: 'A sustentabilidade busca equilibrar:',
    opcoes: [
      'Economia, sociedade e meio ambiente',
      'Apenas o lucro',
      'Somente o consumo',
      'Somente a indústria',
    ],
    resposta: 'Economia, sociedade e meio ambiente',
    explicacao:
      'O desenvolvimento sustentável envolve equilíbrio social, ambiental e econômico.',
    categoria: 'sustentabilidade',
    dificuldade: 'medium',
  },

  {
    id: '44',
    pergunta: 'Uma forma sustentável de transporte é:',
    opcoes: [
      'Bicicleta',
      'Carro movido a diesel',
      'Moto sem manutenção',
      'Caminhão antigo',
    ],
    resposta: 'Bicicleta',
    explicacao:
      'A bicicleta não emite gases poluentes e reduz impactos ambientais.',
    categoria: 'sustentabilidade',
    dificuldade: 'medium',
  },

  {
    id: '45',
    pergunta: 'A coleta seletiva contribui para a sustentabilidade porque:',
    opcoes: [
      'Facilita a reciclagem',
      'Mistura os resíduos',
      'Aumenta os lixões',
      'Produz mais poluição',
    ],
    resposta: 'Facilita a reciclagem',
    explicacao:
      'Separar corretamente os resíduos ajuda no reaproveitamento dos materiais.',
    categoria: 'sustentabilidade',
    dificuldade: 'medium',
  },

  {
    id: '46',
    pergunta: 'O desenvolvimento sustentável foi popularizado pelo Relatório:',
    opcoes: ['Brundtland', 'Kyoto', 'Montreal', 'Paris'],
    resposta: 'Brundtland',
    explicacao:
      'O Relatório Brundtland definiu o conceito moderno de desenvolvimento sustentável.',
    categoria: 'sustentabilidade',
    dificuldade: 'hard',
  },

  {
    id: '47',
    pergunta: 'A pegada ecológica mede:',
    opcoes: [
      'O impacto humano no meio ambiente',
      'O tamanho das florestas',
      'A quantidade de chuva',
      'A produção de energia solar',
    ],
    resposta: 'O impacto humano no meio ambiente',
    explicacao:
      'A pegada ecológica avalia o consumo de recursos naturais pelas pessoas.',
    categoria: 'sustentabilidade',
    dificuldade: 'hard',
  },

  {
    id: '48',
    pergunta:
      'Qual prática empresarial está relacionada à sustentabilidade corporativa?',
    opcoes: ['ESG', 'Dumping', 'Monopólio', 'Queimada industrial'],
    resposta: 'ESG',
    explicacao:
      'ESG envolve práticas ambientais, sociais e de governança nas empresas.',
    categoria: 'sustentabilidade',
    dificuldade: 'hard',
  },

  {
    id: '49',
    pergunta:
      'A Agenda 2030 da ONU possui quantos Objetivos de Desenvolvimento Sustentável?',
    opcoes: ['17', '10', '25', '30'],
    resposta: '17',
    explicacao:
      'A Agenda 2030 da ONU é composta por 17 Objetivos de Desenvolvimento Sustentável.',
    categoria: 'sustentabilidade',
    dificuldade: 'hard',
  },

  {
    id: '50',
    pergunta: 'A economia circular propõe:',
    opcoes: [
      'Reutilizar e reciclar materiais continuamente',
      'Descartar produtos rapidamente',
      'Aumentar o desperdício',
      'Produzir resíduos sem controle',
    ],
    resposta: 'Reutilizar e reciclar materiais continuamente',
    explicacao:
      'A economia circular busca reduzir desperdícios através do reaproveitamento constante.',
    categoria: 'sustentabilidade',
    dificuldade: 'hard',
  },
];
