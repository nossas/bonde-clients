import React, { useEffect } from "react";
import styled from "styled-components";
import { Header, Empty } from "bonde-components";
import { Table, Filters } from "../../components";
import { useFilter } from "../../services/FilterProvider";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { groupsToSelect } from "../../services/utils";
import columns from "./columns";
import { MapaIndividual } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  loading?: boolean;
  error?: any;
  data: {
    FetchUsersByGroup: ({
      children,
    }: {
      children: (data: {
        data: MapaIndividual[];
        count: number;
      }) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

export default function Individuals({
  data: { FetchUsersByGroup, FilterOptions },
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();
  const { groups } = useCommunityExtra();

  useEffect(() => {
    if (state.group === null || typeof state.group === "undefined")
      return dispatch({
        type: "group",
        value: {
          value: groups.find((group) => !group.isVolunteer)?.id || 0,
          label: groups.find((group) => !group.isVolunteer)?.name || "",
        },
      });
  }, [state.group]);

  const save = async (values: any) => {
    dispatch({ type: "individuals", value: values });
    return dispatch({ type: "page", value: 0 });
  };

  const reset = () =>
    dispatch({
      type: "group",
      value: {
        value: groups.find((group) => !group.isVolunteer)?.id || 0,
        label: groups.find((group) => !group.isVolunteer)?.name || "",
      },
    });

  const isVolunteerSelected =
    typeof state.group !== "undefined" && state.group !== null
      ? groups
          .filter((i) => !!i.isVolunteer)
          .find((i) => i.id === state.group.value)
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
          group: state.group,
        }}
        reset={reset}
        searchPlaceholder="Buscar nome, email, especialidade..."
        groups
        search
        state
        availability
        userStatus={!!isVolunteerSelected === true}
        relationshipStatus={!!isVolunteerSelected === false}
      />
      <FetchUsersByGroup>
        {({ data, count }) => {
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
                data={data}
                columns={columns(groups, !!isVolunteerSelected)}
                sticky="end"
                pagination={pagination}
              />
            </>
          );
        }}
      </FetchUsersByGroup>
    </>
  );
}

Individuals.displayName = "Individuals";
