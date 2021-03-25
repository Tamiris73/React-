import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiQuestao, apiArea } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IQuestao } from "interfaces/questao.interface";
import { IArea} from "interfaces/areaConhecimento.interface";

const QuestaoStore = () => {
  const [questao, setQuestao] = useState<IQuestao>({} as IQuestao);
  const [area, setArea] = useState<IArea[]>({} as IArea[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await apiArea.index();
        setArea(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArea();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiQuestao.show(id);
          setQuestao(response.data);
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
      setQuestao({ ...questao, [e.target.name]: e.target.value });
    },
    [questao]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiQuestao.update(data.id, data);
          toast.success("Questao Alterada com sucesso!");
        } else {
          await apiQuestao.store(data);
          toast.success("Questao Cadastrada com sucesso!");
        }
        history.push("/questao");
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
          <Link onClick={() => history.push("/questao")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="area">Area de Conhecimento: </label>
              <Select
                name="area"
                id="area"
                value={questao.area_conhecimentos_id|| ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {area.length > 0 &&
                  area.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="questao">Questao: </label>
              <Input
                type="text"
                name="questao"
                id="nome"
                value={questao.questao || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <div>
              <label htmlFor="area">Area de Conhecimento id: </label>
              <Textarea
                name="area"
                id="area"
                value={questao.area_conhecimentos_id|| ""}
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
export default QuestaoStore;
