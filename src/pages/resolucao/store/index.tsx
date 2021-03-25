import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiResolucao, apiQuestao } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IResolucao } from "interfaces/resolucao.interface";
import { IQuestao} from "interfaces/questao.interface";

const ResolucaoStore = () => {
  const [resolucao, setResolucao] = useState<IResolucao>({} as IResolucao);
  const [questao, setQuestao] = useState<IQuestao[]>({} as IQuestao[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const response = await apiQuestao.index();
        setQuestao(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestao();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiResolucao.show(id);
          setResolucao(response.data);
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
      setResolucao({ ...resolucao, [e.target.name]: e.target.value });
    },
    [resolucao]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiResolucao.update(data.id, data);
          toast.success("Resolucao Alterada com sucesso!");
        } else {
          await apiResolucao.store(data);
          toast.success("Resolucao Cadastrada com sucesso!");
        }
        history.push("/resolucao");
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
          <Link onClick={() => history.push("/resolucao")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="questao">Questao: </label>
              <Select
                name="questao"
                id="questao"
                value={resolucao.questoes_id|| ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {questao.length > 0 &&
                  questao.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.questao}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="resolucao">Resolucao: </label>
              <Input
                type="text"
                name="resolucao"
                id="nome"
                value={resolucao.resolucao || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <div>
              <label htmlFor="questao">Questao id: </label>
              <Textarea
                name="questao"
                id="questao"
                value={resolucao.questoes_id|| ""}
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
export default ResolucaoStore;
