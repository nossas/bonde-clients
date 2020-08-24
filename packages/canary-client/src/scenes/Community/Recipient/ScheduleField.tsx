import React from 'react';
import { Header, useField } from 'bonde-components';
import SelectField from '../SelectField';
import Panel from '../Panel';

const ScheduleField = ({ title, interval, day }: any) => {
  const { input: intervalField } = useField(interval.name);

  return (
    <>
      {title && (<Header.h3>{title}</Header.h3>)}
      <Panel>
        <SelectField {...interval}>
          <option value='weekly'>Semanal</option>
          <option value='monthly'>Mensal</option>
        </SelectField>
        <SelectField {...day}>
          {intervalField.value === 'weekly' ? (
            <>
              <option value='1'>Segunda</option>
              <option value='2'>Terça</option>
              <option value='3'>Quarta</option>
              <option value='4'>Quinta</option>
              <option value='5'>Sexta</option>
            </>
          ) : (
              <>
                <option value='1'>1</option>
                <option value='6'>6</option>
                <option value='11'>11</option>
                <option value='16'>16</option>
                <option value='21'>21</option>
                <option value='26'>26</option>
              </>
            )}
        </SelectField>
      </Panel>
    </>
  );
}

export default ScheduleField;