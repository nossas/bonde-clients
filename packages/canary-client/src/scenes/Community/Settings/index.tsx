import React from 'react';
import { InputField, Button } from 'bonde-components';
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';
import UploadField from "../../../components/UploadFile";
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const SettingsPage = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm omitButton>
      <Container fluid style={{ width: "100%", padding: "0" }}>
        <Row>
          <Col sm={12} lg={6}>
            <Panel>
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
                label={t('info.form.fields.email_template_from.label')}
                placeholder={t('info.form.fields.email_template_from.placeholder')}
              />
              <Row justify='end'>
                <Col xs={3}>
                  <Button type='submit'>{t('buttons.submit')}</Button>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Container>
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
