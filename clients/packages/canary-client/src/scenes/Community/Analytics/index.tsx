import React, { useContext } from 'react';
import { Context as SessionContext } from 'bonde-core-tools';
import {
  Header,
  Text,
  Message
} from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import TotalActivists from './TotalActivists';
import LastActivists from './LastActivists';
import LastPressures from './LastPressures';
import LastFormEntries from './LastFormEntries';
import SubscriptionDonationsLastMonth from './SubscriptionDonationsLastMonth';
import UniqueDonationsLastMonth from './UniqueDonationsLastMonth';
import TotalDonations from './TotalDonations';
import DownloadCSV from './DownloadCSV';
import AnalyticsCard, { Number } from './AnalyticsCard';

type PositionProps = {
  direction?: 'right' | 'left'
}

const Position = styled.div<PositionProps>`
  ${Message} {
    ${props => props.direction === 'right' ? 'right: -20px' : 'left: -20px'};
  }Heading
`
Position.defaultProps = {
  direction: 'left'
}

const Analytics: React.FC = () => {
  const { community } = useContext(SessionContext);
  
  return (
    <Container fluid style={{ width: "100%", padding: "0" }}>
      <Row>
        <Col xs={12}>
          <Header.H5 style={{ fontWeight: 800, marginBottom: '12px', marginTop: '7px' }} uppercase>Baixar relatórios</Header.H5>
        </Col>

        <Col xs={12} style={{ display: 'flex', alignItems: 'center'}}>
          <DownloadCSV
            label='Relatórios de doações'
            icon='Ticket'
            path='donation_reports'
          />
          <DownloadCSV
            label='Doadores recorrentes'
            icon='TicketRecurring'
            path='download_subscriptions'
          />

          <DownloadCSV
            label='Relatórios de ações'
            icon='BoltUnfilled'
            path='activist_actions'
          />

          <DownloadCSV
            label='Relatórios de ativistas'
            icon='Network'
            path='activists'
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col xs={5}>
          <Row>
            <Col xs={6}>
              <AnalyticsCard
                label='Ativistas'
                tooltip='Total de pessoas que já agiram em alguma página publicada pela sua comunidade.'
              >
                <TotalActivists communityId={community.id}>
                  {({ total }: any) => <Number total={total} />}
                </TotalActivists>
              </AnalyticsCard>
            </Col>
            <Col xs={6} style={{ paddingLeft: '4px' }}>
              <AnalyticsCard
                label='Ativistas recentes'
                tooltip='Total de pessoas que agiram na sua comunidade nos últimos 90 dias.'
              >
                <LastActivists communityId={community.id}>
                  {({ total }: any) => <Number total={total} />}
                </LastActivists>
              </AnalyticsCard>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <AnalyticsCard
                label='Pressões recentes'
                tooltip='Total de ações de pressão feitas em páginas da sua comunidade nos últimos 90 dias.'
              >
                <LastPressures communityId={community.id}>
                  {({ total }: any) => <Number total={total} />}
                </LastPressures>
              </AnalyticsCard>
            </Col>
            <Col xs={6} style={{ paddingLeft: '4px' }}>
              <AnalyticsCard
                label='Inscrições recentes'
                tooltip='Total de ações de formulários publicados pela sua comunidade nos últimos 90 dias.'
              >
                <LastFormEntries communityId={community.id}>
                  {({ total }: any) => <Number total={total} />}
                </LastFormEntries>
              </AnalyticsCard>
            </Col>
          </Row>
        </Col>
        <Col xs={7}>
          <Row>
            <Col xs={4} style={{ paddingLeft: '4px' }}>
              <AnalyticsCard
                full
                label='Doações únicas (R$)'
                tooltip='Valor total das doações únicas confirmadas na comunidade nos últimos 30 dias.'
              >
                <SubscriptionDonationsLastMonth communityId={community.id}>
                  {({ total }: any) => (
                    <Number total={total} format='money'>
                      <Text>Nos últimos 30 dias</Text>
                    </Number>
                  )}
                </SubscriptionDonationsLastMonth>
              </AnalyticsCard>
            </Col>
            <Col xs={4} style={{ paddingLeft: '4px' }}>
              <AnalyticsCard
                full
                label='Doações recorrentes (R$)'
                tooltip='Valor total das doações recorrentes confirmadas na comunidade nos últimos 30 dias.'
              >
                <UniqueDonationsLastMonth communityId={community.id}>
                  {({ total }: any) => (
                    <Number total={total} format='money'>
                      <Text>Nos últimos 30 dias</Text>
                    </Number>
                  )}
                </UniqueDonationsLastMonth>
              </AnalyticsCard>
            </Col>
            <Col xs={4} style={{ paddingLeft: '4px' }}>
              <AnalyticsCard
                full
                label='Total arrecadado (R$)'
                tooltip='Valor total de doações únicas e recorrentes arrecadadas pela comunidade até agora.'
              >
                <TotalDonations communityId={community.id}>
                  {({ total, waiting }: any) => (
                    <Number total={total} waiting={waiting} format='money'>
                      <Text>(Confirmadas / Aguardando pagamento)</Text>
                    </Number>
                  )}
                </TotalDonations>
              </AnalyticsCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Analytics;