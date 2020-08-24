import React from 'react';
import { Header } from 'bonde-components';
import Panel from '../Panel';

const FieldPrexiContext = React.createContext<string>('');

type Props = {
  prefix: string
  title?: string
  children?: any
}

export const FieldPrefix = ({ prefix, title, children }: Props) => (
  <FieldPrexiContext.Provider value={prefix}>
    {title && (<Header.h3>{title}</Header.h3>)}
    <Panel>
      {children}
    </Panel>
  </FieldPrexiContext.Provider>
);

export const PrefixedField = ({ name, component: Field, ...props }: any) => (
  <FieldPrexiContext.Consumer>
    {(prefix: string) => <Field name={`${prefix}.${name}`} {...props} />}
  </FieldPrexiContext.Consumer>
);