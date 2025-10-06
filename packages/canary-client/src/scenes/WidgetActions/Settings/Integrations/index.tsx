import React from 'react';
import { InputField, RadioField } from 'bonde-components';
import {
  Button,
  Box,
  Flex,
  Radio,
  Heading,
  Grid,
  GridItem,
  Text
} from 'bonde-components/chakra';
import { useTranslation } from 'react-i18next';
import { gql, useQuery, useMutation } from "bonde-core-tools";
import SettingsForm from '../SettingsForm';
import { Link } from "react-router-dom";

const CHECK_TURNIO_KEY = gql`
  query CheckTurnioKey($widgetId: Int!) {
    widgets_by_pk(id: $widgetId) {
      block {
        mobilization {
          community {
            integrations
          }
        }
      }
    }
  }
`;

const TURNIO_CREATE_CUSTOM_FIELD = gql`
  mutation TurnioCreateCustomField($params: CreateCustomFieldInput!) {
    turnio_create_custom_field(params: $params) {
      custom_field
      created_at
    }
  }
`;

const IntegrationsFields = ({ widget, updateCache }: any) => {
  const { t } = useTranslation('widgetActions');

  const { data, loading, error } = useQuery(CHECK_TURNIO_KEY, {
    variables: { widgetId: widget.id }
  });

  const [createCustomField] = useMutation(TURNIO_CREATE_CUSTOM_FIELD);

  const hasTurnioKey = React.useMemo(() => {
    const integrations = data?.widgets_by_pk?.block?.mobilization?.community?.integrations;
    if (!integrations) return false;
    
    try {
      const integrationsObj = typeof integrations === 'string' 
        ? JSON.parse(integrations)
        : integrations;
      return !!(integrationsObj?.turnio?.api_key);
    } catch (e) {
      return false;
    }
  }, [data]);

  const afterSubmit = async (values: any, result: any) => {
    let createdCustomField;
    try {
      if (values.settings.share === 's' && values.settings.turnio?.custom_field) {
        createdCustomField = await createCustomField({
          variables: {
            params: {
              custom_field: values.settings.turnio.custom_field,
              widget_id: widget.id
            }
          }
        });
      }
      console.log(createdCustomField);

      const updatedWidget = result.data.update_widgets.returning[0];
      await updateCache({
        ...updatedWidget,
        settings: {
          ...updatedWidget.settings,
          turnio: createdCustomField?.data?.turnio_create_custom_field ?? updatedWidget.settings?.turnio
        }
      });
    } catch (error) {
      console.error('Erro ao criar campo customizado no Turn.io:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar configurações</div>;

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={afterSubmit}
      initialValues={{
        settings: {
          webhook_enabled: "n",
          email_integration: "n",
          sync_frequency: "daily",
          share: widget.settings?.turnio?.custom_field ? "s":"n",
          turnio: {
            custom_field: widget.settings?.turnio?.custom_field || ""
          },
          ...widget.settings
        }
      }}
    >
      {({ submitting, dirty, values }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, 12, 6]}>
            <Box bg="white" p={6} boxShadow="sm">
              <Heading as="h3" size="xl" mb={4}>
                {t("settings.integrations.title")}
              </Heading>

              {!hasTurnioKey ? (
                <Box 
                  p={4} 
                  bg="yellow.50" 
                  border="1px" 
                  borderColor="yellow.200" 
                  borderRadius="md"
                  mb={4}
                >
                  <Text fontWeight="bold" mb={2}>⚠️ Integração não configurada</Text>
                  <Text>
                    Para usar o Turn.io nesta mobilização, você precisa configurar a 
                    chave da API nas configurações da comunidade.
                  </Text>
                  <Button 
                    as={Link} 
                    to="/community/integrations/turnio"
                    mt={4}
                  >
                    Configurar turn.io
                  </Button>
                </Box>
              ) : (
                <>
                  <RadioField
                    name='settings.share'
                    label={t('settings.integrations.radio.activeTurnioQuestion')}
                    columns="auto auto 1fr"
                  >
                    <Radio value='s'>{t('settings.integrations.radio.radioYes')}</Radio>
                    <Radio value='n'>{t('settings.integrations.radio.radioNo')}</Radio>
                  </RadioField>

                  {values?.settings?.share === 's' && (
                    <InputField
                      disabled={widget.settings.turnio?.custom_field && widget.settings.turnio?.created_at}
                      name='settings.turnio.custom_field'
                      label={t('settings.integrations.customField')}
                      placeholder={t('settings.integrations.customFieldPlaceholder')}
                      helpText={
                        <>
                          <p><b>O que é isso?</b></p>
                          <p>É o nome usado para identificar essa mobilização dentro do Turn.io.</p>
                          <p>Escolha algo curto e fácil de reconhecer, <b> como busao_0800.</b></p>
                          <p>Use letras minúsculas, números e o caractere _ (sublinhado).</p>
                        </>
                      }
                    />
                  )}
                </>
              )}

              <Flex justify='end'>
                <Button 
                  disabled={submitting || !dirty || !hasTurnioKey || widget.settings.turnio?.custom_field && widget.settings.turnio?.created_at} 
                  type='submit'
                >
                  {t('settings.defaultForm.submit')}
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </SettingsForm>
  );
}

export default IntegrationsFields;