import React, { useCallback, useState, useEffect } from "react";
import * as turf from "@turf/turf";
import { Button, Header, Text } from "bonde-components";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

import { getMatchGroup } from "../services/utils";
import { Columns, Groups, Individual } from "../types";
import { Table, Popup } from "../components";
import { useFilter } from "../services/FilterProvider";

type Props = {
  groups: Groups;
  data: {
    FetchIndividualsForMatch: ({
      children,
    }: {
      children: (data: any) => React.ReactElement;
    }) => React.ReactElement | null;
    CreateRelationship: string;
    ColumnsMatch: (
      setIndividual: (individual: any) => void,
      setModal: (value: boolean) => void,
      isVolunteerSelected?: boolean
    ) => Array<Columns>;
  };
};

const WrapButton = styled.div`
  & > button {
    padding: 0;
  }
`;

const Wrap = styled.div`
  & > ${Header.H4} {
    margin: 15px 0 10px;
  }
  & > ${Text} {
    margin-top: 0;
  }
`;

export default function Match({
  data: { FetchIndividualsForMatch, ColumnsMatch, CreateRelationship },
  groups,
}: Props): React.ReactElement {
  const { state: linkState } = useLocation();
  const { goBack } = useHistory();
  const [state, dispatch] = useFilter();
  const [isOpen, setModal] = useState<boolean>(false);

  const {
    firstName,
    coordinates: { latitude, longitude },
  } = (linkState as unknown) as Individual;
  const matchGroup = getMatchGroup(
    groups,
    (linkState as unknown) as Individual
  );

  const isVolunteerSelected =
    typeof state.selectedGroup !== "undefined" &&
    state.selectedGroup !== null &&
    state.selectedGroup.value !== 0
      ? !!groups
          .filter((i) => !!i.isVolunteer)
          .find((i) => i.id === state.selectedGroup?.value)
      : undefined;

  useEffect(() => {
    dispatch({
      type: "match",
      value: {
        [isVolunteerSelected
          ? "volunteer"
          : "recipient"]: linkState as Individual,
      },
    });
    dispatch({ type: "rows", value: 30 });
  }, [linkState, dispatch]);

  const filterByDistance = useCallback(
    (data: Individual[]) =>
      data
        .map((i) => {
          const pointA = [
            Number(i.coordinates.latitude),
            Number(i.coordinates.longitude),
          ];
          const pointB = [Number(latitude), Number(longitude)];
          const calculatedDistance =
            !Number.isNaN(pointA[0]) &&
            !Number.isNaN(pointA[1]) &&
            !Number.isNaN(pointB[0]) &&
            !Number.isNaN(pointB[1]) &&
            turf.distance(pointB, pointA);
          const formatDistance = Number(calculatedDistance).toFixed(2);
          return {
            ...i,
            distance: formatDistance,
          };
        })
        .sort((a, b) => Number(a.distance) - Number(b.distance)),
    [latitude, longitude]
  );

  return (
    <>
      <WrapButton>
        <Button secondary align="left" onClick={goBack}>
          {"< voltar"}
        </Button>
      </WrapButton>
      <FetchIndividualsForMatch {...linkState}>
        {({ data, count }) => {
          const filteredTableData = filterByDistance(data);
          const pagination = {
            totalPages: Math.round(count / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };
          return (
            <Wrap>
              <Header.H4>Match Realizado!</Header.H4>
              <Text>
                {count} {matchGroup} próximas de {firstName}
              </Text>
              <Table
                data={filteredTableData}
                columns={ColumnsMatch(dispatch, setModal, !isVolunteerSelected)}
                sticky="end"
                pagination={pagination}
              />
            </Wrap>
          );
        }}
      </FetchIndividualsForMatch>
      <Popup
        isOpen={isOpen}
        match={state.match}
        setModal={setModal}
        CreateRelationship={CreateRelationship}
      />
    </>
  );
}
