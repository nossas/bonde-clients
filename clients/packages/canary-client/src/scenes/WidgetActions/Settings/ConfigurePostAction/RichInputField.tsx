import React from "react";
import SlateEditor from "../../../../components/SlateEditor"

import { useField } from 'bonde-components';

const RichInputField = ({ name }: any) => {
  const { input } = useField(name);

  return (
    <SlateEditor
      value={input.value}
      onChange={(value: any) => {
        input.onChange(value.toJS());
      }}
    />
  )
}

export default RichInputField;
