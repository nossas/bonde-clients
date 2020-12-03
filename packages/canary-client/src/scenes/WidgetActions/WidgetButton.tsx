import React from 'react';
import { Text, Icon } from 'bonde-components';
import styled from 'styled-components';

const Panel = styled.div`
  width: 205px;
  height: 175px;
  background-color: #fff;
  padding: 25px 20px;
  margin: 0 18px 30px 0;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
  border-radius: 4px;
`;

type FlexProps = {
  spacing?: boolean
  margin?: string
}

const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  ${props => props.spacing && `justify-content: space-between;`}
  ${props => props.margin && `margin: ${props.margin};`}

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  ${Text} {
    margin: 0;
    font-size: 13px;
  }
`

type Props = {
  widget: any
}

const WidgetButton = ({ widget }: Props) => {
  const {
    kind,
    block: {
      mobilization: {
        image,
        name
      }
    }
  } = widget;

  const kindLabel = ({
    pressure: 'Pressão',
    form: 'Formulário',
    donation: 'Doação',
    'pressure-phone': 'Telefone'
  } as any)[kind]

  return (
    <Panel>
      <Flex spacing margin='0 0 8px'>
        <Text bold uppercase>{kindLabel}</Text>
        <Icon name='Settings' size='small' />
      </Flex>
      <Flex>
        <img src={image || 'https://via.placeholder.com/40'} alt={name} />
        <Text>{name}</Text>
      </Flex>
    </Panel>
  )
}

export default WidgetButton;