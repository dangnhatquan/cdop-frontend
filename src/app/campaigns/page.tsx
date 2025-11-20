import Loading from "@components/loading";
import { Suspense } from "react";
import { CampaignsComponent } from "./components/CampaignsComponent";

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <CampaignsComponent />
    </Suspense>
  );
}
