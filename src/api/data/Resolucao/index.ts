import api from "api";
import { IResolucao } from "interfaces/resolucao.interface"

class ResolucaoData {
  index() {
    return api.get<IResolucao[]>('resolucao');
  }
  show(id: number) {
    return api.get<IResolucao>(`resolucao/${id}`);
  }
  store(data: IResolucao) {
    return api.post<IResolucao>(`resolucao`, data);
  }
  update(id: number, data: IResolucao) {
    return api.put<IResolucao>(`resolucao/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IResolucao>(`resolucao/${id}`);
  }
}

export default new ResolucaoData();
