import React from "react";
// import { useSession, useMutation } from "bonde-core-tools";
import { useTranslation } from "react-i18next";
// import { toast } from "bonde-components";

import { Widget } from "../../FetchWidgets";
import SpyField from "../../../../components/SpyField";
import RadioField, { Radio } from "../../../../components/Radio";
import SettingsForm from '../SettingsForm';
import DefaultPostAction from "./DefaultPostAction";
import CustomPostAction from "./CustomPostAction";
// import UPDATE_WIDGET_SETTINGS from "../UpdateWidgetSettings";

type Props = {
  widget: Widget;
};

const ConfigurePostAction = ({ widget }: Props): React.ReactElement => {
  // const [updateFinishMessageType] = useMutation(UPDATE_WIDGET_SETTINGS);
  // const { storage, community } = useSession();
  const { t } = useTranslation("widget");

  // const saveFinishMessageType = useCallback(async () => {
  //   try {
  //     await updateFinishMessageType({
  //       variables: {
  //         settings: {
  //           finish_message_type: value,
  //         },
  //         id: { _eq: widget.id },
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return toast("Houve um erro ao salvar o formulário", {
  //       type: toast.TYPE.ERROR,
  //     });
  //   } 
  //   finally {
  //     if (process.env.REACT_APP_DOMAIN_ADMIN && value === "custom") {
  //       storage.setAsyncItem("community", community).then(() => {
  //         window.location.href = new URL(
  //           `/mobilizations/${widget.block.mobilization.id}/widgets/${widget.id}/form/finish`,
  //           process.env.REACT_APP_DOMAIN_ADMIN
  //         ).href;
  //       });
  //     }
  //   }
  // }, [value, widget]);

  return (
    <SettingsForm widget={widget}>
      {() => (
        <>
          <RadioField name='settings.finish_message_type' label={t("settings.finish.title")}>
            <Radio value='share'>
              {t("settings.finish.radio.share")}
            </Radio>
            <Radio value='custom'>
              {t("settings.finish.radio.custom")}
            </Radio>
          </RadioField>
          <SpyField field='settings.finish_message_type'>
            {({ value }: any) => (
              <>
                {value === "share" && <DefaultPostAction />}
                {value === "custom" && <CustomPostAction />}
              </>
            )}
          </SpyField>
        </>
      )}
    </SettingsForm>
  );
};

export default ConfigurePostAction;
