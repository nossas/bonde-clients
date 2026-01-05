import React from 'react';
import { Tab } from 'bonde-components';
import { Flex } from 'bonde-components/chakra';
import { useTranslation } from 'react-i18next';
import TabRoute from '../TabRoute';
import type { Widget } from '../FetchWidgets';

interface NavigationProps {
  widget: Widget
}

const Navigation: React.FC<NavigationProps> = ({ widget }) => {
  const { t } = useTranslation("widgetActions");

  let tabs;

  if (widget.kind === 'pressure') {
    tabs = ({ is, push }: any) => (
      <>
        <Tab
          active={is(/\/widgets\/\d+\/settings\/*$/)}
          onClick={() => push("")}
        >
          {t("settings.navigation.performance")}
        </Tab>
        <Tab
          active={is(/\/widgets\/\d+\/settings\/targets\/*$/)}
          onClick={() => push("/targets")}
        >
          {t("settings.navigation.targets")}
        </Tab>
        <Tab
          active={is(/\/widgets\/\d+\/settings\/sending\/*$/)}
          onClick={() => push(`/sending`)}
        >
          {t("settings.navigation.sending")}
        </Tab>
      </>
    )
  } else if (widget.kind !== 'phone' && widget.kind !== "busao0800") {
    tabs = ({ is, push }: any) => (
      <Tab
        active={is(/\/widgets\/\d+\/settings\/*$/)}
        onClick={() => push("")}
      >
        {t("settings.navigation.performance")}
      </Tab>
    )
  } else if (widget.kind === 'phone') {
    tabs = ({ is, push }: any) => (
      <Tab
        active={is(/\/widgets\/\d+\/settings\/*$/)}
        onClick={() => push("")}
      >
        Telefone
      </Tab>
    )
  }

  return (
    <TabRoute>
      {({ push, is }) => (
        <Flex direction="row" mb={3}>
          {tabs && tabs({ push, is })}

          {/* Aba Fields apenas para widgets do tipo form */}
          {widget.kind === "form" && (
            <Tab
              active={is(/\/widgets\/\d+\/settings\/fields\/*$/)}
              onClick={() => push(`/fields`)}
            >
              {t("settings.navigation.fields")}
            </Tab>
          )}

          <Tab
            active={is(/\/widgets\/\d+\/settings\/adjusts\/*$/)}
            onClick={() => push(`/adjusts`)}
          >
            {t("settings.navigation.adjusts")}
          </Tab>
          <Tab
            active={is(/\/widgets\/\d+\/settings\/autofire\/*$/)}
            onClick={() => push(`/autofire`)}
          >
            {t("settings.navigation.autofire")}
          </Tab>
          <Tab
            active={is(/\/widgets\/\d+\/settings\/finish\/*$/)}
            onClick={() => push(`/finish`)}
          >
            {t("settings.navigation.finish")}
          </Tab>
          <Tab
            active={is(/\/widgets\/\d+\/settings\/integrations\/*$/)}
            onClick={() => push(`/integrations`)}
          >
            {t("settings.navigation.integrations")}
          </Tab>
        </Flex>
      )}
    </TabRoute>
  );
}

export default Navigation;