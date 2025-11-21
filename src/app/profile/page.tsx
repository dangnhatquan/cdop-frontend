import Loading from "@components/loading";
import { Suspense } from "react";
import { TransactionsComponent } from "./components/TransactionsComponent";

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <TransactionsComponent />
    </Suspense>
  );
}
