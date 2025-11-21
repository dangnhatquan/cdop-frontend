import Loading from "@components/loading";
import { Suspense } from "react";
import { TransactionsComponents } from "./components/TransactionsComponent";

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <TransactionsComponents />
    </Suspense>
  );
}
