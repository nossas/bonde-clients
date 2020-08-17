import React from "react";

interface Columns {
  accessor: string;
  Header: string;
  Cell?: (arg0: any) => string | JSX.Element | null;
  width?: number;
}

type valueString = {
  value: string;
};

type valueFirstName = {
  value: {
    first_name: string;
    last_name?: string;
  };
};

const columns: Array<Columns> = [
  {
    accessor: "volunteer",
    Header: "Voluntária",
    Cell: ({ value }: valueFirstName): JSX.Element | string =>
      value ? <span>{`${value.first_name} ${value.last_name}`}</span> : "-",
  },
  {
    accessor: "recipient",
    Header: "PSR",
    Cell: ({ value }: valueFirstName): JSX.Element | string =>
      value ? <span>{`${value.first_name} ${value.last_name}`}</span> : "-",
  },
  {
    accessor: "created_at",
    Header: "Data de criação",
    Cell: ({ value }: valueString): string => {
      if (!value) {
        return "-";
      }
      const data = new Date(value);
      return data.toLocaleDateString("pt-BR");
    },
  },
  {
    accessor: "updated_at",
    Header: "Última atualização",
    Cell: ({ value }: valueString): string => {
      if (!value) {
        return "-";
      }
      const data = new Date(value);
      return data.toLocaleDateString("pt-BR");
    },
  },
  {
    accessor: "agent",
    Header: "Feito por",
    Cell: ({ value }: valueFirstName): JSX.Element | string =>
      value ? <span>{`${value.first_name} ${value.last_name}`}</span> : "-",
  },
];

export default columns;
