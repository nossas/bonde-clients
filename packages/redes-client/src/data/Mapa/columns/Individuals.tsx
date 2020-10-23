/* eslint-disable react/display-name */
import React from "react";
import { Columns, valueString, Individual } from "../../../types";

const columns = (
  _FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  },
  isVolunteerSelected?: boolean
): Array<Columns> => [
  {
    accessor: "id",
    Header: "Nome",
    Cell: ({
      row: { original },
      value,
    }: {
      row: { original: Individual };
      value: number;
    }): JSX.Element | string => {
      return original.firstName ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
          href={`https://mapadoacolhimento.zendesk.com/agent/users/${value}/requested_tickets`}
        >
          <span>{original.firstName}</span>
        </a>
      ) : (
        "-"
      );
    },
    bold: true,
    width: 250,
  },
  {
    accessor: "email",
    Header: "E-mail",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || "-"}</span>
    ),
    width: 200
  },
  {
    accessor: "tipoDeAcolhimento",
    Header: "Tipo",
    // hide if is a volunteer
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : isVolunteerSelected
        ? "hide"
        : "",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span style={{ textTransform: "capitalize" }}>
        {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
      </span>
    ),
  },
  {
    accessor: "address",
    Header: "Endereço",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || "-"}</span>
    ),
    width: 300
  },
  {
      accessor: "state",
      Header: "Estado",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span style={{ textTransform: "uppercase" }}>{value || "-"}</span>
      ),
    },
    {
    accessor: "userStatus",
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : !isVolunteerSelected
        ? "hide"
        : "", // hide if is a recipient
    Header: "Status Inscrição",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span style={{ textTransform: "capitalize" }}>
        {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
      </span>
    ),
    width: 200,
  },
  {
    accessor: "relationshipStatus",
    // hide if is a volunteer
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : isVolunteerSelected
        ? "hide"
        : "",
    Header: "Status Relação",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span style={{ textTransform: "capitalize" }}>
        {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
      </span>
    ),
  },
  {
    accessor: "availability",
    Header: "Disponibilidade",
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : !isVolunteerSelected
        ? "hide"
        : "", // hide if is a recipient
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span style={{ textTransform: "capitalize" }}>
        {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
      </span>
    ),
    width: 200,
  },
  {
    accessor: "createdAt",
    Header: "Data Inscrição",
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : isVolunteerSelected
        ? "hide"
        : "", // hide if is a volunteer
    Cell: ({ value }: valueString): string => {
      if (!value) {
        return "-";
      }
      const data = new Date(value);
      return data.toLocaleDateString("pt-BR");
    },
  },
  {
    accessor: "encaminhamentosRealizados",
    Header: "ER",
    // hide if is a recipient or not from mapa
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : !isVolunteerSelected
        ? "hide"
        : "",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || 0}</span>
    ),
    width: 50
  },
  {
    accessor: "atendimentosEmAndamento",
    Header: "AT INI",
    // hide if is a recipient or not from mapa
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : !isVolunteerSelected
        ? "hide"
        : "",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || 0}</span>
    ),
    width: 50
  },
  {
    accessor: "atendimentosConcluidos",
    Header: "AT CON",
    /// hide if is a recipient or not from mapa
    className:
      typeof isVolunteerSelected === "undefined"
        ? ""
        : !isVolunteerSelected
        ? "hide"
        : "",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || 0}</span>
    ),
    width: 80
  },
  {
    accessor: "whatsapp",
    Header: "Whatsapp",
    Cell: ({
      value,
      row: { original },
    }: {
      value: string;
      row: { original: Individual };
    }): JSX.Element | string => <span>{value || original.phone || "-"}</span>,
    },
];

export default columns;
