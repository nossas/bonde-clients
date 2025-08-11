import React from 'react';
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
import { useField } from "bonde-components/form";
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Widget } from '../../FetchWidgets';
import SettingsForm from '../SettingsForm';
import { Targets } from '../../../Community/Domains/Icons';
import HTMLField from "../HTMLField";

type Props = {
  widget: Widget
  updateCache: (widget: Widget) => any
}

const ConfigurePhonePressureTargets = ({ widget, updateCache }: Props): React.ReactElement => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          ...widget.settings,
        }
      }}
      afterSubmit={async (_: any, result: any) => {
        updateCache(result.data.update_widgets.returning[0]);
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

              <HTMLField
                name="settings.call_script"
                label="Roteiro da ligação"
                placeholder="Sugira o que o ativista pode falar durante a ligação"
                mode="default"
                initialValue={widget.settings.call_script}
              />

              <TargetsField name="settings.targets" initialValue={widget.settings.targets} />

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


const TargetsField = ({ name, initialValue }: { name: string, initialValue?: any[] }) => {
  const { input } = useField(name, { initialValue });

  const updateTarget = (index: number, field: 'name' | 'phone', value: string) => {
    const newTargets = _.cloneDeep(input.value);
    newTargets[index][field] = value;
    input.onChange(newTargets);
  };

  const removeTarget = (index: number) => {
    const newTargets = [...input.value];
    newTargets.splice(index, 1);
    input.onChange(newTargets);
  };

  const addTarget = () => {
    input.onChange([...input.value, { name: "", phone: "" }])
  }

  return (
    <>
    {input.value.map((target, index) => (
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
    </>
  );
}