import React, { useState, useEffect } from 'react';
import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
  Button,
  Input
} from 'bonde-components/chakra';
import { toast, Success, TextareaField } from 'bonde-components';
import { gql, useMutation } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';

import { Widget } from '../../FetchWidgets';
import SettingsForm from '../SettingsForm';
import { Targets } from '../../../Community/Domains/Icons';

const upsertPhoneTargets = gql`
  mutation ($input: [pressure_targets_insert_input!]!) {
    insert_pressure_targets(
      objects: $input,
      on_conflict: {
        constraint: unique_identify_widget_id,
        update_columns: [label, targets]
      }
    ) {
      returning {
        targets
        label
      }
    }
  }
`;

type Props = {
  widget: Widget
  updateCache: (widget: Widget) => any
}

const ConfigurePhonePressureTargets = ({ widget, updateCache }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPhoneTargets);
  const { t } = useTranslation('widgetActions');

  // local state para targets
  const [targets, setTargets] = useState<{ name: string; phone: string }[]>(
    widget.targets || [{ name: '', phone: '' }]
  );

  const addTarget = () => {
    setTargets([...targets, { name: '', phone: '' }]);
  };

  const removeTarget = (index: number) => {
    const newTargets = [...targets];
    newTargets.splice(index, 1);
    setTargets(newTargets);
  };

  const updateTarget = (index: number, field: 'name' | 'phone', value: string) => {
    const newTargets = [...targets];
    newTargets[index][field] = value;
    setTargets(newTargets);
  };

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          ...widget.settings,
        }
      }}
      afterSubmit={async ({ settings }: any) => {
        try {
          const variables = {
            input: [{
              widget_id: widget.id,
              label: 'default',
              targets,
            }]
          };
          await upsert({ variables });
          updateCache({ ...widget, settings, targets });
          toast(<Success message="Alvos atualizados com sucesso!" />, { type: toast.TYPE.SUCCESS });
        } catch (err) {
          console.error('err', { err });
          toast((err as any).message, { type: toast.TYPE.ERROR });
        }
      }}
    >
      {({ submitting, dirty, invalid }: any) => (
        <Box bg="white" p={6} boxShadow="sm">
          <Grid templateColumns="repeat(12, 1fr)" gap={16}>
            <GridItem colSpan={[12, 12, 1]}>
              <Targets />
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              <Heading as="h3" size="xl" mb={2}>Pressão por telefone</Heading>
              <Text fontSize="18px" color="gray.400" mb={4}>
                Configure abaixo o roteiro da ligação e os alvos com nome e telefone:
              </Text>

              <TextareaField
                name="settings.call_script"
                label="Roteiro da ligação"
                placeholder="Sugira o que o ativista pode falar durante a ligação"
              />

              {targets.map((target, index) => (
                <Box key={index} mt={4} p={4} borderWidth="1px" borderRadius="md">
                  <Input
                    value={target.name}
                    onChange={(e) => updateTarget(index, 'name', e.target.value)}
                    placeholder="Nome do alvo"
                    mb={2}
                  />
                  <Input
                    value={target.phone}
                    onChange={(e) => updateTarget(index, 'phone', e.target.value)}
                    placeholder="Telefone"
                    mb={2}
                  />
                  <Button mt={1} size="sm" variant="outline" onClick={() => removeTarget(index)}>
                    Remover
                  </Button>
                </Box>
              ))}

              <Button mt={4} onClick={addTarget}>
                Adicionar alvo
              </Button>

              <Flex justify="end" mt={6}>
                <Button disabled={submitting || invalid} type="submit">
                  {t('settings.defaultForm.submit')}
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      )}
    </SettingsForm>
  );
};

export default ConfigurePhonePressureTargets;
