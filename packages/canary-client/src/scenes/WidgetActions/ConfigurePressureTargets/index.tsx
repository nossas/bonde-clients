import React, { useState } from "react";
import {
  Button,
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
import { Widget } from '../FetchWidgets';
import UniqueForm, { UniqueFormExplainCard } from "./UniqueForm";
import GroupForm from './GroupForm';
import Selectable, { SelectableRenderProps } from './Selectable';

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

// type GroupTargetInput = {
//   widget_id: number
//   targets: string[]
//   identify: string,
//   label: string,
//   email_subject: string
//   email_body: string
// }

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

const options = [
  {
    value: "unique",
    label: "Um grupo de alvos"
  },
  {
    value: "group",
    label: "Mais de um grupo de alvos (Ex: Por estado)"
  }
]

export type PressureType = "unique" | "group";

const ConfigurePressureTargets = ({ widget }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPressureTargets);
  const [value, setValue] = useState<PressureType>('unique');
  return (    
    <Selectable
      options={options}
      selected={value}
      onChange={setValue}
      name="pressureType"
      title="Tipo de pressão"
    >
      {({ selected }: SelectableRenderProps) => (
        <ConnectedForm
          initialValues={{
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
            <div
              css={css`
              display: grid;
              grid-template-columns: 55% 45%;
              grid-column-gap: 20px;
              height: 100%;
            `}
            >
              <Card padding={{ x: 50, y: 40 }}>
                <Header.H4 style={{ marginBottom: '15px' }}>Definir alvos</Header.H4>
                {selected === 'unique'
                  ? <UniqueForm />
                  : <GroupForm form={form} />
                }
                <Button type='submit' disabled={submitting || pristine}>Salvar</Button>
              </Card>
              {selected === 'unique' && (
                <UniqueFormExplainCard />
              )}
            </div>
          )}
        </ConnectedForm>
      )}
    </Selectable>
  );
};

export default ConfigurePressureTargets;
