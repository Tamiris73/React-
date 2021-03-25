export interface ITentativa{
  id: number;
  user_id?: number;
  usuario?: {
    id: number;
    username: string;
    password: number;
    email: string;
  }
  tentativa: string;
  respostas_id: string;
}
