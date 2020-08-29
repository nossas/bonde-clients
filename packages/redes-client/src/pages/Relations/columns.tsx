import React from "react";
import { Icon, Button } from "bonde-components";
import { createWhatsappLink } from "../../services/utils";

interface Columns {
  accessor: string;
  Header: any;
  Cell?: (arg0: any) => string | JSX.Element | null;
  width?: number;
  className?: string;
  bold?: boolean;
  show?: boolean;
  Column?: any;
}

type valueString = {
  value: string;
  row?: any;
};

type valueFirstName = {
  value: {
    first_name: string;
    last_name?: string;
  };
};

const columns = (
  groups: Array<{ isVolunteer: boolean; name: string }>
): Array<Columns> => [
  {
    accessor: "volunteer",
    Header: () => (groups ? groups.find((i) => !!i.isVolunteer)?.name : "-"),
    Cell: ({ value }: valueFirstName): JSX.Element | string =>
      value ? (
        <span>{`${value.first_name} ${value.last_name || ""}`}</span>
      ) : (
        "-"
      ),
    bold: true,
  },
  {
    accessor: "recipient",
    Header: () => (groups ? groups.find((i) => !i.isVolunteer)?.name : "-"),
    Cell: ({ value }: valueFirstName): JSX.Element | string =>
      value ? (
        <span>{`${value.first_name} ${value.last_name || ""}`}</span>
      ) : (
        "-"
      ),
    bold: true,
  },
  // {
  //   accessor: "volunteer",
  //   Header: "Tipo"
  // },
  {
    accessor: "createdAt",
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
    accessor: "updatedAt",
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
  {
    accessor: "volunteer.whatsapp",
    Header: "Ação",
    className: "sticky",
    Cell: ({ value }: { value: string }): JSX.Element | null => (
      <a
        href={createWhatsappLink(value, "texto")}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Button main="#ee0099" hover="#e2058a" focus="#b4006c" secondary>
          <Icon name="Whatsapp" size="small" />
          Whatsapp
        </Button>
      </a>
    ),
  },
];

export default columns;
