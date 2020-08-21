import React from "react";
import { Route } from "react-router-dom";
import { useSession } from "bonde-core-tools";
import Data from "../data";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ({ data }: { data: any }) => React.ReactElement | null;
  path: string;
};

const SelectMapaOrRedes = ({
  component: ComponentToRender,
  ...rest
}: Props): React.ReactElement => {
  const { community } = useSession();
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ComponentToRender
            {...props}
            data={community?.id === 40 ? Data.mapa : Data.redes}
          />
        );
      }}
    />
  );
};

export default SelectMapaOrRedes;
