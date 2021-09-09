import React from 'react';
import { Header, Tab, Stack, Grid, GridItem } from "bonde-components"
import { useTranslation } from 'react-i18next';
import SearchList from '../SearchList';
import WidgetButton from '../WidgetButton';
import { Widget, WidgetLoading } from '../FetchWidgets';
import Container, { NavigationArgs } from '../Container';
import Shortcuts from './Shortcuts';

type Props = {
  community: {
    id: number
  }
  storage: any
  widgets: Widget[]
  loading: boolean
}

const Home = ({ community, storage, widgets, loading }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  return (
    <Container
      title={t("titles.home")}
      navigation={({ push, is }: NavigationArgs) => (
        <>
          <Tab active={is(/\/widgets\/*/)} onClick={() => push('/')}>
            {t("navigation.home")}
          </Tab>
        </>
      )}
    >
      <Stack direction="column" spacing={4}>
        <section style={{ marginBottom: '15px' }}>
          <Header.H5 uppercase>{t('home.shortcuts.title')}</Header.H5>
          <Shortcuts community={community} storage={storage} />
        </section>
        <SearchList
          header={<Header.H5 uppercase>{t('home.actions')}</Header.H5>}
          data={widgets}
          empty={<Header.H4 style={{ textAlign: 'center' }}>{t('home.searchEmpty')}</Header.H4>}
          loading={loading}
          renderLoading={<WidgetLoading />}
        >
          {({ result }: any) => (
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", null, "repeat(4, 1fr)", null, "repeat(6, 1fr)"]} gap={4} rowGap={4}>
              {result.map((w: Widget, index: number) => (
                <GridItem key={`widget-button-${index}`}>
                  <WidgetButton key={w.id} widget={w} />
                </GridItem>
              ))}
            </Grid>
          )}
        </SearchList>
      </Stack>
    </Container>
  );
};

export default Home;
