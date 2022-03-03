import React from 'react';
import { Row, Col, Header } from '@';
import styled from 'styled-components';

interface BlockProps {
  bgColor: string;
}

const Block = styled.div<BlockProps>`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  background-color: #c7c7c7;
  border: 1px solid black;
  padding: 10px 0;
`;

export const grid = () => (
  <>
    <Header.H3>Row 1</Header.H3>
    <Row>
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[6]}>
        <Block>
          <Header.H2>{`[6, 12, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
    <Header.H3>Row 2</Header.H3>
    <Row>
      <Col size={[6, 8, 10]}>
        <Block>
          <Header.H2>{`[6, 8, 10, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
    <Header.H3>Row 3</Header.H3>
    <Row>
      <Col size={[6, 3, 6]}>
        <Block>
          <Header.H2>{`[6, 3, 6, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[4, 6, 6]}>
        <Block>
          <Header.H2>{`[4, 6, 6, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[2, 3]} collapse="sm xs">
        <Block>
          <Header.H2>{`[2, 3, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
  </>
);

export const spacing = () => (
  <>
    <Header.H3>Spacing between</Header.H3>
    <Row spacing="between">
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[3, 3]}>
        <Block>
          <Header.H2>{`[3, 3, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
    <Header.H3>Spacing around</Header.H3>
    <Row spacing="around">
      <Col size={[3, 3]}>
        <Block>
          <Header.H2>{`[3, 3, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
  </>
);

export const flex = () => (
  <>
    <Header.H3>Flex start</Header.H3>
    <Row flex="start">
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[3, 3]}>
        <Block>
          <Header.H2>{`[3, 3, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
    <Header.H3>Flex end</Header.H3>
    <Row flex="end">
      <Col size={[3, 3]}>
        <Block>
          <Header.H2>{`[3, 3, 12, 12]`}</Header.H2>
        </Block>
      </Col>
      <Col size={[6, 6]}>
        <Block>
          <Header.H2>{`[6, 6, 12, 12]`}</Header.H2>
        </Block>
      </Col>
    </Row>
  </>
);

export default {
  title: 'Responsive',
};
