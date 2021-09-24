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
        label="Pressões"
        helpText="Pressões são as inscrições feitas na sua campanha."
        isLoading={loading}
        value={data?.pressuresAggregateCount}
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
