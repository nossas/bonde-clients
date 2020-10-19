/* eslint-disable react/display-name */
import React from "react";
import { Icon, Button } from "bonde-components";
import { createWhatsappLink } from "../../../services/utils";
import { UpdateStatus } from "../../../components";
import {
  Groups,
  Columns,
  valueFirstName,
  valueString,
  valueAndRow,
} from "../../../types";
import UPDATE_RELATIONSHIP_MUTATION from "../UpdateRelationship";

const columns = (
  groups: Groups,
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  }
): Array<Columns> => {
  const volunteerGroup = groups.find((i) => !!i.isVolunteer);
  const recipientGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "volunteer",
      Header: () => volunteerGroup?.name || "-",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        return value ? (
          <span>{`${value.firstName} ${value.lastName || ""}`}</span>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "recipient",
      Header: () => recipientGroup?.name || "-",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        return value ? (
          <span>{`${value.firstName} ${value.lastName || ""}`}</span>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "relationshipStatus",
      Header: () => "Status",
      Cell: ({ value, row }: valueAndRow): JSX.Element | null =>
        value ? (
          <UpdateStatus
            name="status"
            row={row}
            options={FilterOptions.relationshipStatus}
            selected={value}
            query={UPDATE_RELATIONSHIP_MUTATION}
            type="relationship"
          />
        ) : null,
      bold: true,
    },
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
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        return value ? (
          <span>{`${value.firstName} ${value.lastName || ""}`}</span>
        ) : (
          "-"
        );
      },
    },
    {
      accessor: "id",
      Header: "Ação",
      className: "sticky",
      Cell: ({ value }: { value: string }): JSX.Element | null => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px",
            justifyContent: "center",
          }}
        >
          <a
            href={createWhatsappLink(value, "texto")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button main="#ee0099" hover="#e2058a" focus="#b06c" secondary>
              <Icon name="Whatsapp" size="small" />
              Whatsapp
            </Button>
          </a>
        </div>
      ),
    },
  ];
};

export default columns;
