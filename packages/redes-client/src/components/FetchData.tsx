import React from "react";
import { Route } from "react-router-dom";
import { useSession } from "bonde-core-tools";
import Data from "../data";

type Props = {
  component: ({ data }: { data: any }) => React.ReactElement | null;
  path: string;
};

const FetchData = ({ component: ComponentToRender, ...rest }: Props) => {
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

export default FetchData;
