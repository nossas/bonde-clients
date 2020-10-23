/* eslint-disable react/display-name */
import React from "react";
import { Icon, Button } from "bonde-components";
import {
  createWhatsappLink,
  zendeskOrganizations,
  getAgentFromZendeskUserId,
} from "../../../services/utils";
import { Groups, Columns, valueFirstName, valueString } from "../../../types";

const columns = (
  groups: Groups,
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  }
): Array<Columns> => {
  console.log(FilterOptions);
  const volunteerGroup = groups.find((i) => !!i.isVolunteer);
  const recipientGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "volunteer",
      Header: () => volunteerGroup?.name || "-",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        return value ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value.id}/requested_tickets`}
          >
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          </a>
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href={`https://mapadoacolhimento.zendesk.com/agent/users/${value.id}/requested_tickets`}
          >
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "relationshipStatus",
      Header: "Status",
      Cell: ({ value }: valueString): JSX.Element | string => {
        return <span style={{ textTransform: "capitalize" }}>{value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}</span>
      },
    },
    {
      accessor: "recipient.state",
      Header: "Estado",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span style={{ textTransform: "uppercase" }}>{value || "-"}</span>
      ),
    },
    {
      accessor: "volunteer.organizationId",
      Header: "Tipo",
      Cell: ({ value }: { value: number }): JSX.Element | string => {
        return value === zendeskOrganizations.lawyer ? (
          <span>Jurídico</span>
        ) : value === zendeskOrganizations.therapist ? (
          <span>Psicológico</span>
        ) : (
          "-"
        );
      },
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
      accessor: "agent",
      Header: "Feito por",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        return value ? (
          <span>{getAgentFromZendeskUserId[(value as unknown) as number]}</span>
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
