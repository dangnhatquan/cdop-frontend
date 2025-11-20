"use client";

import { CustomDrawer } from "@components/drawer";
import PrimaryLogo from "@components/icons/PrimaryLogo";
import { ArrowLeft } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-white border-b sticky top-0 z-10 pt-5">
      <div className="relative w-screen max-w-[1280px] p-4 flex items-center justify-center">
        <PrimaryLogo width={32} height={32} />
        <div className="absolute p-4 left-0 top-0 flex justify-between w-full">
          <button
            className="p-2 flex flex-row gap-2 items-center"
            aria-label="Quay lại"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <CustomDrawer />
        </div>
      </div>
    </div>
  );
};
