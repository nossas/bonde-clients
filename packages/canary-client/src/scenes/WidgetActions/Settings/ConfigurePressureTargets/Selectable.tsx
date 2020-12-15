import React, { useState } from 'react';
import { Label } from "bonde-components";
import { css } from 'styled-components/macro';
import Radio from "../../../../components/Radio";

export type PressureType = 'unique' | 'group';

export type SelectableRenderProps = {
  selected: PressureType
}

export type SelectableProps = {
  children: (props: SelectableRenderProps) => any
}

const Selectable = ({ children }: SelectableProps) => {
  const [value, setValue] = useState<PressureType>('unique');

  return (
    <>
      <Label>Tipo de pressão</Label>
      <div
        css={css`
          display: flex;
          margin-bottom: 30px;
        `}
      >
        <Radio
          type="radio"
          name="pressureType"
          value="unique"
          checked={value === "unique"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setValue(e.target.value as any)
          }
        >
          Um grupo de alvos
        </Radio>
        <Radio
          type="radio"
          name="pressureType"
          value="group"
          checked={value === "group"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setValue(e.target.value as any)
          }
        >
          Mais de um grupo de alvos (Ex: Por estado)
        </Radio>
      </div>
      {children({ selected: value })}
    </>
  )
}

export default Selectable;