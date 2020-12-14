import React from "react";
import { Card, ConnectedForm, Header } from 'bonde-components';
import arrayMutators from 'final-form-arrays'
import { css } from "styled-components/macro";
import UniqueForm, { UniqueFormExplainCard } from "./UniqueForm";
import GroupForm from './GroupForm';
import Selectable, { SelectableRenderProps } from './Selectable';

// type Props = {
//   widgetId: number;
// };

const ConfigurePressureTargets = (): React.ReactElement => {
  return (    
    <Selectable>
      {({ selected }: SelectableRenderProps) => (
        <ConnectedForm
          mutators={{...arrayMutators}}
          onSubmit={(values: any) => console.log('values', { values })}
        >
          {({ form }: any) => (
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
