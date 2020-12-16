import React from "react";
import {
  InputField,
  TextareaField,
  Card,
  Header,
  Validators,
  Text,
} from "bonde-components";
import { useTranslation } from "react-i18next";
import { Widget } from "../../FetchWidgets";
import { noSpecialCharacters } from "../../../../services/utils";
import SettingsForm from '../SettingsForm';

type Props = {
  widget: Widget;
};

// type FormData = {
//   sender_name: string;
//   sender_email: string;
//   email_subject: string;
//   email_body: string;
// };
const { required, composeValidators, isEmail } = Validators;

const AutofireForm = ({ widget }: Props): React.ReactElement => {
  const { t } = useTranslation("widget");

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: widget.settings
      }}
    >
      {() => (
        <>
          <Header.H4
            style={{
              margin: "10px 0",
            }}
          >
            {t("settings.autofire.title")}
          </Header.H4>
          <Text style={{ marginBottom: "15px" }}>
            {t("settings.autofire.subtitle")}
          </Text>
          <Card padding={{ x: 40, y: 30 }}>
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
            <TextareaField
              label={t("settings.autofire.label.emailBody")}
              name="settings.email_text"
              placeholder={t("settings.autofire.placeholder.emailBody")}
              validate={composeValidators(
                required(t("settings.autofire.validators.required"))
              )}
            />
          </Card>
        </>
      )}
    </SettingsForm>
  );
};

export default AutofireForm;