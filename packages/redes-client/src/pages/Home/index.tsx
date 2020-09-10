import React from "react";
import { Header, Shortcut, Icon, Empty } from "bonde-components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WeeklyStats } from "../../components";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { useFilter } from "../../services/FilterProvider";
import { WeeklyStatsData } from "../../types";

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
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
  const [, dispatch] = useFilter();
  const { groups } = useCommunityExtra();
  const volunteerGroup = groups?.find((group) => !!group.isVolunteer);
  const individualGroup = groups?.find((group) => !group.isVolunteer);

  return community ? (
    <>
      <Header.H5>ATALHOS</Header.H5>
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
            icon={<Icon name="User" size="small" />}
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
            icon={<Icon name="Favorite" size="small" />}
            text="Fazer match de Voluntária"
          />
        </Link>
        <Link to="/matchs" style={{ textDecoration: "none" }}>
          <Shortcut
            icon={<Icon name="Open" size="small" />}
            text="Ver meus matchs"
          />
        </Link>
      </Grid>
      <Header.H5>DADOS DA SEMANA</Header.H5>
      <Grid>
        <WeeklyStats
          FetchWeeklyStats={FetchWeeklyStats}
          FilterOptions={FilterOptions}
          volunteerGroup={volunteerGroup}
          individualGroup={individualGroup}
          dispatch={dispatch}
        />
      </Grid>
      {/* <Header.H5>DADOS GERAIS</Header.H5>
      <GeneralStats FetchGeneralStats={FetchGeneralStats} /> */}
    </>
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

Home.displayName = "Home";
