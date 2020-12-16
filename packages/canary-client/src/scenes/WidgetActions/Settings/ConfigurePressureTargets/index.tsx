import React from "react";
import {
  Card,
  ConnectedForm,
  Header,
  toast,
  Success
} from 'bonde-components';
import { gql, useMutation } from 'bonde-core-tools';
import arrayMutators from 'final-form-arrays'
import { css } from "styled-components/macro";
import slugify from 'slugify';
import RadioField, { Radio } from '../../../../components/Radio';
import SpyField from '../../../../components/SpyField';
import { Widget } from '../../FetchWidgets';
import FloatingButton from '../../FloatingButton';
import UniqueForm, { UniqueFormExplainCard } from "./UniqueForm";
import GroupForm from './GroupForm';

const upsertPressureTargets = gql`
  mutation ($input: [pressure_targets_insert_input!]!) {
    insert_pressure_targets(
      objects: $input,
      on_conflict: {
        constraint: unique_identify_widget_id,
        update_columns: [email_subject, email_body, label, targets]
      }
    ) {
      returning {
        targets
        identify
        label
        email_subject
        email_body
      }
    }
  }
`;

type GroupTarget = {
  identify: string
}

const diff = (arr1: GroupTarget[], arr2: GroupTarget[]): GroupTarget[] => {
  const ret: GroupTarget[] = [];
  arr1.forEach((g1: any) => {
    const g2 = arr2.find((g: any) => g.identify === g1.identify);
    
    if (!!g2 && !Object.is(g2, g1)) {
      ret.push(g1);
    } else if (!g2) {
      ret.push(g1);
    }
  })

  return ret;
}

type Props = {
  widget: Widget
  refetch: any
}

const ConfigurePressureTargets = ({ widget, refetch }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPressureTargets);

  return (    
    <ConnectedForm
      initialValues={{
        pressureType: 'unique',
        groups: widget.groups
      }}
      mutators={{...arrayMutators}}
      onSubmit={async ({ groups, ...values }: any) => {
        console.log('values', { values });
        if (groups && JSON.stringify(groups) !== JSON.stringify(widget.groups)) {
          try {
            const variables = {
              input: diff(groups, widget.groups as any).map((g: any) => ({
                email_subject: g.email_subject,
                email_body: g.email_body,
                targets: g.targets,
                label: g.label,
                identify: !g.identify ? slugify(g.label, { lower: true }) : g.identify,
                widget_id: widget.id
              }))
            }
            await upsert({ variables });
            refetch();
            toast(<Success message='Alvos definidos com sucesso' />, { type: toast.TYPE.SUCCESS });
          } catch (err) {
            console.error('err', { err });
            toast(err.message, { type: toast.TYPE.ERROR });
          }
        }
      }}
    >
      {({ form, submitting, pristine }: any) => (
        <>
          <FloatingButton type='submit' disabled={submitting || pristine}>
            Salvar
          </FloatingButton>
          <RadioField label='Tipo de pressão' name='pressureType'>
            <Radio value='unique'>
              Um grupo de alvos
            </Radio>
            <Radio value='group'>
              Mais de um grupo de alvos (Ex: Por estado)
            </Radio>
          </RadioField>
          <div
            css={css`
            display: grid;
            grid-template-columns: 55% 45%;
            grid-column-gap: 20px;
            height: 100%;
          `}
          >
            <SpyField field='pressureType'>
              {({ value }: any) => (
                <>
                  <Card padding={{ x: 50, y: 40 }}>
                    <Header.H4 style={{ marginBottom: '15px' }}>Definir alvos</Header.H4>
                    {value === 'unique'
                      ? <UniqueForm />
                      : <GroupForm form={form} />
                    }
                  </Card>
                  {value === 'unique' && <UniqueFormExplainCard />}     
                </>
              )}
            </SpyField>
          </div>
        </>
      )}
    </ConnectedForm>
  );
};

export default ConfigurePressureTargets;