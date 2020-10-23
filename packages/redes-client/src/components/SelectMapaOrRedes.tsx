import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { useSession } from "bonde-core-tools";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import Data from "../data";
import { Groups } from "../types";

type Props = {
  component: ({
    data,
    community,
    groups,
  }: {
    data: any;
    community?: { id: number };
    groups: Groups;
  }) => React.ReactElement | null;
  path?: string;
  exact?: boolean;
};

const redirect = () => {
  alert("Você precisa selecionar alguma usuária para começar o Match")
  return <Redirect to="/pessoas" />
}

const validateIfUserIsSelected = (component: any, state: any) => {
  return state ? component : redirect()
}

const SelectMapaOrRedes = ({
  component: ComponentToRender,
  ...rest
}: Props): React.ReactElement => {
  const { community } = useSession();
  const { groups } = useCommunityExtra();
  const { state } = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        const render = (
          <ComponentToRender
            {...props}
            groups={groups}
            community={community}
            data={community?.id === 40 ? Data.mapa : Data.redes}
          />
        )
        return rest.path === "/match" ? validateIfUserIsSelected(render, state) : render;
      }}
    />
  );
};

export default SelectMapaOrRedes;
