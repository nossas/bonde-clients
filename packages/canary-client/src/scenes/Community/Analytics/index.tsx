import React from 'react';
import { useSession } from 'bonde-core-tools';
import { Header, Icon, Text } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import TotalActivists from './TotalActivists';
import LastActivists from './LastActivists';
import LastPressures from './LastPressures';
import LastFormEntries from './LastFormEntries';
import Panel from '../Panel';


const ReportButton = styled.button`
  margin-right: 18px;
  border: none;
  outline: none;

  &:active, &:focus, &:hover {
    border: none;
    outline: none;
  }

  &:hover {
    h5 {
      color: #a4a4a4 !important;
    }

    .fill {
      path {
        fill: #a4a4a4 !important;
      }
    }
  }

  ${Panel} {
    display: flex;
    flex-direction: row;
    align-items: center;

    text-align: left;

    svg {
      margin-right: 8px;
    }
  }
`

type ReportProps = {
  label: string
}

const Report = ({ label }: ReportProps) => (
  <ReportButton type='button'>
    <Panel style={{ maxWidth: '205px' }}>
      <Icon name='Settings' />
      <Header.H5 uppercase color='#000'>{label}</Header.H5>
    </Panel>
  </ReportButton>
)

type StylesProps = {
  full?: boolean
}

const Styles = styled.div<StylesProps>`
  ${Panel} {
    min-height: ${props => props.full ? '254px' : '97px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const AnalyticsCard = ({ label, children, full }: any) => (
  <Styles full={full}>
    <Header.H5 style={{ fontWeight: 600, marginBottom: '12px' }} uppercase>{label}</Header.H5>
    <Panel>
      {children}
    </Panel>
  </Styles>
)

const Number = ({ query: Query }: any) => {
  const { community } = useSession();

  return (
    <Query communityId={community?.id || 0}>
      {({ total }: any) => (
        <Header.H2>{total}</Header.H2>
      )}
    </Query>
  );
}

const Analytics = () => (
  <Container fluid style={{ width: "100%", padding: "0" }}>
    <Row>
      <Col xs={12}>
        <Header.H5 style={{ fontWeight: 600, marginBottom: '12px' }} uppercase>Baixar relatórios</Header.H5>
      </Col>
      <Col xs={12}>
        <Report label='Relatórios de doações' />
        <Report label='Doações recorrentes' />
        <Report label='Relatórios de ações' />
        <Report label='Relatórios de ativistas' />
      </Col>
    </Row>
    <Row>
      <Col xs={5}>
        <Row>
          <Col xs={6}>
            <AnalyticsCard label='Ativistas'>
              <Number query={TotalActivists} />
            </AnalyticsCard>
          </Col>
          <Col xs={6}>
            <AnalyticsCard label='Ativistas recentes'>
              <Number query={LastActivists} />
            </AnalyticsCard>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <AnalyticsCard label='Pressões recentes'>
              <Number query={LastPressures} />
            </AnalyticsCard>
          </Col>
          <Col xs={6}>
            <AnalyticsCard label='Inscrições recentes'>
              <Number query={LastFormEntries} />
            </AnalyticsCard>
          </Col>
        </Row>
      </Col>
      <Col xs={7}>
        <Row>
          <Col xs={4}>
            <AnalyticsCard full label='Doações únicas (R$)'>
              <Header.H2>1.120,00</Header.H2>
              <Text>Nos últimos 30 dias</Text>
            </AnalyticsCard>
          </Col>
          <Col xs={4}>
            <AnalyticsCard full label='Doações recorrentes (R$)'>
              <Header.H2>2.980,00</Header.H2>
              <Text>Nos últimos 30 dias</Text>
            </AnalyticsCard>
          </Col>
          <Col xs={4}>
            <AnalyticsCard full label='Total arrecadado (R$)'>
              <Header.H2>10.590,00</Header.H2>
              <Header.H3 style={{ color: '#a4a4a4' }}>
                <Icon name='Sync' size='small' /> 140,00
              </Header.H3>
              <Text>(Confirmadas / Aguardando pagamento)</Text>
            </AnalyticsCard>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Analytics;