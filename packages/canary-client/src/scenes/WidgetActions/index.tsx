import React from "react";
import { Route, Switch } from "react-router-dom";
import { Empty } from "bonde-components";
import { useSession } from "bonde-core-tools";
import FetchWidgets, { RenderProps, WidgetLoading } from './FetchWidgets';
// Subroutes
import Home from './Home';
import Settings from './Settings';

type Props = {
  match: any;
};

const WidgetsActionsPage = ({ match }: Props): React.ReactElement => {
  const { community, storage } = useSession();

  return community ? (
    <FetchWidgets communityId={community?.id || 0}>
      {({ widgets, loading, refetch }: RenderProps) => (
        <Switch>
          <Route exact path={`${match.path}`}>
            <Home
              widgets={widgets}
              loading={loading}
              storage={storage}
              community={community}
            />
          </Route>
          <Route path={`${match.path}/:widgetId/settings`}>
            {loading ? <WidgetLoading /> : (
              <Settings
                widgets={widgets}
                refetch={refetch}
              />
            )}
          </Route>
        </Switch>
      )}
    </FetchWidgets>
  ) : (
    <Empty message="Nada por aqui..." />
  );
};

// TODO:
// - Translate

export default WidgetsActionsPage;
