import React from 'react';
import { Tab } from 'bonde-components';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TabRoute from '../TabRoute';

const Tabs = styled.div`
  ${Tab} {
    color: #424242;

    &:hover,
    &.active,
    &:active,
    &:focus {
      color: #ee0099;
      border: none;
      outline: none;
      padding: 0;
    }
  }
`;

const Navigation = () => {
  const { t } = useTranslation("widgetActions");

  return (
    <TabRoute>
      {({ push, is }) => (
        <Tabs>
          <Tab
            className={is(/\/widgets\/\d+\/settings\/*$/) ? "active" : ""}
            onClick={() => push("")}
          >
            {t("settings.navigation.targets")}
          </Tab>
          <Tab
            className={
              is(/\/widgets\/\d+\/settings\/sending\/*$/) ? "active" : ""
            }
            onClick={() => push(`/sending`)}
          >
            {t("settings.navigation.sending")}
          </Tab>
          <Tab
            className={
              is(/\/widgets\/\d+\/settings\/adjusts\/*$/) ? "active" : ""
            }
            onClick={() => push(`/adjusts`)}
          >
            {t("settings.navigation.adjusts")}
          </Tab>
          <Tab
            className={
              is(/\/widgets\/\d+\/settings\/autofire\/*$/) ? "active" : ""
            }
            onClick={() => push(`/autofire`)}
          >
            {t("settings.navigation.autofire")}
          </Tab>
          <Tab
            className={
              is(/\/widgets\/\d+\/settings\/finish\/*$/) ? "active" : ""
            }
            onClick={() => push(`/finish`)}
          >
            {t("settings.navigation.finish")}
          </Tab>
        </Tabs>
      )}
    </TabRoute>
  );
}

export default Navigation;