import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ConnectedForm,
  InputField,
  Link as LinkStyled,
  Validators,
  Row,
  Col
} from 'bonde-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Styles = styled.div`
  button {
    width: 100%;
  }
`;

const { composeValidators, required, isEmail, min } = Validators;

interface LoginFormProps {
  onSubmit: any;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation('auth');

  return (
    <Styles>
      <ConnectedForm onSubmit={onSubmit}>
        {({ submitting }: any) => (
          <>
            <InputField
              name='email'
              label={t('fields.email.label')}
              placeholder={t('fields.email.placeholder')}
              validate={composeValidators(
                required(t('fields.email.errors.isEmpty')),
                isEmail(t('fields.email.errors.isEmail'))
              )}
            />
            <InputField
              name='password'
              label={t('fields.password.label')}
              placeholder={t('fields.password.placeholder')}
              type='password'
              validate={composeValidators(
                required(t('fields.password.errors.isEmptyLogin')),
                min(6, t('fields.password.errors.min'))
              )}
            />
            <Row spacing='between'>
              <Col size={[4, 4, 12, 12]}>
                <LinkStyled component={Link} to='/forget-password'>
                  {t('links.forgetPassword')}
                </LinkStyled>
              </Col>
              <Col size={[3, 3, 12, 12]}>
                <Button type='submit' disabled={submitting}>
                  {t('button.submit')}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </ConnectedForm>
    </Styles>
  );
};

export default LoginForm;