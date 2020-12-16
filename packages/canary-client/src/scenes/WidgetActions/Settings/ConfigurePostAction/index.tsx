import React, { useState } from "react";
// import { useSession, useMutation } from "bonde-core-tools";
import { useTranslation } from "react-i18next";
// import { toast } from "bonde-components";

import { Widget } from "../../FetchWidgets";
import Selectable from "../../../../components/Selectable";
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
  const [value, setValue] = useState<"share" | "custom">(
    widget.settings.finish_message_type || "share"
  );

  const options = [
    {
      value: "share",
      label: t("settings.finish.radio.share"),
    },
    {
      value: "custom",
      label: t("settings.finish.radio.custom"),
    },
  ];

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
    <Selectable
      name="postActionType"
      title={t("settings.finish.title")}
      options={options}
      selected={value}
      onChange={setValue}
    >
      {() => {
        return (
          <>
            {value === "share" && <DefaultPostAction />}
            {value === "custom" && <CustomPostAction />}
          </>
        )
      }}
    </Selectable>
  );
};

export default ConfigurePostAction;
