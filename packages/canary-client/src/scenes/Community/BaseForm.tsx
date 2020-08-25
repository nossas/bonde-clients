import React from 'react';
import {
  ConnectedForm,
  Button
} from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import { useTranslation } from "react-i18next";

const submit = async (values: any): Promise<any> => {
  console.log('submit community', values);
}

export default ({ children }: any) => {
  const { community } = useSession();
  const { t } = useTranslation('community');

  return (
    <ConnectedForm initialValues={{ community }} onSubmit={submit}>
      {({ submitting }) => (
        <>
          {children}
          <Button type='submit' disabled={submitting}>{t('buttons.submit')}</Button>
        </>
      )}
    </ConnectedForm>
  );
}

// TODO:
// - Success Message (Toastify)