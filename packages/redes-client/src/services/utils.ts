export const getSelectValues = (values: {
  [x: string]: { value: unknown; label: string } & string;
}): {
  [x: string]: string | number;
} =>
  Object.keys(values).reduce((newObj, old) => {
    const newValue =
      typeof values[old] === "object" ? values[old].value : values[old];
    return {
      ...newObj,
      [old]: newValue,
    };
  }, {});
