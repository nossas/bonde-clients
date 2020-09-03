/* eslint-disable react/display-name */
import React from "react";
import { Button } from "bonde-components";
import { zendeskOrganizations } from "../../services/utils";

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
    firstName: string;
    lastName?: string;
    id?: number;
  };
};

const columns = (
  groups: Array<{
    isVolunteer: boolean;
    name: string;
    communityId: number;
    organizationId?: number;
  }>
): Array<Columns> => {
  // const volunteerGroup = groups.find((i) => !!i.isVolunteer);
  const individualGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "individual",
      Header: "Nome",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        if (individualGroup?.communityId !== 40) {
          return value ? (
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          ) : (
            "-"
          );
        }
        return value ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value.id}/requested_tickets`}
          >
            <span>{value.firstName}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "individual.email",
      Header: "E-mail",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.tipoDeAcolhimento",
      Header: "Tipo",
      className:
        individualGroup?.organizationId === zendeskOrganizations["individual"]
          ? ""
          : "hide",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.address",
      Header: "Endereço",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "status",
      Header: "Status",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "availability",
      Header: "Disponibilidade",
      className:
        individualGroup?.organizationId === zendeskOrganizations["individual"]
          ? "hide"
          : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.createdAt",
      Header: "Data Inscrição",
      className:
        individualGroup?.organizationId === zendeskOrganizations["individual"]
          ? ""
          : "hide",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.encaminhamentosRealizados",
      Header: "ER",
      className: individualGroup?.communityId !== 40 ? "hide" : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.atendimentosEmAndamento",
      Header: "AT INI",
      className: individualGroup?.communityId !== 40 ? "hide" : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.atendimentosConcluidos",
      Header: "AT CON",
      className: individualGroup?.communityId !== 40 ? "hide" : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.whatsapp",
      Header: "Whatsapp",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "id",
      Header: "Ação",
      className: "sticky",
      Cell: ({ value }: { value: string }): JSX.Element | null => (
        <Button
          main="#ee0099"
          hover="#e2058a"
          focus="#b4006c"
          secondary
          onClick={() => console.log(value)}
        >
          Buscar match
        </Button>
      ),
    },
  ];
};

export default columns;
