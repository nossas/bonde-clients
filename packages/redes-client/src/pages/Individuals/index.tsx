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
    if (
      state.individuals.group === null ||
      typeof state.individuals.group === "undefined"
    )
      return dispatch({
        type: "individuals",
        value: {
          group: {
            value: groups.find((group) => !group.isVolunteer)?.id,
            label: groups.find((group) => !group.isVolunteer)?.name,
          },
        },
      });
  }, [state.individuals.group]);

  const save = async (values: any) => {
    // This needs to be done because when the text input is cleaned, it doesn't come as an `undefined` value, it's just not present and the previous state is maintained in the provider. Because of that, every time we dispatch the newValues, we need to clear them first.
    const newValues = {
      query: undefined,
      state: undefined,
      agent: undefined,
      availability: undefined,
      userStatus: undefined,
      group: {
        value: groups.find((group) => !group.isVolunteer)?.id,
        label: groups.find((group) => !group.isVolunteer)?.name,
      },
      ...values,
    };
    dispatch({ type: "individuals", value: newValues });
    return dispatch({ type: "page", value: 0 });
  };

  const reset = () =>
    dispatch({
      type: "individuals",
      value: {
        query: undefined,
        state: undefined,
        agent: undefined,
        availability: undefined,
        userStatus: undefined,
        group: {
          value: groups.find((group) => !group.isVolunteer)?.id,
          label: groups.find((group) => !group.isVolunteer)?.name,
        },
      },
    });

  const isVolunteerSelected =
    typeof state.individuals.group !== "undefined" &&
    state.individuals.group !== null
      ? groups
          .filter((i) => !!i.isVolunteer)
          .find((i) => i.id === state.individuals.group.value)
      : false;

  return (
    <>
      <Filters
        save={save}
        options={{
          ...FilterOptions,
          groups: groupsToSelect(groups),
        }}
        initialValues={state.individuals}
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
