import React from "react";
import { Label } from "bonde-components";
import { css } from "styled-components/macro";
import Radio from "./Radio";

export type SelectableRenderProps = {
  selected: string;
};

export type SelectableProps = {
  children: (props: SelectableRenderProps) => any;
  name: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  onChange: (e: any) => void;
  title: string;
  selected: string;
};

const Selectable = ({
  children,
  options,
  title,
  selected,
  onChange,
  name
}: SelectableProps): React.ReactElement => {
  return (
    <>
      <Label>{title}</Label>
      <div
        css={css`
          display: flex;
          margin-bottom: 30px;
        `}
      >
        {options.map(({ value, label }, i) => (
          <Radio
            type="radio"
            name={name}
            value={value}
            checked={selected === value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onChange(e.target.value)
            }
            key={`${name}-${i}`}
          >
            {label}
          </Radio>
        ))}
      </div>
      {children({ selected })}
    </>
  );
};

export default Selectable;
