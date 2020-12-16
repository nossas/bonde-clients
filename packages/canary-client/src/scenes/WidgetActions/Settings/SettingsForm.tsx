import React from 'react';
import { Button, ConnectedForm, toast, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { css } from 'styled-components/macro';
import { Widget } from '../FetchWidgets';

const UpdateWidgetGQL = gql`
  mutation (
    $primaryKey: Int!
    $settings: jsonb!
  ) {
    update_widgets(
      where: { id: { _eq: $primaryKey } }
      _append: { settings: $settings }
    ) {
      affected_rows
    }
  }
`;

type SubmitProps = {
  primaryKey: number
  settings: any
}

type Props = {
  widget: Widget
  initialValues?: any
  children: any
}

const SettingsForm = ({ children, widget, initialValues }: Props) => {
  const [save] = useMutation(UpdateWidgetGQL);

  const onSubmit = async ({ primaryKey, settings }: SubmitProps) => {
    try {
      const result = await save({ variables: { primaryKey, settings } });
      // TODO: try catch
      console.log('data', { result });

      if (!(result.data.update_widgets.affected_rows === 1)) {
        throw new Error("Houve um erro ao salvar o formulário");
      }

      toast(<Success message="Sucesso ao salvar as configurações!" />, {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      console.log(e);
      return toast("Houve um erro ao salvar o formulário", {
        type: toast.TYPE.ERROR,
      });
    }
  }

  return (
    <ConnectedForm onSubmit={onSubmit} initialValues={{ primaryKey: widget.id, ...initialValues }}>
      {({ submitting, pristine, ...formProps }: any) => (
        <div
          css={`
            position: relative;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: -170px;
              right: 0;
              width: 150px;
            `}
          >
            <Button type='submit' disabled={submitting || pristine}>Salvar</Button>
          </div>
          {children({ submitting, pristine, ...formProps })}
        </div>
      )}
    </ConnectedForm>
  )
}

SettingsForm.defaultValues = {
  initialValues: {}
}

export default SettingsForm;