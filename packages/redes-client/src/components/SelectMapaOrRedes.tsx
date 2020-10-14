import React from "react";
import { Route } from "react-router-dom";
import { useSession } from "bonde-core-tools";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import Data from "../data";
import { Groups } from "../types";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ({
    data,
    community,
    groups,
  }: {
    data: any;
    community?: { id: number };
    groups: Groups;
  }) => React.ReactElement | null;
  path: string;
  exact?: boolean;
};

const SelectMapaOrRedes = ({
  component: ComponentToRender,
  ...rest
}: Props): React.ReactElement => {
  const { community } = useSession();
  const { groups } = useCommunityExtra();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ComponentToRender
            {...props}
            groups={groups}
            community={community}
            data={community?.id === 40 ? Data.mapa : Data.redes}
          />
        );
      }}
    />
  );
};

export default SelectMapaOrRedes;
