import React from "react";
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
        update_columns: [email_subject, email_body, label]
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

type Props = {
  widget: Widget
}

const ConfigurePressureTargets = ({ widget }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPressureTargets);
  
  return (    
    <Selectable>
      {({ selected }: SelectableRenderProps) => (
        <ConnectedForm
          initialValues={{
            groups: widget.groups
          }}
          mutators={{...arrayMutators}}
          onSubmit={async ({ groups }: any) => {
            if (groups) {
              try {
                const variables = {
                  input: groups.map((g: any) => ({
                    email_subject: g.email_subject,
                    email_body: g.email_body,
                    targets: g.targets,
                    label: g.label,
                    identify: !g.identify ? slugify(g.label, { lower: true }) : g.identify,
                    widget_id: widget.id
                  }))
                }
                await upsert({ variables });
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
