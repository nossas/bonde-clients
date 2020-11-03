import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Header, Icon } from 'bonde-components';
import { Fluid } from '../Styles';

const LinkStyled = styled(Link)`
  display: flex;
  text-transform: uppercase;
`

const DetailHeader = ({ hostedZone }: any) => {
  return (
    <Fluid>
      <LinkStyled to='/community/domains'>
        <Icon name='ArrowLeft' size='small' />
        <Header.H5>Detalhes do domínio</Header.H5>
      </LinkStyled>
      <Button disabled={!hostedZone.ns_ok} onClick={() => console.log('Adicionar domínio')}>Adicionar subdomínio</Button>
    </Fluid>
  );
}

export default DetailHeader;