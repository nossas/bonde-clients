import React, { useState } from "react";
import { Tab, Header } from "bonde-components";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import Container, { NavigationArgs } from "../Container";
import { Widget } from "../FetchWidgets";
import Labels from "../Labels";
import Autofire from "./Autofire";
import ConfigurePressureTargets from "./ConfigurePressureTargets";
import ConfigurePostAction from "./ConfigurePostAction";
import Navigation from './Navigation';

type Props = {
  widgets: Widget[];
};

const Settings = ({ widgets }: Props) => {
  const [widgetsCached, setWidgetsCached] = useState(widgets);
  const match = useRouteMatch();

  const { widgetId }: any = useParams();
  const widget = widgetsCached.filter((w: Widget) => w.id === Number(widgetId))[0];

  if (!widget) return <Header.H2>Nenhum widget encontrado</Header.H2>;

  const label = Labels.get(widget.kind);

  const updateCache = (updated: Widget) => {
    setWidgetsCached(widgets.map((w: Widget) => w.id === updated.id ? updated : w));
  }

  return (
    <Container
      title={widget.block.mobilization.name}
      navigation={({ push, is }: NavigationArgs) => (
        <>
          <Tab onClick={() => console.log("redirect to edit")}>Editar</Tab>
          <Tab
            active={is(/\/widgets\/\d+\/settings\/*/)}
            onClick={() => push(`settings`)}
          >
            Configurações
          </Tab>
        </>
      )}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12}>
          <Header.H3>{`Configurar ${label.title.toLowerCase()}`}</Header.H3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Navigation />
        </Col>
        <Col xs={12}>
          <Switch>
            <Route exact path={`${match.path}`}>
              {widget.kind === "pressure" && (
                <ConfigurePressureTargets
                  widget={widget}
                  updateCache={updateCache}
                />
              )}
            </Route>
            <Route exact path={`${match.path}/adjusts`}>
              <Header.H4>Ajustes</Header.H4>
            </Route>
            <Route exact path={`${match.path}/autofire`}>
              <Autofire widget={widget} />
            </Route>
            <Route exact path={`${match.path}/finish`}>
              <ConfigurePostAction widget={widget} />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
