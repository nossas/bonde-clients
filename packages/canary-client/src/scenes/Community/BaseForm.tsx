import React from 'react';
import {
  ConnectedForm,
  Button
} from 'bonde-components';
import { useSession } from 'bonde-core-tools';

const submit = async (values: any): Promise<any> => {
  console.log('submit community', values);
}

export default ({ children }: any) => {
  const { community } = useSession();

  return (
    <ConnectedForm initialValues={{ community }} onSubmit={submit}>
      {({ submitting }) => (
        <>
          {children}
          <Button type='submit' disabled={submitting}>Salvar</Button>
        </>
      )}
    </ConnectedForm>
  );
}