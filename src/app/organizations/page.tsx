import Loading from "@components/loading";
import { Suspense } from "react";
import { OrganizationsComponent } from "./components/OrganizationsComponent";

export default async function OrganizationsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OrganizationsComponent />
    </Suspense>
  );
}
