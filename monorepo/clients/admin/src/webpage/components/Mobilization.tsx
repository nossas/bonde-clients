import { useAppState } from "webpage/Application";
import * as actionsType from "../actionTypes";

const Mobilization = () => {
  const { state, dispatch } = useAppState();

  return (
    <>
      <h3>Número de mobilizações {state?.mobilizations?.data.length || 0};</h3>
      <button onClick={() => dispatch({ type: actionsType.FETCH_MOBILIZATIONS_SUCCESS, payload: [{ id: 1 }] })}>Adicionar mobilização</button>
    </>
  )
}

export default Mobilization;