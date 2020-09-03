/* eslint-disable react/display-name */
import React from "react";
import { Button } from "bonde-components";
import { Link } from "react-router-dom";
import { Groups, Columns, valueFirstName, valueString } from "../../types";
import { MAPA_DO_ACOLHIMENTO_COMMUNITY } from "../../services/utils";

const columns = (
  groups: Groups,
  isVolunteerSelected: boolean
): Array<Columns> => {
  const communityId = groups.find((i) => !!i.isVolunteer)?.communityId;
  return [
    {
      accessor: "individual",
      Header: "Nome",
      Cell: ({ value }: valueFirstName): JSX.Element | string => {
        if (communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY) {
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
      // is a volunteer or not from mapa
      className:
        !!isVolunteerSelected || communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? "hide"
          : "",
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
      accessor: "userStatus",
      className: !!isVolunteerSelected ? "" : "hide", // is a recipient
      Header: "Status",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "relationShipStatus",
      // is a volunteer or not from mapa
      className:
        !!isVolunteerSelected || communityId !== MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? "hide"
          : "",
      Header: "Status",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "availability",
      Header: "Disponibilidade",
      className: !!isVolunteerSelected ? "" : "hide", // is a recipient
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.createdAt",
      Header: "Data Inscrição",
      className: !!isVolunteerSelected ? "hide" : "", // is a volunteer
      Cell: ({ value }: valueString): string => {
        if (!value) {
          return "-";
        }
        const data = new Date(value);
        return data.toLocaleDateString("pt-BR");
      },
    },
    {
      accessor: "individual.encaminhamentosRealizados",
      Header: "ER",
      // is not volunteer from mapa
      className:
        !!isVolunteerSelected && communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : "hide",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.atendimentosEmAndamento",
      Header: "AT INI",
      // is not volunteer from mapa
      className:
        !!isVolunteerSelected && communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : "hide",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "individual.atendimentosConcluidos",
      Header: "AT CON",
      // is not volunteer from mapa
      className:
        !!isVolunteerSelected && communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY
          ? ""
          : "hide",
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
      Cell: (props: any): JSX.Element | null => {
        // console.log({ props });
        return (
          <Link
            to={{
              pathname: "/match",
            }}
          >
            <Button
              main="#ee0099"
              hover="#e2058a"
              focus="#bMAPA_DO_ACOLHIMENTO_COMMUNITY06c"
              secondary
              onClick={() => console.log(props.value)}
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
