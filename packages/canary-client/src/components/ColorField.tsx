import React from 'react';
import { useField, FormField, Label } from 'bonde-components';
import { SketchPicker } from 'react-color';

const ColorField = ({ name, label }: any) => {
  const { input } = useField(name);

  return (
    <FormField>
      <Label>{label}</Label>
      <div style={{ padding: '8px 0' }}>
        <SketchPicker
          color={input.value}
          onChangeComplete={(color: any) => input.onChange(color.hex)}
        />
      </div>
    </FormField>
  );
}

export default ColorField;