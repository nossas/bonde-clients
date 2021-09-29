import React from "react";
import Card from "./Card";

type Props = {
  targetsCount: number
  pressuresCount: number
}

const BondePressureCards: React.FC<Props> = ({ targetsCount, pressuresCount }) => {
  return (
    <>
      <Card
        label="Pressões"
        helpText="Pressões são as inscrições feitas na sua campanha."
        value={pressuresCount}
      />
      <Card value={targetsCount} label="Alvos" />
    </>
  )
}

export default BondePressureCards;
