import React, { useState } from "react";
import { Tab, Header, Heading, DarkMode } from "bonde-components";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSession } from 'bonde-core-tools';
import Container, { NavigationArgs } from "../Container";
import { Widget } from "../FetchWidgets";
import Labels from "../Labels";
import Navigation from './Navigation';
import Adjusts from './Adjusts';
import Autofire from "./Autofire";
import ConfigurePressureTargets from "./ConfigurePressureTargets";
import ConfigurePostAction from "./ConfigurePostAction";
import Sending from "./Sending";
import Performance from "./Performance";

type Props = {
  widgets: Widget[];
};

const Settings: React.FC<Props> = ({ widgets }) => {
  const [widgetsCached, setWidgetsCached] = useState(widgets);
  const match = useRouteMatch();
  const { t } = useTranslation('widgetActions');
  const { community, storage } = useSession();

  const { widgetId }: any = useParams();
  const widget = widgetsCached.filter((w: Widget) => w.id === Number(widgetId))[0];

  if (!widget) return <Header.H2>{t('settings.empty')}</Header.H2>;

  const label = Labels.get(widget.kind);

  const updateCache = (updated: Widget) => {

    setWidgetsCached(widgets.map((w: Widget) => w.id === updated.id ? { ...w, ...updated } : w));
  }

  return (
    // - Nome da mobilização
    // - Editar/Configurações
    <Container
      title={widget.block.mobilization.name}
      navigation={({ push, is }: NavigationArgs) => (
        <DarkMode>
          <Tab
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                storage.setAsyncItem("community", community).then(() => {
                  window.location.href = new URL(
                    `/mobilizations/${widget.block.mobilization.id}/edit`,
                    process.env.REACT_APP_DOMAIN_ADMIN
                  ).href;
                });
              }
            }}
          >
            {t('settings.navigation.edit')}
          </Tab>

          <Tab
            active={is(/\/widgets\/\d+\/settings\/*/)}
            onClick={() => push(`settings`)}
          >
            {t('settings.navigation.settings')}
          </Tab>
        </DarkMode>
      )}
    >
      {/* Corpo */}
      <Heading
        as="h3"
        size="xl"
        mt={2.4}
        mb={2}
      >
        {t('settings.header', { label: label.title.toLowerCase() })}
      </Heading>

      <Navigation />

      <Switch>
        <Route exact path={`${match.path}`}>
          <Performance widget={widget} />
        </Route>
        <Route exact path={`${match.path}/targets`}>
          {widget.kind === "pressure" && (
            <ConfigurePressureTargets
              widget={widget}
              updateCache={updateCache}
            />
          )}
        </Route>
        <Route exact path={`${match.path}/sending`}>
          <Sending widget={widget} updateCache={updateCache} />
        </Route>
        <Route exact path={`${match.path}/adjusts`}>
          <Adjusts widget={widget} updateCache={updateCache} />
        </Route>
        <Route exact path={`${match.path}/autofire`}>
          <Autofire widget={widget} updateCache={updateCache} />
        </Route>
        <Route exact path={`${match.path}/finish`}>
          <ConfigurePostAction widget={widget} updateCache={updateCache} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Settings;
