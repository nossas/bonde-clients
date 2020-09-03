import React from "react";
import { FormSpy } from "bonde-components";

export default function AutoSaveFilters(props: {
  save: (e: any) => Promise<any>;
}): React.ReactElement {
  return (
    <FormSpy
      {...props}
      subscription={{ active: true, values: true }}
      onChange={(newValues) => props.save(newValues.values)}
    />
  );
}

AutoSaveFilters.displayName = "AutoSaveFilters";
