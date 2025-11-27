import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { useMutation, gql } from 'bonde-core-tools';

import { InputField, Validators } from 'bonde-components';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text
} from "bonde-components/chakra";

import { noSpecialCharacters } from "../../../../services/utils";
import { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';
import EmailMetrics from './EmailMetrics';
import HTMLField from "../HTMLField";

const SendEmailMutation = gql`
  mutation Notify($input: [NotifyInput!]!) {
    notify(input: $input) {
      status
    }
  }
`;

const Styles = styled.div`
  .emailBody {
    padding-bottom: 30px;
  }

  .emailBody--label {
    padding-bottom: 4px;
  }
`;

type Props = {
  widget: Widget;
  updateCache: any;
};

const { required, composeValidators, isEmail } = Validators;

const AutofireForm = ({ widget, updateCache }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");
  const [sendEmail] = useMutation(SendEmailMutation);
  const [testEmail, setTestEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lastSentConfig, setLastSentConfig] = useState<any>(null);

  // Verifica se algum campo foi alterado após o envio
  useEffect(() => {
    if (emailSent && lastSentConfig) {
      const configChanged = 
        lastSentConfig.sender_name !== widget.settings.sender_name ||
        lastSentConfig.sender_email !== widget.settings.sender_email ||
        lastSentConfig.email_subject !== widget.settings.email_subject ||
        lastSentConfig.email_text !== widget.settings.email_text;
      
      if (configChanged) {
        setEmailSent(false);
        setLastSentConfig(null);
      }
    }
  }, [widget.settings, emailSent, lastSentConfig]);

  const sendEmailTest = async () => {
    console.log("Iniciando envio de email de teste...");
    
    if (!testEmail) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      return;
    }

    // Verifica se os campos estão preenchidos
    if (!widget.settings.sender_name || !widget.settings.sender_email || 
        !widget.settings.email_subject || !widget.settings.email_text) {
      return;
    }

    setIsSending(true);
    
    try {
      const emailOpts: any = {
        email_to: testEmail,
        subject: `[TESTE] ${widget.settings.email_subject}`,
        body: widget.settings.email_text,
        email_from: `${widget.settings.sender_name} <${widget.settings.sender_email}>`,
        context: {}
      };
      
      console.log("Enviando email com as opções:", emailOpts);
      const result = await sendEmail({ variables: { input: emailOpts } });
      console.log("Resultado do envio:", result);
      
      setLastSentConfig({
        sender_name: widget.settings.sender_name,
        sender_email: widget.settings.sender_email,
        email_subject: widget.settings.email_subject,
        email_text: widget.settings.email_text
      });
      setEmailSent(true);
      
    } catch (error) {
      console.error("Erro ao enviar email de teste:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Styles>
      <SettingsForm
        widget={widget}
        afterSubmit={async (values: any, result: any) => {
          updateCache(result.data.update_widgets.returning[0]);
        }}
        initialValues={{
          settings: widget.settings
        }}
      >
        {({ submitting, dirty }: any) => (
          <Grid templateColumns="repeat(12, 1fr)" gap={16}>
            <GridItem colSpan={[12, 12, 6]}>
              <Box bg="white" p={6} boxShadow="sm">
                <Heading as="h3" size="xl" mb={4}>
                  {t("settings.autofire.title")}
                </Heading>
                <InputField
                  label={t("settings.autofire.label.sendersName")}
                  name="settings.sender_name"
                  placeholder={t("settings.autofire.placeholder.sendersName")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required")),
                    noSpecialCharacters(
                      t("settings.autofire.validators.noSpecialCharacter")
                    )
                  )}
                />
                <InputField
                  label={t("settings.autofire.label.sendersEmail")}
                  name="settings.sender_email"
                  placeholder={t("settings.autofire.placeholder.sendersEmail")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required")),
                    isEmail(t("settings.autofire.validators.isEmail"))
                  )}
                />
                <InputField
                  label={t("settings.autofire.label.emailSubject")}
                  name="settings.email_subject"
                  placeholder={t("settings.autofire.placeholder.emailSubject")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required"))
                  )}
                />
                <HTMLField
                  name="settings.email_text"
                  initialValue={widget.settings.email_text}
                  label={t("settings.autofire.label.emailBody")}
                  validate={composeValidators(
                    required(t("settings.autofire.validators.required"))
                  )}
                  mode="email"
                />
                <Flex justify="end">
                  <Button disabled={submitting || !dirty} type="submit">
                    {t('settings.defaultForm.submit')}
                  </Button>
                </Flex>
              </Box>
            </GridItem>
            <GridItem colSpan={[12, 12, 6]}>
              <Box bg="white" p={6} boxShadow="sm">
                <Heading as="h3" size="lg" mb={4}>
                  Enviar Email de Teste
                </Heading>
                <Text mb={4} color="gray.600">
                  Envie um email de teste para verificar como ele ficará antes de ativar o autofire.
                </Text>
                <FormControl mb={4}>
                  <FormLabel>Email para teste</FormLabel>
                  <Input
                    type="email"
                    placeholder="seu-email@exemplo.com"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                </FormControl>
                <Button 
                  colorScheme="blue" 
                  onClick={sendEmailTest}
                  isLoading={isSending}
                  loadingText="Enviando..."
                  width="full"
                >
                  Enviar Email de Teste
                </Button>
                {emailSent && (
                  <Text mt={2} fontSize="sm" color="green.600" textAlign="center">
                    ✓ Email de teste enviado com sucesso para {testEmail}
                  </Text>
                )}
              </Box>
            </GridItem>
          </Grid>
        )}
      </SettingsForm>
    </Styles>
  );
};

export default AutofireForm;