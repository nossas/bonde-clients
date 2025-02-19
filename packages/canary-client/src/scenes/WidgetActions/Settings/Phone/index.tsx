import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { TextareaField, RadioField } from 'bonde-components';
import {
  Heading,
  Button,
  Grid,
  GridItem,
  Radio,
  Flex,
  Box,
} from "bonde-components/chakra";

import SettingsForm from '../SettingsForm';
import type { Widget } from '../../FetchWidgets';
import { useTranslation } from 'react-i18next';


interface Props {
  widget: Widget
  updateCache: (updated: Widget) => void
}


const PhoneSettings: React.FC<Props> = ({ widget, updateCache }) => {
  const { t } = useTranslation('widgetActions');
  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: {
          show_city: "city-false",
          show_state: "n",
          ...widget.settings
        }
      }}
      afterSubmit={async (_: any, result: any) => {
        updateCache(result.data.update_widgets.returning[0]);
      }}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, 12, 6]}>
            <Box bg="white" p={6} boxShadow="sm">
              <Heading as="h3" size="xl" mb={4}>Configurações</Heading>
              <TextareaField
                name="settings.briefing"
                label="Roteiro"
                placeholder="Faça uma sugestão do que o ativista pode falar ao fazer a ligação"
              />
              <RadioField
                name='settings.show_state'
                label={t('settings.adjusts.fields.state.title')}
                columns="auto auto 1fr"
              >
                <Radio value='s'>{t('settings.adjusts.fields.state.radio.yes')}</Radio>
                <Radio value='n'>{t('settings.adjusts.fields.state.radio.no')}</Radio>
              </RadioField>

              <RadioField
                name='settings.show_city'
                label={t('settings.adjusts.fields.city.title')}
                columns="auto auto 1fr"
              >
                <Radio value='city-true'>{t('settings.adjusts.fields.city.radio.yes')}</Radio>
                <Radio value='city-false'>{t('settings.adjusts.fields.city.radio.no')}</Radio>
              </RadioField>
              <Flex justify='end'>
                <Button disabled={submitting || !dirty} type='submit'>{t('settings.defaultForm.submit')}</Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </SettingsForm>
  )
}


const PhoneScene: React.FC<Props> = (props) => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.path}>
        <PhoneSettings {...props} />
      </Route>
    </Switch>
  )
}

export default PhoneScene