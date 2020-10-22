import React, { useEffect } from "react";
import styled from "styled-components";
import { Header, Empty } from "bonde-components";
import { Table, Filters } from "../components";
import { useFilter } from "../services/FilterProvider";
import { groupsToSelect, stripIndividualFromData } from "../services/utils";
import { Individual, Groups, MapaIndividualTicket, Columns } from "../types";

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
    ColumnsIndividuals: (
      FilterOptions: {
        [x: string]: { label: string; value: string | number }[];
      },
      isVolunteerSelected?: boolean
    ) => Array<Columns>;
  };
};

export default function Individuals({
  data: { FetchIndividuals, FilterOptions, ColumnsIndividuals },
  community,
  groups,
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();

  useEffect(() => {
    // if state.selectedGroup is null, we shouldn't change the state - the user that cleaned it
    if (
      typeof state.selectedGroup === "undefined" ||
      state.selectedGroup?.value === 0
    )
      return dispatch({
        type: "group",
        value: {
          value: groups.find((group) => !group.isVolunteer)?.id || 0,
          label: groups.find((group) => !group.isVolunteer)?.name || "",
        },
      });
  }, [state.selectedGroup]);

  const save = async (values: any) => {
    dispatch({ type: "individuals", value: values });
    return dispatch({ type: "page", value: 0 });
  };

  const reset = () =>
    dispatch({
      type: "reset",
    });

  const isVolunteerSelected =
    typeof state.selectedGroup !== "undefined" &&
    state.selectedGroup !== null &&
    state.selectedGroup.value !== 0
      ? !!groups
          .filter((i) => !!i.isVolunteer)
          .find((i) => i.id === state.selectedGroup?.value)
      : undefined;

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
          groups: state.selectedGroup,
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
        userStatus={community?.id === 40 ? isVolunteerSelected : true}
        relationshipStatus={
          (!isVolunteerSelected ||
            typeof isVolunteerSelected === "undefined") &&
          community?.id === 40
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

          const originalColumns = ColumnsIndividuals(FilterOptions, isVolunteerSelected)
          const dynamicColumns = {
            Header: "Extras",
            columns: data[0].extras ? Object.keys(data[0].extras).map((e: any) => ({
              accessor: `extras.${e}`,
              Header: e,
              // eslint-disable-next-line react/display-name
              Cell: (props: any): JSX.Element | string => {
                console.log(props)
                return <span>{props.value || "-"}</span>
              },
            })) : []
          }
          const columnsWithDynamiContent = [...originalColumns.slice(0, originalColumns.length - 1), dynamicColumns, ...originalColumns.slice(originalColumns.length - 1)]
        
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
                        (data as unknown) as MapaIndividualTicket[]
                      )
                    : data
                }
                columns={columnsWithDynamiContent}
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
