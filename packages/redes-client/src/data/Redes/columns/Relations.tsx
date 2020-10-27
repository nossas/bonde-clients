/* eslint-disable react/display-name */
import React from "react";
import { css } from "styled-components/macro";
import { Icon, Theme as theme } from "bonde-components";
import { whatsappLink } from "../../../services/utils";
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
      Header: "Status",
      width: 200,
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
      Cell: ({ row }: valueAndRow): JSX.Element | null => {
        return (
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
                const individual = group.isVolunteer
                  ? "volunteer"
                  : "recipient";
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
        );
      },
    },
  ];
};

export default columns;
