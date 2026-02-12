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
import { gql, useMutation } from "bonde-core-tools";
import SettingsForm from '../SettingsForm';


const TURNIO_CREATE_CUSTOM_FIELD = gql`
  mutation TurnioCreateCustomField($params: CreateCustomFieldInput!) {
    turnio_create_custom_field(params: $params) {
      custom_field
      created_at
    }
  }
`;

const CustomFieldForm = ({ widget, updateCache }: any) => {
  const { t } = useTranslation('widgetActions');

  const [createCustomField] = useMutation(TURNIO_CREATE_CUSTOM_FIELD);

  const afterSubmit = async (values: any, result: any) => {
    let updatedWidget = result.data.update_widgets.returning[0];
    try {
      const createdCustomField = await createCustomField({
        variables: {
          params: {
            custom_field: values.settings?.turnio?.custom_field,
            widget_id: widget.id
          }
        }
      });

      updatedWidget = {
        ...updatedWidget,
        settings: {
          ...updatedWidget.settings,
          turnio: createdCustomField?.data?.turnio_create_custom_field ?? updatedWidget.settings?.turnio
        }
      }
    } catch (error) {
      console.error('Erro ao criar campo customizado no Turn.io:', error);
    } finally {
      await updateCache(updatedWidget);
    }
  };

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={afterSubmit}
      initialValues={{
        settings: {
          webhook_enabled: "n",
          email_integration: "n",
          sync_frequency: "daily",
          share: widget.settings?.turnio?.custom_field ? "s" : "n",
          turnio: {
            custom_field: widget.settings?.turnio?.custom_field || ""
          },
          ...widget.settings
        }
      }}
    >
      {({ submitting, dirty, values }: any) => (
      <>
        <InputField
          disabled={widget.settings?.turnio?.custom_field && widget.settings?.turnio?.created_at}
          name='settings.turnio.custom_field'
          label={t('settings.integrations.customField')}
          placeholder={t('settings.integrations.customFieldPlaceholder')}
        />
        <Flex justify='end'>
          <Button
            disabled={submitting || !dirty || (widget.settings?.turnio?.custom_field && widget.settings?.turnio?.created_at)}
            type='submit'
          >
            {t('settings.defaultForm.submit')}
          </Button>
        </Flex>
      </>
      )}
    </SettingsForm>
  );
}

export default CustomFieldForm;