import Loading from "@components/loading";
import { Suspense } from "react";
import NeoSimulator from "./components/NeoSimulator";

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <NeoSimulator />
    </Suspense>
  );
}
