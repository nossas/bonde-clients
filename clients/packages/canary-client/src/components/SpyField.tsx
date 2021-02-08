import { useField } from 'bonde-components';

type SpyFieldProps = {
  // Field name used to spy
  field: string
  children: (value: any) => any
}

const SpyField = ({ children, field }: SpyFieldProps) => {
  const { input } = useField(field)

  return children({ value: input.value });
}

export default SpyField;