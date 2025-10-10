import React from "react";
import { toast, Success, RadioField } from 'bonde-components';
import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
  Button,
  Radio,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  FormLabel
} from 'bonde-components/chakra';
import { gql, useMutation } from 'bonde-core-tools';
import arrayMutators from 'final-form-arrays'
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';

import SpyField from '../../../../../components/SpyField';
import { Widget } from '../../../FetchWidgets';
import SettingsForm from '../../SettingsForm';
import UniqueFormFields, { UniqueFormExplainCard } from "./UniqueForm";
import GroupFormFields from './GroupForm';
import SingleShotUpload from './SingleShotUpload';
import SingleShotSavedData from './SingleShotSavedData';
import { Targets } from "../../../../Community/Domains/Icons";

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
  updateCache: (widget: Widget) => any
}

const ConfigurePressureTargets = ({ widget, updateCache }: Props): React.ReactElement => {
  const [upsert] = useMutation(upsertPressureTargets);
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          ...widget.settings,
          pressure_type: widget.settings.pressure_type || 'unique',
          is_subject_list: widget.settings.is_subject_list || 'n',
          singleshot_sender_email: widget.settings.singleshot_sender_email || '',
          singleshot_sender_name: widget.settings.singleshot_sender_name || ''
        },
        groups: widget.groups,
        singleshotCsvData: []
      }}
      mutators={{ ...arrayMutators }}
      afterSubmit={async ({ groups, settings, singleshotCsvData }: any) => {
        try {
          if (settings.pressure_type === 'singleShot' && singleshotCsvData?.length > 0) {
            const variables = {
              input: [{
                widget_id: widget.id,
                identify: 'singleshot_csv_data',
                label: 'Disparo Único - CSV',
                email_subject: settings.singleshot_sender_name || 'SingleShot Campaign',
                email_body: settings.singleshot_sender_email || '',
                targets: singleshotCsvData
              }]
            };
            
            await upsert({ variables });
            updateCache({ ...widget, settings });
            toast(<Success message="Dados do disparo único salvos com sucesso!" />, { type: toast.TYPE.SUCCESS });
          }
          else if (settings.pressure_type === 'group' && groups && JSON.stringify(groups) !== JSON.stringify(widget.groups)) {
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
            updateCache({ ...widget, settings, groups });
            toast(<Success message={t('settings.pressure.targets.success')} />, { type: toast.TYPE.SUCCESS });
          } 
          else {
            updateCache({ ...widget, settings });
            toast(<Success message="Configurações salvas com sucesso!" />, { type: toast.TYPE.SUCCESS });
          }
        } catch (err) {
          console.error('err', { err });
          toast((err as any).message, { type: toast.TYPE.ERROR });
        }
      }}
    >
      {({ form, submitting, dirty, invalid }: any) => {
        const formValues = form.getState().values;
        const pressureType = formValues.settings?.pressure_type;

        return (
          <Box bg="white" p={6} boxShadow="sm">
            <Grid templateColumns="repeat(12, 1fr)" gap={16}>
              <GridItem colSpan={[12, 12, 1]}>
                <Targets />
              </GridItem>
              
              <GridItem colSpan={[12, 12, 6]}>
                <Stack spacing={2} mb={4}>
                  <Heading as="h3" size="xl">Alvos</Heading>
                  <Text fontSize="18px" color="gray.400">
                    Defina abaixo quem serão os alvos da sua campanha de pressão e o e-mail que será enviado para eles:
                  </Text>
                </Stack>

                <RadioField
                  name='settings.pressure_type'
                  label={t('settings.pressure.label.pressure_type')}
                >
                  <Radio value='unique'>{t('settings.pressure.radio.unique')}</Radio>
                  <Radio value='group'>{t('settings.pressure.radio.group')}</Radio>
                  <Radio value='singleShot'>Disparo Único (CSV)</Radio>
                </RadioField>

                <SpyField field='settings.pressure_type'>
                  {({ value }: any) => (
                    <>
                      {value === 'unique' && (
                        <>
                          <RadioField
                            name='settings.is_subject_list'
                            label={t('settings.pressure.label.is_subject_list')}
                          >
                            <Radio value='s'>{t('settings.pressure.radio.yes')}</Radio>
                            <Radio value='n'>{t('settings.pressure.radio.no')}</Radio>
                          </RadioField>
                          <UniqueFormFields />
                        </>
                      )}

                      {value === 'group' && <GroupFormFields form={form} />}

                      {value === 'singleShot' && (
                        <Tabs variant="enclosed" mt={4}>
                          <TabList>
                            <Tab>📤 Novo Disparo</Tab>
                            <Tab>💾 Dados Salvos</Tab>
                          </TabList>

                          <TabPanels>
                            <TabPanel>
                              <Stack spacing={4}>
                                <Box p={4} bg="gray.50" borderRadius="md">
                                  <Heading size="sm" mb={3}>Configurações do Remetente</Heading>
                                  <Stack spacing={3}>
                                    <FormControl>
                                      <FormLabel fontSize="sm">Email do Remetente</FormLabel>
                                      <Input
                                        placeholder="exemplo@seuemail.com"
                                        size="md"
                                        value={formValues.settings?.singleshot_sender_email || ''}
                                        onChange={(e: any) => form.change('settings.singleshot_sender_email', e.target.value)}
                                      />
                                    </FormControl>
                                    
                                    <FormControl>
                                      <FormLabel fontSize="sm">Nome do Remetente</FormLabel>
                                      <Input
                                        placeholder="Sua Campanha"
                                        size="md"
                                        value={formValues.settings?.singleshot_sender_name || ''}
                                        onChange={(e: any) => form.change('settings.singleshot_sender_name', e.target.value)}
                                      />
                                    </FormControl>
                                  </Stack>
                                </Box>

                                <SingleShotUpload
                                  onDataChange={(data) => {
                                    form.change('singleshotCsvData', data);
                                  }}
                                  currentData={formValues.singleshotCsvData || []}
                                />
                              </Stack>
                            </TabPanel>

                            <TabPanel>
                              <SingleShotSavedData 
                                widget_id={widget.id}
                                sender_email={formValues.settings?.singleshot_sender_email}
                                sender_name={formValues.settings?.singleshot_sender_name}
                              />
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      )}

                      {value !== 'singleShot' && (
                        <RadioField
                          name='settings.disable_edit_field'
                          label={t('settings.pressure.label.disable_edit_field')}
                        >
                          <Radio value='s'>{t('settings.pressure.radio.yes')}</Radio>
                          <Radio value='n'>{t('settings.pressure.radio.no')}</Radio>
                        </RadioField>
                      )}
                    </>
                  )}
                </SpyField>

                <Flex justify='end' mt={6}>
                  <Button 
                    disabled={submitting || !dirty || invalid} 
                    type='submit'
                    colorScheme="blue"
                    isLoading={submitting}
                  >
                    {t('settings.defaultForm.submit')}
                  </Button>
                </Flex>
              </GridItem>

              <GridItem colSpan={[12, 12, 5]}>
                {pressureType === 'singleShot' ? (
                  <Box p={4} bg="blue.50" borderRadius="md" borderWidth={1} borderColor="blue.200">
                    <Heading as="h4" size="md" mb={3} color="blue.700">
                      💡 Sobre o Disparo Único
                    </Heading>
                    <Text fontSize="sm" color="gray.700" mb={3}>
                      O modo de Disparo Único permite enviar emails completamente personalizados 
                      para múltiplos destinatários através de um arquivo CSV.
                    </Text>
                    
                    <Text fontSize="sm" color="gray.700" fontWeight="semibold" mb={2}>
                      Como funciona:
                    </Text>
                    <Stack spacing={1} mb={3}>
                      <Text fontSize="xs" color="gray.600">
                        1. Configure o email e nome do remetente
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        2. Baixe o template CSV
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        3. Preencha com seus dados (email, subject, body)
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        4. Faça upload do arquivo preenchido
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        5. Clique em "Salvar" para armazenar
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        6. Os dados ficam salvos no banco de dados
                      </Text>
                    </Stack>

                    <Text fontSize="sm" color="gray.700" fontWeight="semibold" mb={2}>
                      Vantagens:
                    </Text>
                    <Stack spacing={1}>
                      <Text fontSize="xs" color="gray.600">
                        ✓ Cada email pode ter assunto único
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        ✓ Conteúdo personalizado por destinatário
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        ✓ Dados salvos na tabela pressure_targets
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        ✓ Fácil recuperação e reutilização
                      </Text>
                    </Stack>
                  </Box>
                ) : (
                  <UniqueFormExplainCard />
                )}
              </GridItem>
            </Grid>
          </Box>
        );
      }}
    </SettingsForm>
  );
};

export default ConfigurePressureTargets;