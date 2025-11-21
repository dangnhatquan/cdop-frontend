import Loading from "@components/loading";
import { Suspense } from "react";
import NeoSimulator from "./components/NeoSimulator";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#03B451",
};

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <NeoSimulator />
    </Suspense>
  );
}
