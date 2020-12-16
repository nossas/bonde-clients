import React from "react";
import { ConnectedForm, TextareaField, Button, Header } from "bonde-components";
import { useTranslation } from "react-i18next";

const DefaultPostAction = (): React.ReactElement => {
  const { t } = useTranslation("widget");
  return (
    <>
      <ConnectedForm onSubmit={(e) => console.log(e)}>
        {({ submitting, pristine }) => {
          return (
            <>
              <TextareaField
                label={t("settings.finish.default.whatsapp.label")}
                name="whatsapp_text"
                placeholder={t("settings.finish.default.whatsapp.placeholder")}
              />
              <Button disabled={submitting || pristine}>Salvar</Button>
            </>
          );
        }}
      </ConnectedForm>
      <Header.H5 style={{ textTransform: "uppercase", fontWeight: 600 }}>
        {t("settings.finish.preview")}
      </Header.H5>
    </>
  );
};

export default DefaultPostAction;
