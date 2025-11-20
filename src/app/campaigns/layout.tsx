import { Header } from "@components/header";

interface IBasicLayout {
  children: any;
}

export default function Layout({ children }: IBasicLayout) {
  return (
    <>
      <Header />
      <main className="mb-5">{children}</main>
    </>
  );
}
