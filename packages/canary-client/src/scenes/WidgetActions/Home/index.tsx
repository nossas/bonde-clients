import React from "react";
import { Header } from "bonde-components"
import Shortcuts from "./Shortcuts";
import SearchList from '../SearchList';
import WidgetButton from '../WidgetButton';
import FetchWidgets, { Widget } from '../FetchWidgets';

type Props = {
  community: {
    id: number
  }
  storage: any
}

const Home = ({ community, storage }: Props): React.ReactElement => {
  return (
    <section>
      <Header.H5>ATALHOS</Header.H5>
      <Shortcuts community={community} storage={storage} />
      <FetchWidgets communityId={community?.id || 0}>
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
    </section>
  );
};

export default Home;
