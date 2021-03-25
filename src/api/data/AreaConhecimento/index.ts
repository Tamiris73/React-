import api from "api";
import { IArea } from "interfaces/areaConhecimento.interface";

class AreaData {
  index() {
    return api.get<IArea[]>('areaconhecimento');
  }
  show(id: number) {
    return api.get<IArea>(`areaconhecimento/${id}`);
  }
  store(data: IArea) {
    return api.post<IArea>(`areaconhecimento`, data);
  }
  update(id: number, data: IArea) {
    return api.put<IArea>(`areaconmhecimento/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IArea>(`areaconhecimento/${id}`);
  }
}

export default new AreaData();
