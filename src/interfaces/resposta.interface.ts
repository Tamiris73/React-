export interface IResposta {
    id: number;
    resposta: string;
    questoes_id: number;
    alternativas_id: number;
    questao?: {
      id: number;
      questao: string;
      area_conhecimentos_id: number;
    }
  }