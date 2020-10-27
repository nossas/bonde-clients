/* eslint-disable react/display-name */
import React from "react";
import { css } from "styled-components";
import { Icon, Theme as theme } from "bonde-components";
import {
  whatsappLink,
  zendeskOrganizations,
  getAgentFromZendeskUserId,
} from "../../../services/utils";
import {
  Groups,
  Columns,
  valueFirstName,
  valueString,
  valueAndRow,
} from "../../../types";

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
        return (
          <span style={{ textTransform: "capitalize" }}>
            {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
          </span>
        );
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
      accessor: "phone",
      Header: "Ação",
      className: "sticky",
      Cell: ({ row }: valueAndRow): JSX.Element | null => (
        <div
          css={css`
            display: grid;
            grid-template-columns: auto auto;
            justify-content: center;
            width: 100%;
            grid-gap: 20px;
            align-items: center;
            height: 100%;
          `}
        >
          <Icon name="Whatsapp" size="small" color={theme.brand.main} />
          <div style={{ display: "grid" }}>
            {groups.map((group, i) => {
              const individual = group.isVolunteer ? "volunteer" : "recipient";
              return (
                <a
                  href={whatsappLink(
                    row.original[individual]?.whatsapp ||
                      row.original[individual]?.phone ||
                      "",
                    ""
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  key={`whatsapp-link-${i}`}
                  css={css`
                    color: ${theme.brand.main};
                  `}
                >
                  {group.name}
                </a>
              );
            })}
          </div>
        </div>
      ),
    },
  ];
};

export default columns;
