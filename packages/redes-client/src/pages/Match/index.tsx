import React, { useCallback, useState, useEffect } from "react";
import * as turf from "@turf/turf";
import { Button, Header, Text } from "bonde-components";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

import { getMatchGroup } from "../../services/utils";
import { Columns, Groups, Individual } from "../../types";
import { Table, Popup } from "../../components";
import { useFilter } from "../../services/FilterProvider";

type Props = {
  groups: Groups;
  data: {
    FetchIndividualsForMatch: ({
      children,
    }: {
      children: (data: any) => React.ReactElement;
    }) => React.ReactElement | null;
    ColumnsMatch: (
      setIndividual: (individual: any) => void,
      setStatus: (status?: string) => void,
      isVolunteerSelected?: boolean
    ) => Array<Columns>;
  };
};

const WrapButton = styled.div`
  & > button {
    padding: 0;
  }
`;

export default function Match({
  data: { FetchIndividualsForMatch, ColumnsMatch },
  groups,
}: Props): React.ReactElement {
  const { state: linkState } = useLocation();
  const { goBack } = useHistory();
  const [state, dispatch] = useFilter();
  const [matchPair, setMatchPair] = useState<{
    recipient: Individual;
    volunteer: Individual;
  }>({ recipient: {} as Individual, volunteer: {} as Individual });
  const [status, setStatus] = useState<undefined | string>();

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
    setMatchPair((prevState) => ({
      ...prevState,
      [isVolunteerSelected ? "volunteer" : "recipient"]: linkState,
    }));
  }, [linkState, setMatchPair]);

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
    <div>
      <WrapButton>
        <Button secondary align="left" onClick={goBack}>
          {"< fazer match"}
        </Button>
      </WrapButton>
      <FetchIndividualsForMatch {...linkState}>
        {({ data, count }) => {
          const pagination = {
            totalPages: Math.round(count / state.rows),
            goToPage: (e: number) => dispatch({ type: "page", value: e }),
            setPageSize: (e: number) => dispatch({ type: "rows", value: e }),
            pageIndex: state.page,
            pageSize: state.rows,
          };
          const filteredTableData = filterByDistance(data);
          return (
            <>
              <Header.H4>Match Realizado!</Header.H4>
              <Text>
                {count} {matchGroup} próximas de {firstName}
              </Text>
              <Table
                data={filteredTableData}
                columns={ColumnsMatch(
                  setMatchPair,
                  setStatus,
                  !isVolunteerSelected
                )}
                sticky="end"
                pagination={pagination}
              />
            </>
          );
        }}
      </FetchIndividualsForMatch>
      <Popup status={status} match={matchPair} setStatus={setStatus} />
    </div>
  );
}
