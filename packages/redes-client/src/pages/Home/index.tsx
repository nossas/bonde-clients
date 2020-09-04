import React from "react";
import { Header, Shortcut, Icon } from "bonde-components";
import { useSession } from "bonde-core-tools";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { useFilter } from "../../services/FilterProvider";

// const DashboardGrid = styled.div`
//   border-color: 1px solid #000;
//   display: grid;
//   grid-template-columns: repeat(3, minmax(auto, 450px));
//   grid-template-rows: repeat(3, minmax(auto, 300px));
//   grid-gap: 20px;
//   & iframe > html {
//     display: none;
//   }
// `;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  justify-content: start;
`;

// const BlocksGrid = styled.div`
//   border-color: 1px solid #000;
//   display: grid;
//   grid-template-columns: repeat(2, minmax(auto, 200px));
//   grid-template-rows: repeat(2, minmax(auto, 150px));
//   grid-gap: 20px;
// `;

export default function Home(): React.ReactElement {
  const { community } = useSession();
  const [, dispatch] = useFilter();
  const { groups } = useCommunityExtra();
  const volunteerGroup = groups?.find((group) => !!group.isVolunteer);
  const individualGroup = groups?.find((group) => !group.isVolunteer);
  return community?.id === 40 ? (
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
      {/* <Header.H5>DADOS DA SEMANA</Header.H5>
      <Grid>
        <Question
          config={{ resource: { question: 1197 }, params: {} }} // Novas msrs inscritas
        />
        <Question
          config={{ resource: { question: 1198 }, params: {} }} // enc. real.
        />
        <Question
          config={{ resource: { question: 1199 }, params: {} }} // enc. serv. pub.
        />
        <Question
          config={{ resource: { question: 1200 }, params: {} }} // atd. in.
        />
        <Question
          config={{ resource: { question: 1201 }, params: {} }} // novas vol. aprov.
        />
        <Question
          config={{ resource: { question: 1202 }, params: {} }} // novas vol. disp.
        />
      </Grid> */}
      <Header.H5>DADOS GERAIS</Header.H5>
      {/* <DashboardGrid>
        <Question
          config={{ resource: { question: 1187 }, params: {} }} // msr / dia
          title
        />
        <Question
          config={{ resource: { question: 1020 }, params: {} }} // voluntarias / dia
          title
        />
        <Question
          config={{ resource: { question: 1140 }, params: {} }} // match / dia
          title
        />
        <Question
          config={{ resource: { question: 1186 }, params: {} }} // msr serv. pub.
          title
        />
        <Question
          config={{ resource: { question: 1188 }, params: {} }} // total dos acolhimentos
          title
        />
        <BlocksGrid>
          <Question
            config={{ resource: { question: 1190 }, params: {} }} // enc. realizados
          />
          <Question
            config={{ resource: { question: 1191 }, params: {} }} // atendimentos iniciados
          />
          <Question
            config={{ resource: { question: 1192 }, params: {} }} // atendimentos concluidos
          />
          <Question
            config={{ resource: { question: 1193 }, params: {} }} // atendimentos interrompidos
          />
        </BlocksGrid>
        <Question config={{ resource: { question: 1151 }, params: {} }} title />
        <BlocksGrid>
          <Question
            config={{ resource: { question: 1194 }, params: {} }} // aprovadas e validadas
            title
          />
          <Question
            config={{ resource: { question: 1196 }, params: {} }} // rep. estudo de caso
            title
          />
          <Question
            config={{ resource: { question: 1195 }, params: {} }} // rep. diretrizes
            title
          />
        </BlocksGrid>
        <Question config={{ resource: { question: 1189 }, params: {} }} title />
      </DashboardGrid> */}
    </>
  ) : (
    <Header.H4>
      Sua rede de solidariedade ainda não possui acesso ao dashboard.
    </Header.H4>
  );
}

Home.displayName = "Home";
