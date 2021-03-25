import api from "api";
import { IUser } from "interfaces/Usuario.interface"

class UserData {
  index() {
    return api.get<IUser[]>('user');
  }
  show(id: number) {
    return api.get<IUser>(`user/${id}`);
  }
  store(data: IUser) {
    return api.post<IUser>(`user`, data);
  }
  update(id: number, data: IUser) {
    return api.put<IUser>(`user/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IUser>(`user/${id}`);
  }
}

export default new UserData();
