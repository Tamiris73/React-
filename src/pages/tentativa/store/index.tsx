import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiTentativa, apiUsuario } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { ITentativa } from "interfaces/Tentativa.interface";
import { IUser} from "interfaces/Usuario.interface";

const TentativaStore = () => {
  const [tentativa, setTentativa] = useState<ITentativa>({} as ITentativa);
  const [user, setUsuario] = useState<IUser[]>({} as IUser[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await apiUsuario.index();
        setUsuario(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsuario();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiTentativa.show(id);
          setTentativa(response.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(Number(id));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = useCallback(
    async (e) => {
      setTentativa({ ...tentativa, [e.target.name]: e.target.value });
    },
    [tentativa]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiTentativa.update(data.id, data);
          toast.success("Tentativa Alterada com sucesso!");
        } else {
          await apiTentativa.store(data);
          toast.success("Tentativa Cadastrada com sucesso!");
        }
        history.push("/tentativa");
      } catch (error) {
        toast.error(() =>
          error.response.data ? error.response.data.join("\n") : error.message
        );
      }
    },
    [history]
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link onClick={() => history.push("/tentativa")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="usuario">Usuario: </label>
              <Select
                name="user_id"
                id="user"
                value={tentativa.user_id || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {user.length > 0 &&
                  user.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.username}
                      {item.email}
                      {item.password}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="tentativa">Tentativa </label>
              <Input
                type="text"
                name="tentativa"
                id="nome"
                value={tentativa.tentativa || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <div>
              <label htmlFor="user_id">User_id: </label>
              <Textarea
                name="user_id"
                id="user_id"
                value={tentativa.user_id || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.descricao}
              />
            </div>
            <Button bgColor="success" type="submit">
              <FaSave /> &nbsp; Salvar
            </Button>
          </Form>
        </>
      )}
    </>
  );
};
export default TentativaStore;
