import { Header } from "@components/header";
import { Viewport } from "next";

interface IBasicLayout {
  children: any;
}

export const viewport: Viewport = {
  themeColor: "#000",
};

export default function Layout({ children }: IBasicLayout) {
  return (
    <>
      <Header />
      <main className="mb-5">{children}</main>
    </>
  );
}
