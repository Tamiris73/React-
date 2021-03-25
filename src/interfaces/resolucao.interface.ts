export interface IResolucao {
    id: number;
    resolucao: string;
    questoes_id: number;
    gabarito: number;
    questao?: {
        id: number;
        questao: string;
        area_conhecimentos_id: number;
      }
}