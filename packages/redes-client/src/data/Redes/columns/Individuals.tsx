/* eslint-disable react/display-name */
import React from "react";
import { Button } from "bonde-components";
import { Link } from "react-router-dom";
import { Columns, valueString, Individual } from "../../../types";

const columns = (isVolunteerSelected?: boolean): Array<Columns> => [
  {
    accessor: "id",
    Header: "Nome",
    Cell: ({
      row: { original },
    }: {
      row: { original: Individual };
      value: number;
    }): JSX.Element | string => {
      return original.firstName && original.lastName ? (
        <span>{`${original.firstName} ${original.lastName || ""}`}</span>
      ) : (
        "-"
      );
    },
    bold: true,
  },
  {
    accessor: "email",
    Header: "E-mail",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || "-"}</span>
    ),
  },
  {
    accessor: "address",
    Header: "Endereço",
    Cell: ({ value }: { value: string }): JSX.Element | string => (
      <span>{value || "-"}</span>
    ),
  },
  {
    accessor: "userStatus",
    Header: "Status Inscrição",
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
  {
    accessor: "phone",
    Header: "Ação",
    className: "sticky",
    Cell: ({
      row: { original },
    }: {
      row: { original: Individual };
    }): JSX.Element | null => {
      return (
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/match",
            search: `?email=${original.email}`,
            state: { ...original },
          }}
        >
          <Button
            main="#ee0099"
            hover="#e2058a"
            focus="#b06c"
            secondary
            disabled={
              original.userStatus !== "aprovada" ||
              original.availability !== "disponível"
            }
          >
            Buscar match
          </Button>
        </Link>
      );
    },
  },
];

export default columns;
