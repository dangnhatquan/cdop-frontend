import { DevtoolsProvider } from "@providers/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";

import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@refinedev/antd/dist/reset.css";
import { RefineContext } from "./_refine_context";

import "@tailwind.css";
import "@App.css";
import "aos/dist/aos.css";
import "animate.css";
import { getContact } from "@api/contact";
import { TLocale } from "@models/common";
import Head from "next/head";
import { keywords } from "@utils/constants";
import Script from "next/script";

import dynamic from "next/dynamic";
import { PIXEL_ID } from "@api";
import Loading from "./loading";

const PixelTracker = dynamic(() => import("@components/pixelTracker"), {
  ssr: false,
});

export const viewport: Viewport = {
  themeColor: "#EFE8DD",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const lang = cookieStore.get("NEXT_LOCALE");

  const contact = await getContact({
    queryLocale: (lang?.value as TLocale) || "vi",
  });

  return (
    <html lang={lang?.value || "vi"}>
      <body>
        <PixelTracker />
        <Suspense fallback={<Loading />}>
          <AntdRegistry>
            <RefineKbarProvider>
              <ColorModeContextProvider defaultMode={theme?.value}>
                <DevtoolsProvider>
                  <RefineContext contact={contact}>{children}</RefineContext>
                </DevtoolsProvider>
              </ColorModeContextProvider>
            </RefineKbarProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
