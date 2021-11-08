import { createContext, useReducer, useContext } from "react";
import type { Reducer } from "react";
import { reducer as appReducer, initialState } from "./reducers";
import type { State as StateApp } from "./reducers";

export interface Action {
  type: string;
  payload?: any;
}

export interface IApplicationContext {
  state: StateApp;
  dispatch: (action: Action) => void;
}

export const applicationContext = createContext<IApplicationContext>({
  state: initialState,
  dispatch: (action) => console.log("application -> ", action)
});

const Application: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<StateApp, Action>>(appReducer, initialState);

  return (
    <applicationContext.Provider value={{ state, dispatch }}>
      {children}
    </applicationContext.Provider>
  );
}

export const useAppState = () => useContext(applicationContext);

export default Application;