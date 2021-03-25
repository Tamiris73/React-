import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiAlternativa, apiQuestao } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IAlternativa } from "interfaces/alternativa.interface";
import { IQuestao} from "interfaces/questao.interface";

const AlternativaStore = () => {
  const [alternativa, setAlternativa] = useState<IAlternativa>({} as IAlternativa);
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
          const response = await apiAlternativa.show(id);
          setAlternativa(response.data);
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
      setAlternativa({ ...alternativa, [e.target.name]: e.target.value });
    },
    [alternativa]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiAlternativa.update(data.id, data);
          toast.success("Alternativa Alterada com sucesso!");
        } else {
          await apiAlternativa.store(data);
          toast.success("Alternativa Cadastrada com sucesso!");
        }
        history.push("/alternativa");
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
          <Link onClick={() => history.push("/alternativa")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="questao">Questao: </label>
              <Select
                name="questao"
                id="questao"
                value={alternativa.questoes_id|| ""}
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
              <label htmlFor="alternativa">Alternativa: </label>
              <Input
                type="text"
                name="alternativa"
                id="nome"
                value={alternativa.alternativa || ""}
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
                value={alternativa.questoes_id|| ""}
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
export default AlternativaStore;
