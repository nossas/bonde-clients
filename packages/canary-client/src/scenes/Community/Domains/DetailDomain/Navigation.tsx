import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Header, Icon } from 'bonde-components';

const LinkStyled = styled(Link)`
  display: flex;
  text-transform: uppercase;
`

const DetailHeader = ({ hostedZone }: any) => {
  return (
    <Row>
      <Col xs={12} sm={8} md={9} lg={10}>
        <LinkStyled to='/community/domains'>
          <Icon name='ArrowLeft' size='small' />
          <Header.H5>Detalhes do domínio</Header.H5>
        </LinkStyled>
      </Col>
      <Col xs={12} sm={4} md={3} lg={2}>
        <Button disabled={!hostedZone.ns_ok} onClick={() => console.log('Adicionar domínio')}>Adicionar subdomínio</Button>
      </Col>
    </Row>
  );
}

export default DetailHeader;