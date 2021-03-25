import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiAlternativa } from "api/data";
import { IAlternativa } from "interfaces/alternativa.interface";
import { toast } from "react-toastify";
import {confirmAlert}  from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Alternativa = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alternativa, setAlternativa] = useState<IAlternativa[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiAlternativa.index();
    setAlternativa(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    confirmAlert({
      title: "Atenção",
      message: "Tem certeza que deseja apagar o item selecionado?",
      buttons: [
        {
          label: "SIM",
          onClick: async () => {
            await apiAlternativa.delete(id);
            toast.success("Alternativa removido!");
            fetchData();
          },
        },
        {
          label: "NÃO",
          onClick: () => console.log("não"),
        },
      ],
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button bgColor="success" onClick={() => history.push("/alternativa/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Alternativa</th>
                <th>Questao</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {alternativa &&
                alternativa.map((item) => (
                  <tr key={item.id}>
                    <td>{item.alternativa}</td>
                    <td>{item.questao?.questao}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`alternativa/${item.id}`)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                    <td>
                      <Button
                        bgColor="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </S.Table>
        </>
      )}
    </>
  );
};
export default Alternativa;
