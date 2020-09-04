import React from "react";
import { Question, Header } from "bonde-components";
import { useSession } from "bonde-core-tools";
import styled from "styled-components";

const Grid = styled.div`
  border-color: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 450px));
  grid-template-rows: repeat(3, minmax(auto, 300px));
  grid-gap: 20px;
  & iframe > html {
    display: none;
  }
`;

const BlocksGrid = styled.div`
  border-color: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 200px));
  grid-template-rows: repeat(2, minmax(auto, 150px));
  grid-gap: 20px;
`;

export default function Home(): React.ReactElement {
  const { community } = useSession();
  return community?.id === 40 ? (
    <>
      <Header.H5>DADOS GERAIS</Header.H5>
      <Grid>
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1187 }, params: {} }} // msr / dia
          questionOptions={"#bordered=false&titled=true"}
        />
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1020 }, params: {} }} // voluntarias / dia
          questionOptions={"#bordered=false&titled=true"}
        />
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1140 }, params: {} }} // match / dia
          questionOptions={"#bordered=false&titled=true"}
        />
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1186 }, params: {} }} // msr serv. pub.
          questionOptions={"#bordered=false&titled=true"}
        />
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1188 }, params: {} }} // total dos acolhimentos
          questionOptions={"#bordered=false&titled=true"}
        />
        <BlocksGrid>
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1190 }, params: {} }} // enc. realizados
            questionOptions={"#bordered=false&titled=false"}
          />
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1191 }, params: {} }} // atendimentos iniciados
            questionOptions={"#bordered=false&titled=false"}
          />
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1192 }, params: {} }} // atendimentos concluidos
            questionOptions={"#bordered=false&titled=false"}
          />
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1193 }, params: {} }} // atendimentos interrompidos
            questionOptions={"#bordered=false&titled=false"}
          />
        </BlocksGrid>
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1151 }, params: {} }}
          questionOptions={"#bordered=false&titled=true"}
        />
        <BlocksGrid>
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1194 }, params: {} }} // aprovadas e validadas
            questionOptions={"#bordered=false&titled=true"}
          />
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1196 }, params: {} }} // rep. estudo de caso
            questionOptions={"#bordered=false&titled=true"}
          />
          <Question
            siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
            secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
            config={{ resource: { question: 1195 }, params: {} }} // rep. diretrizes
            questionOptions={"#bordered=false&titled=true"}
          />
        </BlocksGrid>
        <Question
          siteUrl={process.env.REACT_APP_METABASE_SITE_URL || ""}
          secretKey={process.env.REACT_APP_METABASE_SECRET_KEY || ""}
          config={{ resource: { question: 1189 }, params: {} }}
          questionOptions={"#bordered=false&titled=true"}
        />
      </Grid>
    </>
  ) : (
    <Header.H4>
      Sua rede de solidariedade ainda não possui acesso ao dashboard.
    </Header.H4>
  );
}

Home.displayName = "Home";
