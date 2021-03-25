export interface IAlternativa {
    id: number;
    alternativa: string;
    questoes_id: number;
    questao?: {
      id: number;
      questao: string;
      area_conhecimentos_id: number;
    }
  }