import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "bonde-components";
import SlateEditor from "../../../../components/SlateEditor"

const DefaultPostAction = (): React.ReactElement => {
  const { t } = useTranslation("widget");
  return (
    <>
      <Header.H5 style={{ textTransform: "uppercase", fontWeight: 600 }}>
        {t("settings.finish.preview")}
      </Header.H5>
      <SlateEditor
        onSubmit={() => console.log("submit")}
        handleDelete={() => console.log("delete")}
        content={"ola"}
        readOnly={false}
        contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
      />
    </>
  );
};

export default DefaultPostAction;
