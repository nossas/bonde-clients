import React from "react";
import { Text } from "bonde-components";
import { Widget } from "../../FetchWidgets";
import Card from "./Card";
import { useBondePressures } from './hooks/useBondePressures'

type Props = {
  widget: Widget
}

const BondePressureCards: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = useBondePressures({ widget })

  if (error) {
    console.log("EventsCards: ", error);
    return <Text>Failed!</Text>;
  }

  return (
    <>
      <Card
        isLoading={loading}
        value={data?.pressuresAggregateCount}
        label="Pressões"
      />
      <Card
        isLoading={loading}
        value={data?.pressureTargetsCount}
        label="Alvos"
      />
    </>
  )
}

export default BondePressureCards;
