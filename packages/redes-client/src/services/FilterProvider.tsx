import React from "react";

// export type Filters = {
//   [x: string]: { label: string; value: string | number } & string;
// };

export type Pagination = {
  rows: number;
  offset: number;
  page: number;
};

type Action =
  | { type: "page"; value: number }
  | { type: "rows"; value: number }
  | { type: "relationships"; value: any };

type Dispatch = (action: Action) => void;

type State = {
  relationships: any;
} & Pagination;

const FilterStateContext = React.createContext<State | undefined>(undefined);
const FilterDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function filterReducer(state: State, action: Action) {
  switch (action.type) {
    case "page": {
      const valid =
        typeof action.value !== "undefined" ? action.value : state.page;
      return {
        ...state,
        page: valid,
        offset: valid * state.rows,
      };
    }
    case "rows": {
      return {
        ...state,
        rows: action.value,
        offset: action.value * state.page,
      };
    }
    case "relationships": {
      return {
        ...state,
        relationships: {
          ...state.relationships,
          ...action.value,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const FilterProvider = ({ children }: { children: any }): any => {
  const initialFilter = {
    query: undefined,
    status: undefined,
    state: undefined,
    agent: undefined,
    // created_at: undefined,
  };

  const filtered = {
    rows: 10,
    offset: 10 * 0,
    page: 0,
    relationships: initialFilter,
  };

  const [state, dispatch] = React.useReducer(filterReducer, filtered);

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};

function useFilterState(): State {
  const context = React.useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
}

function useFilterDispatch(): Dispatch {
  const context = React.useContext(FilterDispatchContext);
  if (context === undefined) {
    throw new Error("useFilterDispatch must be used within a FilterProvider");
  }
  return context;
}

const useFilter = (): [State, Dispatch] => [
  useFilterState(),
  useFilterDispatch(),
];

export { FilterProvider, useFilterState, useFilterDispatch, useFilter };
