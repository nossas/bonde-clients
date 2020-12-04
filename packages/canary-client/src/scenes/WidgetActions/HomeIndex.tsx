import React from 'react';
import styled from 'styled-components';
import { Header, Icon, Text } from 'bonde-components';
import SearchList from './SearchList';
import WidgetButton from './WidgetButton';
import FetchWidgets, { Widget } from './FetchWidgets';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6,1fr);
  margin: -15px -9px;
`

const Button = styled.button`
  background-color: #fff;
  margin: 15px 9px;
  height: 90px;
  padding: 25px 20px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${Text} {
    font-size: 13px;
    line-height: 17px;
    margin-left: 10px;
  }
`

type Props = {
  community: any
}

const HomeIndex = ({ community }: Props) => {
  return (
    <>
      <div style={{ marginBottom: '35px' }}>
        <Header.H5 uppercase style={{ marginBottom: '25px' }}>Atalhos</Header.H5>
        <Grid>
          <Button>
            <Icon name='Settings' />
            <Text uppercase bold>Criar página</Text>
          </Button>
          <Button>
            <Icon name='Settings' />
            <Text uppercase bold>Ver mobilizações</Text>
          </Button>
          <Button>
            <Icon name='Settings' />
            <Text uppercase bold>Ver dados e relatórios</Text>
          </Button>
          <Button>
            <Icon name='Settings' />
            <Text uppercase bold>Configurar domínio</Text>
          </Button>
        </Grid>
      </div>
      <FetchWidgets communityId={community.id}>
        {({ widgets }: { widgets: Widget[] }) => (
          <SearchList
            header={<Header.H5 uppercase>Ações</Header.H5>}
            data={widgets}
          >
            {({ result }: any) => result.map((w: Widget) => (
              <WidgetButton key={w.id} widget={w} />
            ))}
          </SearchList>
        )}
      </FetchWidgets>
    </>
  );
}

export default HomeIndex;