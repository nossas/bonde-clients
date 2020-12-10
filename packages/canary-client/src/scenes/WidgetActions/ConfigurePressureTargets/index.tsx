import React, { useState } from "react";
import { Header, Text } from "bonde-components";
import { css } from 'styled-components/macro'

import SimpleTargetsForm from './SimpleTargetsForm'

const ConfigurePressureTargets = (): React.ReactElement => {
  const [pressureType, setPressureType] = useState("group");
  return (
    <>
      <Header.H5 style={{ fontWeight: 600 }}>TIPO DE PRESSÃO</Header.H5>
      <div css={css`
        display: flex;
      `}>
        <input
          type="radio"
          value="group"
          checked={pressureType === "group"}
          name="pressureType"
          onChange={(e) => setPressureType(e.target.value)}
        />{" "}
        <Text>Um grupo de alvos</Text>
        <input
          type="radio"
          value="groups"
          checked={pressureType === "groups"}
          name="pressureType"
          onChange={(e) => setPressureType(e.target.value)}
        />{" "}
        <Text>Mais de um grupo de alvos (Ex: Por estado)</Text>
      </div>
      <div css={css`
        display: grid;
        grid-template-columns: 55% 45%;
        grid-column-gap: 20px;
        height: 100%;
      `}>
        {pressureType === 'group' && <SimpleTargetsForm />}
      </div>
    </>
  );
};

export default ConfigurePressureTargets;
