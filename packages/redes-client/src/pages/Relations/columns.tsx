/* eslint-disable react/display-name */
import React from "react";
import { Icon, Button } from "bonde-components";
import {
  createWhatsappLink,
  zendeskOrganizations,
  getAgentFromZendeskUserId,
} from "../../services/utils";

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
  const volunteerGroup = groups.find((i) => !!i.isVolunteer);
  const individualGroup = groups.find((i) => !i.isVolunteer);
  return [
    {
      accessor: "volunteer",
      Header: () => volunteerGroup?.name || "-",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        if (volunteerGroup?.communityId !== 40) {
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
      Header: () => individualGroup?.name || "-",
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
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          </a>
        ) : (
          "-"
        );
      },
      bold: true,
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
        if (groups.find((i) => !i.isVolunteer)?.communityId !== 40) {
          return value ? (
            <span>{`${value.firstName} ${value.lastName || ""}`}</span>
          ) : (
            "-"
          );
        }
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
};

export default columns;
