import React from 'react';
import { Tab } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import TabRoute from '../TabRoute';

const Navigation = () => {
  const { t } = useTranslation("widgetActions");

  return (
    <TabRoute>
      {({ push, is }) => (
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
        </>
      )}
    </TabRoute>
  );
}

export default Navigation;
