import React from 'react';
import { InputField, RadioField } from 'bonde-components';
import {
  Button,
  Box,
  Flex,
  Radio,
  Heading,
  Grid,
  GridItem
} from 'bonde-components/chakra';
import { useTranslation } from 'react-i18next';
import SettingsForm from '../SettingsForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IntegrationsFields = ({ widget, updateCache }: any) => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={async (values:any, result:any) => {
        updateCache(result.data.update_widgets.returning[0])
      }}
      initialValues={{
        settings: {
          webhook_enabled: "n",
          email_integration: "n",
          sync_frequency: "daily",
          ...widget.settings
        }
      }}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, 12, 6]}>
            <Box bg="white" p={6} boxShadow="sm">
              <Heading as="h3" size="xl" mb={4}>{t("settings.integrations.title")}</Heading>

              <RadioField
                name='settings.share'
                label={t('settings.integrations.radio.activeTurnioQuestion')}
                columns="auto auto 1fr"
              >
                <Radio value='s'>{t('settings.integrations.radio.radioYes')}</Radio>
                <Radio value='n'>{t('settings.integrations.radio.radioNo')}</Radio>
              </RadioField>

              <Flex justify='end'>
                <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </SettingsForm>
  );
}

export default IntegrationsFields;