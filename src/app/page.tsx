import { Suspense } from "react";

import { NavigateToResource } from "@refinedev/nextjs-router";
import Loading from "@components/loading";

export default function IndexPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigateToResource />
    </Suspense>
  );
}
