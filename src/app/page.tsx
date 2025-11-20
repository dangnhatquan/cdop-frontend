import { Suspense } from "react";

import { NavigateToResource } from "@refinedev/nextjs-router";
import { Viewport } from "next";
import Loading from "@components/loading";

export const viewport: Viewport = {
  themeColor: "#EFE8DD",
};

export default function IndexPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigateToResource />
    </Suspense>
  );
}
