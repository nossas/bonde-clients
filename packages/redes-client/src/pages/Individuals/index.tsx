import React, { useEffect } from "react";
import styled from "styled-components";
import { Header, Empty } from "bonde-components";
import { Table, Filters } from "../../components";
import { useFilter } from "../../services/FilterProvider";
import { groupsToSelect } from "../../services/utils";
import columns from "./columns";
import { Individual, MapaIndividual, Groups } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  community?: {
    id: number;
  };
  groups: Groups;
  data: {
    FetchIndividuals: ({
      children,
    }: {
      children: (data: {
        data: Individual[];
        individualsCount: {
          aggregate: {
            count: number;
          };
        };
      }) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

const stripIndividualFromData = (data: MapaIndividual[]): Individual[] =>
  data.map((d) => ({
    ...d,
    ...d.individual,
    coordinates: {
      latitude: d.individual.latitude,
      longitude: d.individual.longitude,
    },
  }));

export default function Individuals({
  data: { FetchIndividuals, FilterOptions },
  community,
  groups,
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();

  useEffect(() => {
    if (
      state.selectedGroup === null ||
      typeof state.selectedGroup === "undefined"
    )
      return dispatch({
        type: "group",
        value: {
          value: groups.find((group) => !group.isVolunteer)?.id || 0,
          label: groups.find((group) => !group.isVolunteer)?.name || "",
        },
      });
  }, []);

  const save = async (values: any) => {
    dispatch({ type: "individuals", value: values });
    return dispatch({ type: "page", value: 0 });
  };

  const reset = () =>
    dispatch({
      type: "reset",
    });

  const isVolunteerSelected =
    typeof state.selectedGroup !== "undefined" && state.selectedGroup !== null
      ? groups
          .filter((i) => !!i.isVolunteer)
          .find((i) => i.id === state.selectedGroup?.value)
      : false;

  return (
    <>
      <Filters
        save={save}
        onGroupChange={(e) => dispatch({ type: "group", value: e })}
        options={{
          ...FilterOptions,
          groups: groupsToSelect(groups),
        }}
        initialValues={{
          ...state.individuals,
          group: state.selectedGroup,
        }}
        reset={reset}
        searchPlaceholder={
          community?.id === 40
            ? "Buscar nome, email, especialidade..."
            : "Buscar nome, email..."
        }
        groups
        search
        state
        availability
        userStatus={!!isVolunteerSelected === true}
        relationshipStatus={
          !!isVolunteerSelected === false && community?.id === 40
        }
      />
      <FetchIndividuals>
        {({
          data,
          individualsCount: {
            aggregate: { count },
          },
        }) => {
          const pagination = {
            totalPages: Math.round(count / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };

          return count < 1 ? (
            <WrapEmpty>
              <Empty message="Nada por aqui..." />
            </WrapEmpty>
          ) : groups.length < 2 ? (
            <WrapEmpty>
              <Empty message="Não existem grupos suficientes nessa comunidade." />
            </WrapEmpty>
          ) : (
            <>
              <Header.H4>Total ({count})</Header.H4>
              <Table
                data={
                  community?.id === 40
                    ? stripIndividualFromData(
                        (data as unknown) as MapaIndividual[]
                      )
                    : data
                }
                columns={columns(community?.id || 0, !!isVolunteerSelected)}
                sticky="end"
                pagination={pagination}
              />
            </>
          );
        }}
      </FetchIndividuals>
    </>
  );
}

Individuals.displayName = "Individuals";
