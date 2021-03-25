import api from "api";
import { ITentativa } from "interfaces/Tentativa.interface"

class TentativaData {
  index() {
    return api.get<ITentativa[]>('tentativa');
  }
  show(id: number) {
    return api.get<ITentativa>(`tentativa/${id}`);
  }
  store(data: ITentativa) {
    return api.post<ITentativa>(`tentativa`, data);
  }
  update(id: number, data: ITentativa) {
    return api.put<ITentativa>(`tentativa/${id}`, data);
  }
  delete(id: number) {
    return api.delete<ITentativa>(`tentativa/${id}`);
  }
}

export default new TentativaData();
