import { useGo } from "@refinedev/core";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { isFunction } from "lodash";

export const LanguageSelect = ({ onClick }: { onClick?: () => void }) => {
  const pathname = usePathname();
  const path = pathname.split("/")?.[1];


  const currentLanguage = pathname.split("/")?.[2];

  const handleChangeLanguage = (lang: string) => {
    if (isFunction(onClick)) onClick();
    Cookies.set("NEXT_LOCALE", lang);

  };

  return (
    <div className="flex flex-row gap-4">
      <a
        className={classNames("w-[32px] regular cursor-pointer", {
          "!text-sand": currentLanguage === "vi",
          "!text-[#bbb9b2]": currentLanguage !== "vi",
        })}
        href={`/${path}/vi`}
      >
        VI
      </a>
      <a
        className={classNames("w-[32px] regular cursor-pointer", {
          "!text-sand": currentLanguage === "en",
          "!text-[#bbb9b2]": currentLanguage !== "en",
        })}
        href={`/${path}/en`}
      >
        EN
      </a>
    </div>
  );
};
