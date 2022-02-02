import React from 'react';
import {
  Header,
  Icon,
  Text,
  Tooltip,
  InfoIcon,
  Stack
} from 'bonde-components';
import NumberFormat from 'react-number-format';

import Panel from '../../../components/Panel';

interface NumberProps {
  total?: number;
  waiting?: number;
  format?: 'money'
}

export const Number: React.FC<NumberProps> = ({ children, total, waiting, format }) => {
  const formatProps: any = {
    displayType: 'text',
    thousandSeparator: '.',
    decimalSeparator: ','
  }
  
  if (format === 'money') {
    formatProps.decimalScale = 2
    formatProps.fixedDecimalScale = true
  }

  return (
    <>
      <Header.H2>
        <NumberFormat {...formatProps} value={total || 0} />
      </Header.H2>
      {waiting && (
        <Text style={{ color: '#a4a4a4' }}>
          <Icon color='#c7c7c7' name='Sync' size='small' />
          <NumberFormat {...formatProps} value={waiting} />
        </Text>
      )}
      {children}
    </>
  );
}

interface Props {
  label: string;
  tooltip?: string;
  full?: boolean;
}

const AnalyticsCard: React.FC<Props> = ({ label, tooltip, children }) => {
  const Label = <Header.H5 style={{ fontWeight: 600, marginBottom: '12px', whiteSpace: 'nowrap' }} uppercase>{label}</Header.H5>;

  return (
    <>
      <Stack direction="row" spacing={2} mt={4} align="center">
        {Label}
        {tooltip && (
          <Tooltip label={tooltip}>
            <InfoIcon color="gray.200" boxSize={3} />
          </Tooltip>
        )}
      </Stack>
      <Panel>
        {children}
      </Panel>
    </>
  );
}

export default AnalyticsCard;