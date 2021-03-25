import api from "api";
import { IQuestao } from "interfaces/questao.interface";

class QuestaoData {
  index() {
    return api.get<IQuestao[]>('questao');
  }
  show(id: number) {
    return api.get<IQuestao>(`questao/${id}`);
  }
  store(data: IQuestao) {
    return api.post<IQuestao>(`questao`, data);
  }
  update(id: number, data: IQuestao) {
    return api.put<IQuestao>(`questao/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IQuestao>(`questao/${id}`);
  }
}

export default new QuestaoData();
