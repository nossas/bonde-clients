import React from 'react';
import { Header, Text, Icon } from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Widget } from './FetchWidgets';
import Labels from './Labels';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 175px;
  background-color: #fff;
  padding: 25px 20px;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
  border-radius: 4px;

  margin: 15px 9px;
`;

type FlexProps = {
  spacing?: boolean
  margin?: string
  grow?: string
  align?: 'center' | 'flex-end'
}

const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: ${props => props.align};
  ${props => props.spacing && `justify-content: space-between;`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.grow && `flex-grow: ${props.grow};`}

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  ${Text} {
    margin: 0;
    font-size: 13px;
  }

  ${Text}.break {
    text-overflow: ellipsis;
    height: 36px;
    white-space: break-spaces;
    overflow: hidden;
    line-height: 1.50;
    word-break: break-all;
  }
`

Flex.defaultProps = {
  align: 'center'
}

type Props = {
  widget: Widget
}

const WidgetButton = ({ widget }: Props) => {
  const { storage, community } = useSession();
  const {
    id,
    kind,
    block: {
      mobilization: {
        id: mobilization_id,
        image,
        name
      }
    },
    actions: {
      aggregate: {
        count
      }
    }
  } = widget;

  const label = Labels.get(kind);
  let linkProps: any = {
    onClick: () => {
      if (process.env.REACT_APP_DOMAIN_ADMIN) {
        storage.setAsyncItem("community", community).then(() => {
          window.location.href = new URL(
            `/mobilizations/${mobilization_id}/widgets/${id}/${kind.replace('-phone', '')}`,
            process.env.REACT_APP_DOMAIN_ADMIN
          ).href;
        });
      }
    }
  };

  if (kind === 'pressure') {
    linkProps = { to: `/widgets/${id}/settings` };
  }

  const mobilizationLinkProps: any = {
    onClick: () => {
      if (process.env.REACT_APP_DOMAIN_ADMIN) {
        storage.setAsyncItem("community", community).then(() => {
          window.location.href = new URL(
            `/mobilizations/${mobilization_id}/edit`,
            process.env.REACT_APP_DOMAIN_ADMIN
          ).href;
        });
      }
    }
  }

  return (
    <Panel>
      <Flex spacing margin='0 0 12px'>
        <Text bold uppercase>{label.title}</Text>
        <Link {...linkProps}>
          <Icon name='Settings' size='small' />
        </Link>
      </Flex>
      <Link {...mobilizationLinkProps}>
        <Flex grow='1' margin='0 0 12px'>
          <img src={image || 'https://via.placeholder.com/40'} alt={name} />
          <Text className='break'>{name}</Text>
        </Flex>
      </Link>
      <Flex align='flex-end'>
        <Header.H2 style={{ marginRight: '5px' }}>{count}</Header.H2>
        <Text>{label.count}</Text>
      </Flex>
    </Panel>
  )
}

export default WidgetButton;