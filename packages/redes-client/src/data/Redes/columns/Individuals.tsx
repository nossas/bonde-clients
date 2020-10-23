/* eslint-disable react/display-name */
import React from "react";
import { UpdateStatus } from "../../../components";
import { Columns, valueString, Individual, valueAndRow } from "../../../types";
import UPDATE_INDIVIDUAL_MUTATION from "../UpdateIndividual";

const columns = (
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  },
  isVolunteerSelected?: boolean
): Array<Columns> => [
    {
    Header: "Dados Principais",
    columns: [
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
        width: 250,
        bold: true,
      },
      {
        accessor: "email",
        Header: "E-mail",
        Cell: ({ value }: { value: string }): JSX.Element | string => (
          <span>{value || "-"}</span>
        ),
        width: 300
      },
      {
        accessor: "address",
        Header: "Endereço",
        style: { padding: "10px 0 0 20px" },
        Cell: ({ value }: { value: string }): JSX.Element | string => (
          <span>{value || "-"}</span>
        ),
        width: 300
      },
      {
        accessor: "state",
        Header: "Estado",
        Cell: ({ value }: { value: string }): JSX.Element | string => (
          <span>{value || "-"}</span>
        ),
      },
      {
        accessor: "userStatus",
        Header: "Status Inscrição",
        width: 200,
        Cell: ({ value, row }: valueAndRow): JSX.Element | null =>
          value && row ? (
            <UpdateStatus
              name="status"
              row={row}
              options={FilterOptions.userStatus}
              selected={value}
              type="individual"
              query={UPDATE_INDIVIDUAL_MUTATION}
            />
          ) : null,
      },
      {
        accessor: "availability",
        Header: "Disponibilidade",
        width: 200,
        Cell: ({ value, row }: valueAndRow): JSX.Element | null =>
          value ? (
            <UpdateStatus
              name="availability"
              row={row}
              options={FilterOptions.availability}
              selected={value}
              type="individual"
              query={UPDATE_INDIVIDUAL_MUTATION}
            />
          ) : null,
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
      }
    ]
  }
];

export default columns;
