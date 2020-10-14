/* eslint-disable react/display-name */
import React from "react";
import { Button } from "bonde-components";
import { Link } from "react-router-dom";
import { Columns, valueString, Individual } from "../../types";
import {
  MAPA_DO_ACOLHIMENTO_COMMUNITY,
  zendeskOrganizations,
} from "../../services/utils";

const columns = (
  communityId: number,
  isVolunteerSelected?: boolean
): Array<Columns> => {
  return [
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
        if (communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY) {
          return original.firstName && original.lastName ? (
            <span>{`${original.firstName} ${original.lastName || ""}`}</span>
          ) : (
            "-"
          );
        }
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
    },
    {
      accessor: "email",
      Header: "E-mail",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "tipoDeAcolhimento",
      Header: "Tipo",
      // hide if is a volunteer or not from mapa
      className:
        typeof isVolunteerSelected === "undefined" &&
        communityId == MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : isVolunteerSelected || communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
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
    },
    {
      accessor: "userStatus",
      className:
        typeof isVolunteerSelected === "undefined"
          ? ""
          : communityId === 40 && !isVolunteerSelected
          ? "hide"
          : "", // hide if is from mapa and a recipient
      Header: "Status Inscrição",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span style={{ textTransform: "capitalize" }}>
          {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
        </span>
      ),
    },
    {
      accessor: "relationshipStatus",
      // hide if is a volunteer or not from mapa
      className:
        typeof isVolunteerSelected === "undefined" &&
        communityId == MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : isVolunteerSelected || communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
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
        typeof isVolunteerSelected === "undefined" &&
        communityId == MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : !isVolunteerSelected ||
            communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? "hide"
          : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || 0}</span>
      ),
    },
    {
      accessor: "atendimentosEmAndamento",
      Header: "AT INI",
      // hide if is a recipient or not from mapa
      className:
        typeof isVolunteerSelected === "undefined" &&
        communityId == MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : !isVolunteerSelected ||
            communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? "hide"
          : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || 0}</span>
      ),
    },
    {
      accessor: "atendimentosConcluidos",
      Header: "AT CON",
      /// hide if is a recipient or not from mapa
      className:
        typeof isVolunteerSelected === "undefined" &&
        communityId == MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : !isVolunteerSelected ||
            communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? "hide"
          : "",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || 0}</span>
      ),
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
              focus="#bMAPA_DO_ACOLHIMENTO_COMMUNITY06c"
              secondary
              disabled={
                original.organizationId === zendeskOrganizations["individual"]
                  ? original.availability !== "inscrita"
                  : original.availability !== "disponivel"
              }
            >
              Buscar match
            </Button>
          </Link>
        );
      },
    },
  ];
};

export default columns;
