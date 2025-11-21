"use client";

import { BasicLayout } from "@components/basicLayout";
import { I18nProvider, Refine } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import { PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import routerProvider from "@refinedev/nextjs-router";
import { coreDataProvider } from "@providers/data-provider";
import { useNotificationProvider } from "@refinedev/antd";

import "@i18n";
import { IContact } from "@models/common";
import { authProvider } from "@providers/auth-provider";

interface IRefineContext {
  contact?: IContact;
}

export const RefineContext = ({
  children,
  contact,
}: PropsWithChildren<IRefineContext>) => {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options) => t(key, options) as string,
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <Refine
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        dataProvider={coreDataProvider}
        notificationProvider={useNotificationProvider}
        resources={[
          {
            name: "campaigns",
            list: "/campaigns",
            show: "/campaigns/show/:id",
          },
          {
            name: "organizations",
            list: "/organizations",
            show: "/organizations/show/:id",
          },
          { name: "transactions" },
        ]}
        options={{
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      >
        <BasicLayout>{children}</BasicLayout>
        <RefineKbar />
      </Refine>
    </>
  );
};
