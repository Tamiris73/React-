import api from "api";
import { IResposta } from "interfaces/resposta.interface"

class RespostaData {
  index() {
    return api.get<IResposta[]>('resposta');
  }
  show(id: number) {
    return api.get<IResposta>(`resposta/${id}`);
  }
  store(data: IResposta) {
    return api.post<IResposta>(`resposta`, data);
  }
  update(id: number, data: IResposta) {
    return api.put<IResposta>(`resposta/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IResposta>(`resposta/${id}`);
  }
}

export default new RespostaData();
