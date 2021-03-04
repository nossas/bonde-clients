import React from 'react';
import { InputField, Button, Tooltip, Success, Validators, Text, Header } from 'bonde-components';
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';
import UploadField from "../../../components/UploadFile";
import CommunityForm from '../BaseForm';
import Panel from '../../../components/Panel';

const { isEmail } = Validators;

export const isValidFromEmail = (value: string): string | undefined => {
  const regex = /^[a-zà-úA-ZÀ-Ú0-9 ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isEmail('E-mail inválido')(email);
  } else {
    return 'Padrão inválido. Ex: Nome do remente <email@host.com>';
  }
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Settings'
      success={<Success message='UHU! Informações da comunidade atualizadas.' />}
    >
      {({ submitting, dirty }: any) => (
        <Container fluid style={{ width: "100%", padding: "0" }}>
          <Panel>
            <Row>
              <Col sm={12} lg={6}>
                <UploadField
                  label={t('info.form.fields.image.label')}
                  name='community.image'
                />
                <InputField
                  name='community.name'
                  label={t('info.form.fields.name.label')}
                  placeholder={t('info.form.fields.name.placeholder')}
                />
                <InputField
                  name='community.description'
                  label={t('info.form.fields.description.label')}
                  placeholder={t('info.form.fields.description.placeholder')}
                />
                <InputField
                  name='community.city'
                  label={t('info.form.fields.city.label')}
                  placeholder={t('info.form.fields.city.placeholder')}
                />
                <InputField
                  name='community.email_template_from'
                  label={(
                    <Tooltip
                      label={t('info.form.fields.email_template_from.label')}
                      info={(
                        <>
                          <p>{`Escolha um email ao qual tenha fácil acesso. Ele só será usado pelo BONDE quando não for definido um email específico em uma ferramenta da sua comunidade.`}</p>
                          <p>{`Preencha com `}<b>{`Nome do Remetente <nome@mail.com>`}</b></p>
                        </>
                      )}
                    />
                  )}
                  placeholder={t('info.form.fields.email_template_from.placeholder')}
                  validate={isValidFromEmail}
                />
                </Col>
                <Col sm={12} lg={6}>
                  <div style={{ marginBottom: '25px' }}>
                    <Header.H4 style={{ marginBottom: '5px' }}>Assinatura Personalizada</Header.H4>
                    <Text>Devido à LGPD, todas as suas campanhas devem exibir a assinatura da sua comunidade no footer das páginas.</Text>
                  </div>
                  <UploadField
                    imageScale={0.6}
                    label='LOGO QUE APARECE NA ASSINATURA'
                    name='community.sign.image'
                  />
                  <InputField
                    name='community.sign.name'
                    label='Assinatura da comunidade'
                    placeholder='Nome da comunidade'
                  />
                  <InputField
                    name='community.sign.url'
                    label='Site da comunidade'
                    placeholder='Insira o link do site ou página oficial da sua comunidade'
                  />
                  <Row justify='end'>
                    <Col xs={3}>
                      <Button disabled={submitting || !dirty} type='submit'>{t('buttons.submit')}</Button>
                    </Col>
                  </Row>
                
                </Col>
              </Row>
            </Panel>
        </Container>
      )}
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
