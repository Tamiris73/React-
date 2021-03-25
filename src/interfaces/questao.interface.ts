export interface IQuestao {
    id: number;
    questao: string;
    area_conhecimentos_id: number;
    area?: {
      id: number;
      nome: string;
    }
  }