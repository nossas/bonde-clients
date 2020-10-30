import React, { useState, useEffect, useCallback } from "react";
import { css } from "styled-components/macro";
import { Button, Header, Text, Empty } from "bonde-components";
import { useLocation, useHistory } from "react-router-dom";
import * as turf from "@turf/turf";

import { Table, Popup } from "../components";
import { useSelectedGroup } from "../hooks";
import { useFilter } from "../services/FilterProvider";
import { getMatchGroup } from "../services/utils";
import { Columns, Groups, Individual } from "../types";

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

export default function Match({
  data: { FetchIndividualsForMatch, ColumnsMatch, CreateRelationship },
  groups,
}: Props): React.ReactElement {
  const [isOpen, setModal] = useState<boolean>(false);
  const [, isVolunteerSelected] = useSelectedGroup();
  const [state, dispatch] = useFilter();
  const { state: linkState } = useLocation();
  const { goBack } = useHistory();

  const selectedIndividual: Individual = (linkState as unknown) as Individual;

  const matchGroup = getMatchGroup(groups, selectedIndividual);

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
          const pointB = [
            Number(selectedIndividual.coordinates.latitude),
            Number(selectedIndividual.coordinates.longitude),
          ];
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
    [
      selectedIndividual.coordinates.latitude,
      selectedIndividual.coordinates.longitude,
    ]
  );

  return (
    <>
      <div
        css={css`
          & > button {
            padding: 0;
          }
        `}
      >
        <Button secondary align="left" onClick={goBack}>
          {"< voltar"}
        </Button>
      </div>
      <FetchIndividualsForMatch {...selectedIndividual}>
        {({ data, count }) => {
          const filteredTableData = filterByDistance(data);
          return count < 1 ? (
            <div
              css={css`
                height: 100%;
                & > div {
                  height: 100%;
                }
              `}
            >
              <Empty message="Nada por aqui..." />
            </div>
          ) : (
            <div
              css={css`
                & > ${Header.H4} {
                  margin: 15px 0 10px;
                }
                & > ${Text} {
                  margin-top: 0;
                }
              `}
            >
              <Header.H4>Match Realizado!</Header.H4>
              <Text>
                {count} {matchGroup} próximas de {selectedIndividual.firstName}
              </Text>
              <Table
                data={filteredTableData}
                columns={ColumnsMatch(dispatch, setModal, !isVolunteerSelected)}
                sticky="end"
                totalResults={count}
              />
            </div>
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
