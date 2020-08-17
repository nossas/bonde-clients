import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'bonde-components';
import Content from '../../components/Content';
import CommunitiesGadget from './CommunitiesGadget';
import MobilizationsGadget from './MobilizationsGadget';

type StylesProps = {
  margin?: string
  padding?: string
}

const Styles = styled.div<StylesProps>`
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.padding && `padding: ${props.padding};`}
`;

const HomePage = () => (
  <Content>
    <Row spacing='between'>
      <Col size={[6, 6]}>
        <Styles margin='0 20px 0 0'>
          <CommunitiesGadget />
        </Styles>
      </Col>
      <Col size={[6, 6]}>
        <Styles margin='0 0 0 20px'>
          <MobilizationsGadget />
        </Styles>
      </Col>
    </Row>
  </Content>
);

export default HomePage;
