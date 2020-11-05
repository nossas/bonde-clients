import React from "react";
import { Header, Shortcut, Icon, Empty } from "bonde-components";
import { useSession } from "bonde-core-tools";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WeeklyStats } from "../components";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import { useFilterDispatch } from "../services/FilterProvider";
import { WeeklyStatsData } from "../types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
  grid-gap: 20px;
  justify-content: start;
  overflow-x: auto;
  padding-bottom: 15px;
  & > a {
    text-decoration: none;
    display: flex;
  }
`;

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const H5 = styled(Header.H5)`
  font-weight: 600;
  margin-bottom: 15px;
`;

type Props = {
  community?: {
    id: number;
  };
  data: {
    FetchWeeklyStats: ({
      children,
    }: {
      children: (
        data: WeeklyStatsData & { communityId: number }
      ) => React.ReactElement;
    }) => React.ReactElement | null;
    // FetchGeneralStats: ({
    //   children,
    // }: {
    //   children: (data: GeneralStatsData) => React.ReactElement;
    // }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
  };
};

export default function Home({
  data: { FetchWeeklyStats, FilterOptions },
  community,
}: Props): React.ReactElement {
  const dispatch = useFilterDispatch();
  const { groups } = useCommunityExtra();
  const { user } = useSession();
  const volunteerGroup = groups?.find((group) => !!group.isVolunteer);
  const individualGroup = groups?.find((group) => !group.isVolunteer);

  return community ? (
    <>
      <H5 style={{ marginTop: 0 }}>ATALHOS</H5>
      <Grid>
        <Link
          style={{ textDecoration: "none" }}
          to="/pessoas"
          onClick={() =>
            dispatch({
              type: "group",
              value: {
                label: individualGroup?.name || "",
                value: individualGroup?.id || 0,
              },
            })
          }
        >
          <Shortcut
            text="Fazer match de MSR"
            icon={<Icon name="User" size="default" />}
          />
        </Link>
        <Link
          to="/pessoas"
          style={{ textDecoration: "none" }}
          onClick={() =>
            dispatch({
              type: "group",
              value: {
                label: volunteerGroup?.name || "",
                value: volunteerGroup?.id || 0,
              },
            })
          }
        >
          <Shortcut
            icon={<Icon name="Heart" size="default" />}
            text="Fazer match de Voluntária"
          />
        </Link>
        <Link
          to="/matches"
          style={{ textDecoration: "none" }}
          onClick={() =>
            dispatch({
              type: "relationships",
              value: {
                agent: {
                  label: `${user.firstName} ${user.lastName || ""}`,
                  value: user.id,
                },
              },
            })
          }
        >
          <Shortcut
            icon={<Icon name="Open" size="default" />}
            text="Ver meus matchs"
          />
        </Link>
      </Grid>
      <H5>DADOS DA SEMANA</H5>
      <Grid>
        <WeeklyStats
          FetchWeeklyStats={FetchWeeklyStats}
          FilterOptions={FilterOptions}
          volunteerGroup={volunteerGroup}
          individualGroup={individualGroup}
          dispatch={dispatch}
        />
      </Grid>
      {/* <H5>DADOS GERAIS</H5>
      <GeneralStats FetchGeneralStats={FetchGeneralStats} /> */}
    </>
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

Home.displayName = "Home";
