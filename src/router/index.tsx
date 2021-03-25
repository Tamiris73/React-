import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import {
  Main,
  Login,
  Cadastro,
  User,
  UserStore,
  Tentativa,
  TentativaStore,
  Alternativa,
  AlternativaStore,
  Area,
  AreaStore,
  Resolucao,
  ResolucaoStore,
  Resposta,
  RespostaStore,
  Questao,
  QuestaoStore,

} from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute exact path="/user/:id" component={UserStore} />
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/tentativa/:id" component={TentativaStore} />
      <PrivateRoute exact path="/tentativa" component={Tentativa} />
      <PrivateRoute exact path="/alternativa/:id" component={AlternativaStore} />
      <PrivateRoute exact path="/alternativa" component={Alternativa} />
      <PrivateRoute exact path="/area/:id" component={AreaStore} />
      <PrivateRoute exact path="/area" component={Area} />
      <PrivateRoute exact path="/resolucao/:id" component={ResolucaoStore} />
      <PrivateRoute exact path="/resolucao" component={Resolucao} />
      <PrivateRoute exact path="/resposta/:id" component={RespostaStore} />
      <PrivateRoute exact path="/resposta" component={Resposta} />
      <PrivateRoute exact path="/questao/:id" component={QuestaoStore} />
      <PrivateRoute exact path="/questao" component={Questao} />
    </Switch>
  );
};

export default Routes;
