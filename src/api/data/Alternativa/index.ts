import api from "api";
import { IAlternativa } from "interfaces/alternativa.interface"

class AlternativaData {
  index() {
    return api.get<IAlternativa[]>('alternativa');
  }
  show(id: number) {
    return api.get<IAlternativa>(`alternativa/${id}`);
  }
  store(data: IAlternativa) {
    return api.post<IAlternativa>(`alternativa`, data);
  }
  update(id: number, data: IAlternativa) {
    return api.put<IAlternativa>(`alternativa/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IAlternativa>(`alternativa/${id}`);
  }
}

export default new AlternativaData();
