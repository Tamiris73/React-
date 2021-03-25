import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiResolucao } from "api/data";
import { IResolucao } from "interfaces/resolucao.interface";
import { toast } from "react-toastify";
import {confirmAlert}  from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Resolucao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resolucao, setResolucao] = useState<IResolucao[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiResolucao.index();
    setResolucao(response.data);
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
            await apiResolucao.delete(id);
            toast.success("Resolucao removido!");
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
          <Button bgColor="success" onClick={() => history.push("/resolucao/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Resposta</th>
                <th>Questao</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {resolucao &&
                resolucao.map((item) => (
                  <tr key={item.id}>
                    <td>{item.resolucao}</td>
                    <td>{item.questao?.questao}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`resolucao/${item.id}`)}
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
export default Resolucao;
