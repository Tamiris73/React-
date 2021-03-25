import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiTentativa } from "api/data";
import { ITentativa } from "interfaces/Tentativa.interface";
import { toast } from "react-toastify";
import {confirmAlert}  from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Tentativa = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tentativa, setTentativa] = useState<ITentativa[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiTentativa.index();
    setTentativa(response.data);
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
            await apiTentativa.delete(id);
            toast.success("TenapiTentativa removido!");
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
          <Button bgColor="success" onClick={() => history.push("/tentativa/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Tentativa</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {tentativa &&
                tentativa.map((item) => (
                  <tr key={item.id}>
                    <td>{item.tentativa}</td>
                    <td>{item.usuario?.username}</td>
                    <td>{item.respostas_id}</td>
                    <td>{item.user_id}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`tentativa/${item.id}`)}
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
export default Tentativa;
