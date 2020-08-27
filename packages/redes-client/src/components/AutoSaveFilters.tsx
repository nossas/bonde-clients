import React from "react";
import { FormSpy } from "bonde-components";

export default (props: any) => (
  <FormSpy
    {...props}
    subscription={{ active: true, values: true }}
    onChange={(newValues) => props.save(newValues.values)}
  />
);
