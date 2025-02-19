import React from "react";
import { useField } from 'bonde-components/form';
import SlateEditor from "../../../../components/SlateEditor"

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
