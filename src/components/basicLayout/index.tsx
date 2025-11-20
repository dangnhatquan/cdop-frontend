import { useTranslation } from "@refinedev/core";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, type FC } from "react";
import Cookies from "js-cookie";
import { IContact } from "@models/common";

interface IBasicLayout {
  children: any;
  contact?: IContact;
}

export const BasicLayout: FC<IBasicLayout> = ({ children, contact }) => {
  const { changeLocale } = useTranslation();

  const params = useParams<{ lang: string }>();

  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = params?.lang ?? searchParams?.get("lang") ?? "vi";
    changeLocale(lang);
    Cookies.set("NEXT_LOCALE", lang);
  }, [changeLocale, params?.lang, searchParams]);

  return (
    <div className="font-gilroy flex flex-col justify-between items-center relative">
      <div className="min-h-screen">{children}</div>
    </div>
  );
};
