import React from "react";
import { useSession } from "bonde-core-tools";
import CommunityWidgets from "./CommunityWidgets";

type Widget = {
  id: number
  kind: string
}

type CommunityWidgetsData = {
  mobilizations: Array<{
    id: number
    name: string
    blocks: Array<{
      id: number
      widgets: Array<Widget>
    }>
  }>
}

const renderWidgets = (widgets: Widget[]) =>
  widgets.map((widget) => <li key={widget.id}>{widget.kind}</li>);

const Home = (): React.ReactElement => {
  const { community } = useSession();
  return (
    <CommunityWidgets communityId={community?.id || 0}>
      {({ mobilizations }: CommunityWidgetsData) => {
        return mobilizations.map((mobilization) => {
          return (
            <div key={mobilization.id}>
              <p>{mobilization.name}</p>
              <ul>
                {mobilization.blocks.map((block) => {
                  return block.widgets.length > 0
                    ? renderWidgets(block.widgets)
                    : null;
                })}
              </ul>
            </div>
          );
        });
      }}
    </CommunityWidgets>
  );
};

export default Home;
